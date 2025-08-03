const canvas1 = document.getElementById("canvas1");
const renderer1 = create_renderer({ canvas: canvas1 });

renderer1.add_shape("square", { center: [0, 1], size: 1.5 }); // center x=200, y=150, size 100px
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
const renderer3 = create_renderer({ canvas: canvas3 });

renderer3.add_shape("triangle", { center: [0, 0], size: 1 });
renderer3.add_shape("sphere", { center: [0, 0, 0], size: 1 });
renderer3.add_shape("circle", { center: [0.8, 0.7], size: 1 });
renderer3.add_shape("circle", { center: [-0.8, 0.7], size: 1 });
renderer3.enable_dragging();
renderer3.draw();
