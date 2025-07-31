function createRenderer(canvas) {
    const gl = canvas.getContext("webgl2");
    if (!gl) throw new Error("WebGL2 not supported");

    const program = get_program(gl);
    gl.useProgram(program);

    const camera = setup_camera(canvas);
    const cameraLoc = gl.getUniformLocation(program, 'camera');

    const shape_factories = {
        cube: create_colored_cube,
        pyramid: create_colored_pyramid,
    };

    const shapes = [];

    let azimuth = 0, elevation = 0;
    let dragging = false, prevX = 0, prevY = 0;

    canvas.addEventListener("mousedown", e => {
        dragging = true;
        prevX = e.clientX;
        prevY = e.clientY;
    });

    canvas.addEventListener("mouseup", () => dragging = false);
    canvas.addEventListener("mousemove", e => {
        if (!dragging) return;
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        prevX = e.clientX;
        prevY = e.clientY;
        azimuth += dx * 0.01;
        elevation = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, elevation + dy * 0.01));
    });

    function update_camera_view() {
        const radius = 5.0;
        const eye = [
            radius * Math.cos(elevation) * Math.sin(azimuth),
            radius * Math.sin(elevation),
            radius * Math.cos(elevation) * Math.cos(azimuth)
        ];
        glMatrix.mat4.lookAt(camera.view, eye, [0, 0, 0], [0, 1, 0]);
    }

    function addShape(type, center, size) {
        const factory = shape_factories[type];
        if (!factory) throw new Error(`Unknown shape type: ${type}`);

        const data = factory(center, size);

        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        const FSIZE = data.vertices_colors.BYTES_PER_ELEMENT;

        const vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, data.vertices_colors, gl.STATIC_DRAW);

        const ibo = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data.indices, gl.STATIC_DRAW);

        setup_attributes(gl, program, FSIZE);

        shapes.push({ center, size, vao, indices: data.indices });
    }

    function draw() {
        update_camera_view();

        setup_environment(gl);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        for (const shape of shapes) {
            gl.bindVertexArray(shape.vao);

            const model = glMatrix.mat4.create();
            glMatrix.mat4.translate(model, model, shape.center);
            glMatrix.mat4.scale(model, model, [shape.size, shape.size, shape.size]);

            const mvp = glMatrix.mat4.create();
            glMatrix.mat4.multiply(mvp, camera.view, model);
            glMatrix.mat4.multiply(mvp, camera.projection, mvp);

            gl.uniformMatrix4fv(cameraLoc, false, mvp);
            gl.drawElements(gl.TRIANGLES, shape.indices.length, gl.UNSIGNED_BYTE, 0);
        }
    }

    function renderLoop() {
        draw();
        requestAnimationFrame(renderLoop);
    }

    renderLoop();

    return {
        addShape,
        draw,
    };
}

const canvas = document.getElementById("canvas");
const renderer = createRenderer(canvas);

renderer.addShape('cube', [0, 0, 0], 0.5);
renderer.addShape('pyramid', [1, 0, 0], 0.5);
renderer.draw();
