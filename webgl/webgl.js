const Iera_get_shader_sources = (vert_id, frag_id) => {
    const vert_src = document.getElementById(vert_id).textContent;
    const frag_src = document.getElementById(frag_id).textContent;
    return { vert_src, frag_src };
};

const Iera_compile_shader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
};

const Iera_compile_shaders = (gl, vert_src, frag_src) => {
    const vert = Iera_compile_shader(gl, gl.VERTEX_SHADER, vert_src);
    const frag = Iera_compile_shader(gl, gl.FRAGMENT_SHADER, frag_src);
    return { vert, frag };
};

const Iera_get_shaders = (gl, vert_id, frag_id) => {
    const { vert_src, frag_src } = Iera_get_shader_sources(vert_id, frag_id);
    return Iera_compile_shaders(gl, vert_src, frag_src);
};

const Iera_get_program = (gl, vert_id = "vert",  frag_id = "frag") => {
    const { vert, frag } = Iera_get_shaders(gl, vert_id, frag_id);

    const program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }

    gl.useProgram(program);
    return program;
};
