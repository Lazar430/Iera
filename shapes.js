function create_colored_cube(center = [0, 0, 0], size = 2) {
    const [cx, cy, cz] = center;
    const s = size / 2;

    const positions = [
        [ cx + s, cy + s, cz + s ], // v0
        [ cx - s, cy + s, cz + s ], // v1
        [ cx - s, cy - s, cz + s ], // v2
        [ cx + s, cy - s, cz + s ], // v3
        [ cx + s, cy - s, cz - s ], // v4
        [ cx + s, cy + s, cz - s ], // v5
        [ cx - s, cy + s, cz - s ], // v6
        [ cx - s, cy - s, cz - s ]  // v7
    ];

    const colors = [
        [1, 1, 1], [1, 0, 1], [1, 0, 0], [1, 1, 0],
        [0, 1, 0], [0, 1, 1], [0, 0, 1], [0, 0, 0]
    ];

    const vertices_colors = new Float32Array(
        positions.flatMap((pos, i) => [...pos, ...colors[i]])
    );

    const indices = new Uint8Array([
        0, 1, 2,   0, 2, 3,
        0, 3, 4,   0, 4, 5,
        0, 5, 6,   0, 6, 1,
        1, 6, 7,   1, 7, 2,
        7, 4, 3,   7, 3, 2,
        4, 7, 6,   4, 6, 5
    ]);

    return { vertices_colors, indices };
}

// pyramid.js
function create_colored_pyramid(center = [0, 0, 0], size = 2) {
    const [cx, cy, cz] = center;
    const h = size;       // height
    const s = size / 2;   // half-base

    const positions = [
        // Base (square)
        [cx - s, cy, cz - s], // 0
        [cx + s, cy, cz - s], // 1
        [cx + s, cy, cz + s], // 2
        [cx - s, cy, cz + s], // 3

        // Apex
        [cx, cy + h, cz]      // 4
    ];

    const colors = [
        [1, 0, 0],  // red
        [0, 1, 0],  // green
        [0, 0, 1],  // blue
        [1, 1, 0],  // yellow
        [1, 0, 1]   // magenta (apex)
    ];

    const vertices_colors = new Float32Array(
        positions.flatMap((pos, i) => [...pos, ...colors[i]])
    );

    const indices = new Uint8Array([
        // Base (two triangles)
        0, 1, 2,
        0, 2, 3,

        // Sides (4 triangles)
        0, 1, 4,
        1, 2, 4,
        2, 3, 4,
        3, 0, 4
    ]);

    return { vertices_colors, indices };
}
