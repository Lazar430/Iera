const canvas = document.getElementById("lights_out");
const renderer = create_renderer({
    canvas: canvas, vert_id: "vert_light", frag_id: "frag_light",
    transparent: true
});

function light_neighborhood(i, j){
    const color1 = [0.2, 0.7, 0.65]; // Teal
    const color2 = [0.9, 0.4, 0.5]; // Dusty rose
    
    renderer.toggle_shape_color(`square_${5 * i + j}`, color1, color2);
    if(i - 1 >= 0) { renderer.toggle_shape_color(`square_${5 * (i - 1) + j}`, color1, color2); }
    if(i + 1 < 5) { renderer.toggle_shape_color(`square_${5 * (i + 1) + j}`, color1, color2); }
    if(j - 1 >= 0) { renderer.toggle_shape_color(`square_${5 * i + (j - 1)}`, color1, color2); }
    if(j + 1 < 5) { renderer.toggle_shape_color(`square_${5 * i + (j + 1)}`, color1, color2); }
}

function generate_grid(x, y){
    const size = 2;
    for(let i = 0; i < 5; ++i){
	for(let j = 0; j < 5; ++j){   
	    renderer.add_shape("square", {
		center: [x + i, y - j],
		size: size,
		color: [0.9, 0.4, 0.5],
		clickable: true,
		onclick: () => {
		    light_neighborhood(i, j);
		}
	    });
	}
    }
}

generate_grid(-2, 2);


renderer.enable_dragging();
renderer.draw();
