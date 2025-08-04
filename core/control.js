function Iera_enable_dragging(canvas, dragState) {
    canvas.addEventListener("mousedown", e => {
        dragState.dragging = true;
        dragState.prevX = e.clientX;
        dragState.prevY = e.clientY;
    });

    canvas.addEventListener("mouseup", () => dragState.dragging = false);

    canvas.addEventListener("mousemove", e => {
        if (!dragState.dragging) return;

        const dx = e.clientX - dragState.prevX;
        const dy = e.clientY - dragState.prevY;

        dragState.prevX = e.clientX;
        dragState.prevY = e.clientY;

        dragState.azimuth += dx * 0.01;
        dragState.elevation = Math.max(
            -Math.PI / 2 + 0.01,
            Math.min(Math.PI / 2 - 0.01, dragState.elevation + dy * 0.01)
        );
    });
}

function Iera_click(canvas, shapes){
    canvas.addEventListener("click", e => {
	const rect = canvas.getBoundingClientRect();
	const x = (e.clientX - rect.left) / canvas.width * 2 - 1;
	const y = (rect.bottom - e.clientY) / canvas.height * 2 - 1;

	for (const shape of shapes) {
            if (!shape.clickable || !shape.ndc_center) continue;

            const [cx, cy] = shape.ndc_center;
            const s = 0.15; // threshold in NDC

            if (x >= cx - s && x <= cx + s && y >= cy - s && y <= cy + s) {
		if (typeof shape.onclick === "function") shape.onclick();
            }
	}
    });

}
