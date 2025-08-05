(function() {
    const scripts = [
	"webgl/setup.js",
	"primitives/shapes.js",
	"primitives/plot.js",
	"core/draw.js",
	"core/shape.js",
	"core/control.js",
	"core/state.js",
	"core/renderer.js"
    ];

    // Insert each script tag directly into the document in order
    scripts.forEach(src => {
	document.write(`<script src="${src}"><\/script>`);
    });
})();
