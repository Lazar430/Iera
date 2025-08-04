const canvas1 = document.getElementById("canvas1");
const renderer1 = create_renderer({ canvas: canvas1, vert_id: "vert_light", frag_id: "frag_light" });

renderer1.add_shape("square", {
    center: [-0.8, 1.1],
    size: 1.5,
    color: [0, 0, 1],
    clickable: true,
    onclick: () => {
	renderer1.update_shape_color("square_0");
    }
});


renderer1.add_shape("cube", { center: [0, 0, 0], size: 0.5 });
renderer1.enable_dragging();
renderer1.draw();

const canvas2 = document.getElementById("canvas2");
const renderer2 = create_renderer({ canvas: canvas2 });

renderer2.add_shape("pyramid", { center: [0, 0, 0], size: 0.5 });
renderer2.add_shape("cube", { center: [1, 0, 0], size: 0.5 });
renderer2.add_shape("triangle", { center: [-1, -0.8], size: 1 });
renderer2.enable_dragging();
renderer2.draw();

const canvas3 = document.getElementById("canvas3");
const renderer3 = create_renderer({ canvas: canvas3, vert_id: "vert_light", frag_id: "frag_light" });

renderer3.add_shape("triangle", { center: [0, 0], size: 1 });
renderer3.add_shape("sphere", { center: [0, 0, 0], size: 1 });
renderer3.add_shape("circle", { center: [0.8, 0.7], size: 1 });
renderer3.add_shape("circle", { center: [-0.8, 0.7], size: 1 });
renderer3.enable_dragging();
renderer3.draw();

const canvas4 = document.getElementById("canvas4");
const renderer4 = create_renderer({ canvas: canvas4, transparent: true });


function f(x){
    return Math.sin(x);
}

renderer4.add_shape("graph_2d", { f: f });

renderer4.add_shape("axes_2d", { size: 10 });

renderer4.add_shape("vector_2d");
renderer4.add_shape("vector_2d", { tip : [2, -3] });

//renderer4.enable_dragging();
renderer4.draw();
