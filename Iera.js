(function() {
    // Get base path from where Iera.js was included
    const currentScript = document.currentScript;
    const basePath = currentScript.src.replace(/\/[^\/]*$/, "/");

    const scripts = [
	"webgl/webgl.js",
        "webgl/setup.js",
        "primitives/shapes.js",
        "primitives/plot.js",
        "core/draw.js",
        "core/shape.js",
        "core/control.js",
        "core/state.js",
        "core/renderer.js"
    ];

    // Write each script tag directly into the document
    scripts.forEach(src => {
        document.write(`<script src="${basePath}${src}"><\/script>`);
    });
})();
