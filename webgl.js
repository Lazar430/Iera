const get_shader_sources = () => {
    const vert_src = document.getElementById("vert").textContent;
    const frag_src = document.getElementById("frag").textContent;
    return { vert_src, frag_src };
};

const compile_shader = (gl, type, source) => {
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

const compile_shaders = (gl, vert_src, frag_src) => {
    const vert = compile_shader(gl, gl.VERTEX_SHADER, vert_src);
    const frag = compile_shader(gl, gl.FRAGMENT_SHADER, frag_src);
    return { vert, frag };
};

const get_shaders = (gl) => {
    const { vert_src, frag_src } = get_shader_sources();
    return compile_shaders(gl, vert_src, frag_src);
};

const get_program = (gl) => {
    const { vert, frag } = get_shaders(gl);

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
