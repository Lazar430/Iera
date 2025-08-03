function create_renderer(canvas, vert_id = "vert", frag_id = "frag") {
    const gl = canvas.getContext("webgl2");
    if (!gl) throw new Error("WebGL2 not supported");

    const program = get_program(gl, vert_id, frag_id);
    gl.useProgram(program);

    const camera = setup_camera(canvas);
    const cameraLoc = gl.getUniformLocation(program, 'camera');

    const shape_factories = {
	cube:     { factory: create_cube,      space: "3D" },
	pyramid:  { factory: create_pyramid,   space: "3D" },
	sphere:   { factory: create_sphere,    space: "3D" },
	
	triangle: { factory: create_triangle,  space: "2D" },
	square:   { factory: create_square,    space: "2D" },
	circle:   { factory: create_circle,    space: "2D" },
    };


    const shapes = [];

    let azimuth = 0, elevation = 0;
    let dragging = false, prevX = 0, prevY = 0;

    function enable_dragging(){
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
            elevation = Math.max(
                -Math.PI / 2 + 0.01,
                Math.min(Math.PI / 2 - 0.01, elevation + dy * 0.01)
            );
        });
    }

    function update_camera_view() {
        const radius = 5.0;
        const eye = [
            radius * Math.cos(elevation) * Math.sin(azimuth),
            radius * Math.sin(elevation),
            radius * Math.cos(elevation) * Math.cos(azimuth)
        ];
        glMatrix.mat4.lookAt(camera.view, eye, [0, 0, 0], [0, 1, 0]);
    }

    function add_shape(type, center, size) {
	if (center.length === 2) {
            center = [...center, 0];
	}
	
	const entry = shape_factories[type];
	if (!entry) throw new Error(`Unknown shape type: ${type}`);
	
	const { factory, space } = entry;
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

	shapes.push({ center, size, vao, indices: data.indices, space });
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

            if (shape.space === "2D") {
                // Ortho projection only, no camera view
                glMatrix.mat4.multiply(mvp, camera.ortho, model);
            } else {
                // Standard 3D MVP
                glMatrix.mat4.multiply(mvp, camera.view, model);
                glMatrix.mat4.multiply(mvp, camera.projection, mvp);
            }

            gl.uniformMatrix4fv(cameraLoc, false, mvp);

	    const indexType = shape.indices.BYTES_PER_ELEMENT === 1
		  ? gl.UNSIGNED_BYTE
		  : gl.UNSIGNED_SHORT;

	    gl.drawElements(gl.TRIANGLES, shape.indices.length, indexType, 0);
        }
    }
    
    function renderLoop() {
        draw();
        requestAnimationFrame(renderLoop);
    }

    renderLoop();

    return {
        add_shape,
        enable_dragging,
        draw,
    };
}
