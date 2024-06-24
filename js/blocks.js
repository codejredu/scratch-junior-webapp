import { categories } from './categories.js';

export const blockTypes = {
    // תנועה
    MOVE_RIGHT: { category: categories.MOTION, name: 'זוז ימינה', icon: '➡️' },
    MOVE_LEFT: { category: categories.MOTION, name: 'זוז שמאלה', icon: '⬅️' },
    MOVE_UP: { category: categories.MOTION, name: 'זוז למעלה', icon: '⬆️' },
    MOVE_DOWN: { category: categories.MOTION, name: 'זוז למטה', icon: '⬇️' },
    TURN_RIGHT: { category: categories.MOTION, name: 'הסתובב ימינה', icon: '↩️' },
    TURN_LEFT: { category: categories.MOTION, name: 'הסתובב שמאלה', icon: '↪️' },

    // מראה
    SAY: { category: categories.LOOKS, name: 'אמור', icon: '💬' },
    GROW: { category: categories.LOOKS, name: 'גדל', icon: '🔼' },
    SHRINK: { category: categories.LOOKS, name: 'הקטן', icon: '🔽' },
    HIDE: { category: categories.LOOKS, name: 'הסתר', icon: '👻' },
    SHOW: { category: categories.LOOKS, name: 'הצג', icon: '👀' },

    // צליל
    PLAY_SOUND: { category: categories.SOUND, name: 'נגן צליל', icon: '🔊' },
    
    // בקרה
    WAIT: { category: categories.CONTROL, name: 'המתן', icon: '⏳' },
    REPEAT: { category: categories.CONTROL, name: 'חזור', icon: '🔁' },
    STOP: { category: categories.CONTROL, name: 'עצור', icon: '🛑' },

    // אירועים
    ON_TAP: { category: categories.TRIGGER, name: 'בלחיצה', icon: '👆' },
    ON_FLAG: { category: categories.TRIGGER, name: 'כשלוחצים על הדגל', icon: '🏁' }
};

export class Block {
    constructor(type, params = {}) {
        this.type = type;
        this.params = params;
    }

    execute(sprite) {
        switch (this.type) {
            case blockTypes.MOVE_RIGHT:
                sprite.move(20, 0);
                break;
            case blockTypes.MOVE_LEFT:
                sprite.move(-20, 0);
                break;
            case blockTypes.MOVE_UP:
                sprite.move(0, -20);
                break;
            case blockTypes.MOVE_DOWN:
                sprite.move(0, 20);
                break;
            case blockTypes.TURN_RIGHT:
                sprite.rotate(90);
                break;
            case blockTypes.TURN_LEFT:
                sprite.rotate(-90);
                break;
            case blockTypes.SAY:
                sprite.say(this.params.message);
                break;
            case blockTypes.GROW:
                sprite.scale(1.2);
                break;
            case blockTypes.SHRINK:
                sprite.scale(0.8);
                break;
            case blockTypes.HIDE:
                sprite.hide();
                break;
            case blockTypes.SHOW:
                sprite.show();
                break;
            case blockTypes.PLAY_SOUND:
                sprite.playSound(this.params.sound);
                break;
            case blockTypes.WAIT:
                // יש לממש מנגנון המתנה אסינכרוני
                break;
            case blockTypes.REPEAT:
                // יש לממש מנגנון חזרה
                break;
            case blockTypes.STOP:
                sprite.stop();
                break;
            case blockTypes.ON_TAP:
            case blockTypes.ON_FLAG:
                // אירועים אלה מטופלים ברמת התסריט
                break;
        }
    }
}

export function createBlockElement(blockType) {
    const blockElement = document.createElement('div');
    blockElement.className = 'block';
    blockElement.style.backgroundColor = blockType.category.color;
    blockElement.innerHTML = `
        <span class="block-icon">${blockType.icon}</span>
        <span class="block-name">${blockType.name}</span>
    `;
    blockElement.draggable = true;
    blockElement.dataset.blockType = blockType.name;
    return blockElement;
}

export function initBlockPalette() {
    const palette = document.getElementById('block-palette');

    // יצירת לשוניות לקטגוריות
    const categoryTabs = document.createElement('div');
    categoryTabs.className = 'category-tabs';
    Object.values(categories).forEach(category => {
        const tab = document.createElement('div');
        tab.className = 'category-tab';
        tab.textContent = category.name;
        tab.style.backgroundColor = category.color;
        tab.onclick = () => showCategoryBlocks(category);
        categoryTabs.appendChild(tab);
    });
    palette.appendChild(categoryTabs);

    // יצירת אזור הבלוקים
    const blocksArea = document.createElement('div');
    blocksArea.className = 'blocks-area';
    palette.appendChild(blocksArea);

    function showCategoryBlocks(category) {
        blocksArea.innerHTML = '';
        Object.values(blockTypes)
            .filter(blockType => blockType.category === category)
            .forEach(blockType => {
                blocksArea.appendChild(createBlockElement(blockType));
            });
    }

    // הצג את הקטגוריה הראשונה כברירת מחדל
    showCategoryBlocks(categories.MOTION);

    return palette;
}
