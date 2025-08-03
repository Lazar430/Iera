const setup_buffers = (gl, shape) => {
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, shape.vertices_colors, gl.STATIC_DRAW);

    const ebo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, shape.indices, gl.STATIC_DRAW);
};

const setup_attributes = (gl, program, FSIZE) => {
    const position = gl.getAttribLocation(program, "position");
    const color = gl.getAttribLocation(program, "color");

    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, FSIZE * 6, 0);
    gl.enableVertexAttribArray(position);

    gl.vertexAttribPointer(color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
    gl.enableVertexAttribArray(color);
};

const setup_environment = (gl, transparent) => {
    gl.clearColor(0, 0, 0, transparent ? 0 : 1);
    gl.enable(gl.DEPTH_TEST);
};

const setup_camera = (canvas) => {
    const camera = {
        projection: glMatrix.mat4.create(), // perspective (3D)
        ortho: glMatrix.mat4.create(),      // orthographic (2D)
        view: glMatrix.mat4.create(),
    };

    const aspect = canvas.width / canvas.height;

    // Perspective projection for 3D
    glMatrix.mat4.perspective(
        camera.projection,
        Math.PI / 6,       // 30 degrees field of view
        aspect,
        1,                 // near plane
        100                // far plane
    );

    // Orthographic projection for 2D (0,0 at bottom-left)
    const units = 10; // how many world units across the screen
    const halfX = units * aspect / 2;
    const halfY = units / 2;

    glMatrix.mat4.ortho(camera.ortho, -halfX, halfX, -halfY, halfY, -1, 1);


    return camera;
};

const update_camera_view = (camera) => {
    const radius = 10.0;

    const eye = [
        radius * Math.cos(elevation) * Math.sin(azimuth),
        radius * Math.sin(elevation),
        radius * Math.cos(elevation) * Math.cos(azimuth)
    ];

    glMatrix.mat4.lookAt(camera.view, eye, [0, 0, 0], [0, 1, 0]);
};
