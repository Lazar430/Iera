function create_renderer({ canvas, vert_id = "vert", frag_id = "frag", transparent = false }) {
    const gl = canvas.getContext("webgl2", { alpha: transparent });

    if (!gl) throw new Error("WebGL2 not supported");

    const program = get_program(gl, vert_id, frag_id);
    gl.useProgram(program);

    const camera = setup_camera(canvas);
    const camera_loc = gl.getUniformLocation(program, 'camera');

    const light_pos_loc   = gl.getUniformLocation(program, "light_pos");
    const light_color_loc = gl.getUniformLocation(program, "light_color");
    const view_pos_loc    = gl.getUniformLocation(program, "view_pos");

    const shape_factories = {
	cube:      { factory: create_cube,      space: "3D", mode: "triangles" },
	pyramid:   { factory: create_pyramid,   space: "3D", mode: "triangles" },
	sphere:    { factory: create_sphere,    space: "3D", mode: "triangles" },
	
	triangle:  { factory: create_triangle,  space: "2D", mode: "triangles" },
	square:    { factory: create_square,    space: "2D", mode: "triangles" },
	circle:    { factory: create_circle,    space: "2D", mode: "triangles" },

	axes_2d:   { factory: create_axes_2d,   space: "2D", mode: "triangles" },
	graph_2d:  { factory: create_graph_2d,  space: "2D", mode: "triangles" },
	vector_2d: { factory: create_vector_2d, space: "2D", mode: "triangles" }
    };


    const shapes = [];

    const dragState = {
	azimuth: 0,
	elevation: 0,
	dragging: false,
	prevX: 0,
	prevY: 0
    };


    function enable_dragging() {
	Iera_enable_dragging(canvas, dragState);
    }

    Iera_click(canvas, shapes);

    function add_shape(type, options = {}){
	Iera_add_shape(gl, program, shapes, type, shape_factories, options);
    }

    function draw(){
	update_camera_view();
	Iera_draw(gl, shapes, camera, camera_loc, light_pos_loc, light_color_loc, view_pos_loc, transparent);
    }

    function update_camera_view() {
	const radius = 5.0;
	const eye = [
            radius * Math.cos(dragState.elevation) * Math.sin(dragState.azimuth),
            radius * Math.sin(dragState.elevation),
            radius * Math.cos(dragState.elevation) * Math.cos(dragState.azimuth)
	];
	glMatrix.mat4.lookAt(camera.view, eye, [0, 0, 0], [0, 1, 0]);
    }
    
    function renderLoop() {
        draw();
        requestAnimationFrame(renderLoop);
    }

    renderLoop();

    return {
	add_shape,
	enable_dragging,
	toggle_shape_color: (index, color1, color2) => Iera_toggle_shape_color(gl, shapes, index, color1, color2),
	draw,
    };

}
