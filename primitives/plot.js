function create_axes_2d({ center = [0, 0, 0], size = 2 } = {}) {
    const [cx, cy, cz = 0] = center;
    const half = size / 2;

    const positions_colors = new Float32Array([
        // X axis (red)
        cx - half, cy, cz,   1, 0, 0,
        cx + half, cy, cz,   1, 0, 0,

        // Y axis (green)
        cx, cy - half, cz,   0, 1, 0,
        cx, cy + half, cz,   0, 1, 0,
    ]);

    const indices = new Uint8Array([
        0, 1,  // X axis
        2, 3   // Y axis
    ]);

    return {
        vertices_colors: positions_colors,
        indices,
    };
}

function create_graph_2d( { f, range = [-5, 5], steps = 100 } = {} ) {
    const positions_colors = [];
    const indices = [];

    const [xmin, xmax] = range;
    const dx = (xmax - xmin) / steps;

    for (let i = 0; i <= steps; ++i) {
        const x = xmin + i * dx;
        const y = f(x);
	
        positions_colors.push(x, y, 0, 0, 0, 1);
        if (i > 0) {
            const a = i - 1;
            const b = i;
            indices.push(a, b);
        }
    }

    return {
        vertices_colors: new Float32Array(positions_colors),
        indices: new Uint16Array(indices),
    };
}
