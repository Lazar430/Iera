function create_axes_2d({ center = [0, 0, 0], size = 2, thickness = 0.02 } = {}) {
    const [cx, cy, cz] = center;
    const half = size / 2;

    const x1 = [cx - half, cy];
    const x2 = [cx + half, cy];
    const y1 = [cx, cy - half];
    const y2 = [cx, cy + half];

    const x_color   = [0.341, 0.463, 0.565];
    const y_color = [0.341, 0.463, 0.565];

    const verts = [];
    const indices = [];

    function add_thick_line(p1, p2, color) {
        const baseIndex = verts.length / 9;

        const [x1, y1] = p1;
        const [x2, y2] = p2;
        const dx = x2 - x1, dy = y2 - y1;
        const len = Math.hypot(dx, dy);
        const ux = -dy / len, uy = dx / len;
        const wx = (ux * thickness) / 2;
        const wy = (uy * thickness) / 2;

        const positions = [
            [x1 - wx, y1 - wy, cz],
            [x1 + wx, y1 + wy, cz],
            [x2 + wx, y2 + wy, cz],
            [x2 - wx, y2 - wy, cz],
        ];

        for (const pos of positions) {
            verts.push(...pos, ...color, 0, 0, 1);
        }

        indices.push(
            baseIndex, baseIndex + 1, baseIndex + 2,
            baseIndex + 2, baseIndex + 3, baseIndex
        );
    }

    add_thick_line(x1, x2, x_color);   // X axis
    add_thick_line(y1, y2, y_color); // Y axis

    return {
        vertices: new Float32Array(verts),
        indices: new Uint8Array(indices),
    };
}

function create_graph_2d({ f, range = [-5, 5], steps = 100, thickness = 0.08 } = {}) {
    const [xmin, xmax] = range;
    const dx = (xmax - xmin) / steps;

    const verts = [];
    const indices = [];

    let prev = null;
    let index = 0;

    const color = [0.976, 0.255, 0.267]; 

    for (let i = 0; i <= steps; ++i) {
        const x = xmin + i * dx;
        const y = f(x);
        const curr = [x, y];

        if (prev) {
            const [x1, y1] = prev;
            const [x2, y2] = curr;
            const dx = x2 - x1, dy = y2 - y1;
            const len = Math.hypot(dx, dy);
            const ux = -dy / len, uy = dx / len;
            const wx = (ux * thickness) / 2;
            const wy = (uy * thickness) / 2;

            const quad = [
                [x1 - wx, y1 - wy, 0],
                [x1 + wx, y1 + wy, 0],
                [x2 + wx, y2 + wy, 0],
                [x2 - wx, y2 - wy, 0],
            ];

            for (const pos of quad) {
                verts.push(...pos, ...color, 0, 0, 1);
            }

            indices.push(
                index, index + 1, index + 2,
                index + 2, index + 3, index
            );

            index += 4;
        }

        prev = curr;
    }

    return {
        vertices: new Float32Array(verts),
        indices: new Uint16Array(indices),
    };
}

function create_vector_2d({
    origin = [0, 0],
    tip = [2, 2],
    thickness = 0.2,
    head_size = 0.3,
    head_width = 0.5,
    color = [1.0, 0.5, 0.0]
} = {}) {
    const verts = [];
    const indices = [];

    const [x1, y1] = origin;
    const [x2, y2] = tip;
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.hypot(dx, dy);

    if (len === 0) return { vertices: new Float32Array(), indices: new Uint8Array() };

    const ux = dx / len, uy = dy / len;

    const px = -uy, py = ux;
    const wx = px * thickness / 2;
    const wy = py * thickness / 2;

    const bx = x2 - ux * head_size;
    const by = y2 - uy * head_size;

    const baseIndex = 0;

    // Shaft rectangle (from origin to base of head)
    verts.push(
        x1 - wx, y1 - wy, 0, ...color, 0, 0, 1,
        x1 + wx, y1 + wy, 0, ...color, 0, 0, 1,
        bx + wx, by + wy, 0, ...color, 0, 0, 1,
        bx - wx, by - wy, 0, ...color, 0, 0, 1
    );

    indices.push(
        baseIndex, baseIndex + 1, baseIndex + 2,
        baseIndex + 2, baseIndex + 3, baseIndex
    );

    // Arrowhead triangle (base spread using head_width)
    const hwx = px * head_width / 2;
    const hwy = py * head_width / 2;

    verts.push(
        x2, y2, 0, ...color, 0, 0, 1,                   // tip
        bx - hwx, by - hwy, 0, ...color, 0, 0, 1,       // base left
        bx + hwx, by + hwy, 0, ...color, 0, 0, 1        // base right
    );

    indices.push(
        baseIndex + 4, baseIndex + 5, baseIndex + 6
    );

    return {
        vertices: new Float32Array(verts),
        indices: new Uint8Array(indices),
    };
}
