function Iera_update_shape_color(gl, shapes, shape_id) {
    const color1 = [0.2, 0.6, 0.8];
    const color2 = [0.1, 0.2, 0.8];

    const shape = shapes.find(s => s.id === shape_id);
    if (!shape) return;

    const color_offset = 3;
    const stride = 9;

    const current_r = shape.vertices[color_offset];
    const new_color = (Math.abs(current_r - color1[0]) < 0.01) ? color2 : color1;

    for (let i = 0; i < shape.vertices.length / stride; i++) {
        shape.vertices.set(new_color, i * stride + color_offset);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, shape.vbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, shape.vertices);
}
