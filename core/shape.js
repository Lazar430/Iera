function Iera_add_shape(gl, program, shapes, type, shape_factories, options = {}) {
    if(options.center != undefined){
	if (options.center.length === 2) {
	    options.center = [...options.center, 0];
	}
    }

    const { id = `${type}_${shapes.length}` } = options; 
    
    const entry = shape_factories[type];
    if (!entry) throw new Error(`Unknown shape type: ${type}`);
    
    const { factory, space, mode } = entry;
    const data = factory(options);

    const center = options.center || [0, 0, 0];
    const size = options.size || 1;

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const FSIZE = data.vertices.BYTES_PER_ELEMENT;

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, data.vertices, gl.STATIC_DRAW);

    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data.indices, gl.STATIC_DRAW);

    setup_attributes(gl, program, FSIZE);

    const clickable = options.clickable || false;
    const onclick = options.onclick || null;

    shapes.push({
	id, center, size, vao, indices: data.indices, space, mode,
	clickable, onclick, vbo, vertices: data.vertices
    });

}
