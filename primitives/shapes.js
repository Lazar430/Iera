function create_cube({ center = [0, 0, 0], size = 2 } = {}) {
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
function create_pyramid({ center = [0, 0, 0], size = 2 } = {}) {
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

function create_sphere({ center = [0, 0, 0], size = 1, lat_divisions = 64, lon_divisions = 64 } = {}) {
    const [cx, cy, cz] = center;
    const radius = size;
    const vertices_colors = [];
    const indices = [];

    for (let lat = 0; lat <= lat_divisions; ++lat) {
	//theta travels along a semicircle (from "south" to "north")
        const theta = lat * Math.PI / lat_divisions;
	
        const sin_theta = Math.sin(theta);
        const cos_theta = Math.cos(theta);

        for (let lon = 0; lon <= lon_divisions; ++lon) {
	    //phi travels along a full circle (across the sphere)
            const phi = lon * 2 * Math.PI / lon_divisions;
	    
            const sin_phi = Math.sin(phi);
            const cos_phi = Math.cos(phi);

	    //the formulas below are the result of the WebGL convension of having the y axis point up and
	    //x and z to point across the inner circle of the sphere; usually the formulas for y and z are
	    //swaped in regular sphere coordinate geometry

	    //x and z describe a circle traced by the projection of the radius onto the xz plane (sin)
            const x = sin_theta * cos_phi;
	    const z = sin_theta * sin_phi;
	    //y is given by the projection of the radius onto the y axis (cos)
            const y = cos_theta;
            

            vertices_colors.push(
                cx + radius * x, cy + radius * y, cz + radius * z,
                (x + 1) / 2, (y + 1) / 2, (z + 1) / 2
            );
        }
    }

    //indices form a (lat_divisions + 1) x (lon_divisions  + 1) grid
    
    // lat_divisions * (lon_divisions + 1)   lat_divisions * (lon_divisions + 1) + 1   ...   (lat_divisions + 1) * (lon_divisions + 1)
    // ...
    // k * (lon_divisions + 1)               k * (lon_divisions + 1) + 1               ...   k * (lon_divisions + 1)
    // ...
    // lon_divisions + 1                     (lon_divisions + 1) + 1                   ...   2 * (lon_divisions + 1)
    // 0                                     1                                         ...   lon_divsions + 1
    for (let lat = 0; lat < lat_divisions; ++lat) {
        for (let lon = 0; lon < lon_divisions; ++lon) {
            const first = lat * (lon_divisions + 1) + lon;
            const second = first + lon_divisions + 1;

	    // (second) ------ (second + 1)
	    //    |    \           |
	    //    |       \        |
	    //    |          \     |
	    // (first)  ------ (first + 1)
            indices.push(first, second, first + 1);
            indices.push(second, second + 1, first + 1);
        }
    }

    return {
        vertices_colors: new Float32Array(vertices_colors),
        indices: new Uint16Array(indices),
    };
}

function create_square({ center, size = 1 } = {}) {
    [cx, cy] = center;
    const cz = 0;
    
    const half = size / 2;

    const positions = [
        [cx - half, cy - half, cz], // bottom left
        [cx + half, cy - half, cz], // bottom right
        [cx + half, cy + half, cz], // top right
        [cx - half, cy + half, cz], // top left
    ];

    const colors = [
        [1, 0, 0], // red
        [0, 1, 0], // green
        [0, 0, 1], // blue
        [1, 1, 0], // yellow
    ];

    const vertices_colors = new Float32Array(
        positions.flatMap((pos, i) => [...pos, ...colors[i]])
    );

    const indices = new Uint8Array([
        0, 1, 2,
        2, 3, 0
    ]);

    return { vertices_colors, indices };
}

function create_triangle({ center, size } = {}) {
    const [cx, cy] = center;
    const cz = 0;

    const vertices_colors = new Float32Array([
        cx, cy + size, cz,    1, 0, 0,
        cx - size, cy - size, cz,    0, 1, 0,
        cx + size, cy - size, cz,    0, 0, 1,
    ]);

    const indices = new Uint8Array([0, 1, 2]);

    return { vertices_colors, indices };
}

function create_circle({ center, size: radius, divisions = 64 } = {}){
    [cx, cy] = center;
    cz = 0;

    const vertices_colors = [];
    const indices = [];

    vertices_colors.push(cx, cy, cz, 1, 1, 1);

    for(let i = 0; i <= divisions; ++i){
	const angle = 2 * Math.PI * (i / divisions);
	x = cx + radius * Math.cos(angle);
	y = cy + radius * Math.sin(angle);

	vertices_colors.push(x, y, cz, Math.cos(angle), Math.sin(angle), 1);

	if(i > 0){
	    indices.push(0, i, i + 1);
	}
    }

    return {
        vertices_colors: new Float32Array(vertices_colors),
        indices: new Uint8Array(indices),
    };
}
