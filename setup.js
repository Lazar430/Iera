const setup_buffers = (gl, cube) => {
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, cube.vertices_colors, gl.STATIC_DRAW);

    const ebo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cube.indices, gl.STATIC_DRAW);
};

const setup_attributes = (gl, program, FSIZE) => {
    const position = gl.getAttribLocation(program, "position");
    const color = gl.getAttribLocation(program, "color");

    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, FSIZE * 6, 0);
    gl.enableVertexAttribArray(position);

    gl.vertexAttribPointer(color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
    gl.enableVertexAttribArray(color);
};

const setup_environment = (gl) => {
    gl.clearColor(0, 0, 0, 1);
    gl.enable(gl.DEPTH_TEST);
};

const setup_camera = (canvas) => {
    const projection = glMatrix.mat4.create();
    glMatrix.mat4.perspective(
        projection,
        Math.PI / 6,
        canvas.width / canvas.height,
        1,
        100
    );

    const view = glMatrix.mat4.create();

    return { projection, view };
};

const update_camera_view = (camera) => {
    const radius = 5.0;
    const eyeX = radius * Math.cos(elevation) * Math.sin(azimuth);
    const eyeY = radius * Math.sin(elevation);
    const eyeZ = radius * Math.cos(elevation) * Math.cos(azimuth);

    glMatrix.mat4.lookAt(camera.view, [eyeX, eyeY, eyeZ], [0, 0, 0], [0, 1, 0]);
};
