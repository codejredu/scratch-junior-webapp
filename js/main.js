import { initCanvas } from './canvas.js';
import { initBlockPalette } from './blocks.js';
import { initSprites } from './sprites.js';

function init() {
    const canvas = initCanvas();
    const blockPalette = initBlockPalette();
    const sprites = initSprites(canvas);

    // כאן נוסיף יותר לוגיקה בהמשך
}

document.addEventListener('DOMContentLoaded', init);
