function Iera_draw(gl, shapes, camera, camera_loc, light_pos_loc, light_color_loc, view_pos_loc, transparent) {
    setup_environment(gl, transparent);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    for (const shape of shapes) {
        gl.bindVertexArray(shape.vao);

        const model = glMatrix.mat4.create();
        glMatrix.mat4.translate(model, model, shape.center);
        //glMatrix.mat4.scale(model, model, [shape.size, shape.size, shape.size]);

        const mvp = glMatrix.mat4.create();

        if (shape.space === "2D") {
	    glMatrix.mat4.multiply(mvp, camera.ortho, model);

	    const center4 = glMatrix.vec4.fromValues(shape.center[0], shape.center[1], shape.center[2], 1.0);
	    const projected = glMatrix.vec4.create();
	    glMatrix.vec4.transformMat4(projected, center4, mvp);

	    if (projected[3] !== 0) {
		shape.ndc_center = [
		    projected[0] / projected[3],
		    projected[1] / projected[3]
		];
	    }
	}
	else {
            // Standard 3D MVP
            glMatrix.mat4.multiply(mvp, camera.view, model);
            glMatrix.mat4.multiply(mvp, camera.projection, mvp);
        }

        gl.uniformMatrix4fv(camera_loc, false, mvp);
	
	gl.uniform3fv(light_pos_loc,   [0.0, 0.0, 5.0]);      // or any other light position
	gl.uniform3fv(light_color_loc, [1.0, 1.0, 1.0]);      // white light
	gl.uniform3fv(view_pos_loc,    camera.eye);           // camera position

	const indexType = shape.indices.BYTES_PER_ELEMENT === 1
	      ? gl.UNSIGNED_BYTE
	      : gl.UNSIGNED_SHORT;

	const mode = shape.mode === "triangles"
	      ? gl.TRIANGLES
	      : gl.LINES;

	gl.drawElements(mode, shape.indices.length, indexType, 0);
    }
}
