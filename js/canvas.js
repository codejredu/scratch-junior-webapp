export function initCanvas() {
    const canvas = document.getElementById('scratchjr-canvas');
    const ctx = canvas.getContext('2d');

    function clear() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawGrid() {
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;

        for (let x = 0; x <= canvas.width; x += 20) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        for (let y = 0; y <= canvas.height; y += 20) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }

    clear();
    drawGrid();

    return { canvas, ctx, clear, drawGrid };
}
