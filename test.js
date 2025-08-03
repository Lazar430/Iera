const canvas1 = document.getElementById("canvas1");
const renderer1 = create_renderer(canvas1);

renderer1.add_shape("square", [25, 25], 10);// center x=200, y=150, size 100px
renderer1.add_shape('cube', [0, 0, 0], 0.5);
renderer1.enable_dragging();
renderer1.draw();


const canvas2 = document.getElementById("canvas2");
const renderer2 = create_renderer(canvas2);

renderer2.add_shape('pyramid', [0, 0, 0], 0.5);
renderer2.add_shape('cube', [1, 0, 0], 0.5);
renderer2.add_shape("triangle", [25, 15], 10);
renderer2.enable_dragging();
renderer2.draw();

const canvas3 = document.getElementById("canvas3");
const renderer3 = create_renderer(canvas3);

renderer3.add_shape("triangle", [25, 15], 10);
renderer3.add_shape("sphere", [0, 0, 0], 1);
renderer3.add_shape("circle", [60, 50, 1], 10);
renderer3.enable_dragging();
renderer3.draw();
