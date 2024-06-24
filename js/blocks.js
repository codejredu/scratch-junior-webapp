const blockTypes = {
    MOVE_RIGHT: 'moveRight',
    MOVE_LEFT: 'moveLeft',
    MOVE_UP: 'moveUp',
    MOVE_DOWN: 'moveDown',
    SAY: 'say',
    PLAY_SOUND: 'playSound'
};

class Block {
    constructor(type, params = {}) {
        this.type = type;
        this.params = params;
    }

    execute(sprite) {
        switch (this.type) {
            case blockTypes.MOVE_RIGHT:
                sprite.move(10, 0);
                break;
            case blockTypes.MOVE_LEFT:
                sprite.move(-10, 0);
                break;
            case blockTypes.MOVE_UP:
                sprite.move(0, -10);
                break;
            case blockTypes.MOVE_DOWN:
                sprite.move(0, 10);
                break;
            case blockTypes.SAY:
                console.log(`Sprite says: ${this.params.message}`);
                break;
            case blockTypes.PLAY_SOUND:
                console.log(`Playing sound: ${this.params.sound}`);
                break;
        }
    }
}

export function initBlockPalette() {
    const palette = document.getElementById('block-palette');

    Object.values(blockTypes).forEach(type => {
        const blockElement = document.createElement('div');
        blockElement.className = 'block';
        blockElement.textContent = type;
        blockElement.draggable = true;
        palette.appendChild(blockElement);
    });

    return palette;
}
