// main.js

const categories = {
    TRIGGER: { name: 'אירועים', color: '#FFA500' },
    MOTION: { name: 'תנועה', color: '#4C97FF' },
    LOOKS: { name: 'מראה', color: '#9966FF' },
    SOUND: { name: 'צליל', color: '#CF63CF' },
    CONTROL: { name: 'בקרה', color: '#FFAB19' },
    END: { name: 'סיום', color: '#FF6680' }
};

const blockTypes = {
    // אירועים
    START_ON_GREEN_FLAG: { category: categories.TRIGGER, name: 'התחל בלחיצה על דגל ירוק', icon: '🏁' },
    START_ON_TAP: { category: categories.TRIGGER, name: 'התחל בלחיצה', icon: '👆' },
    START_ON_BUMP: { category: categories.TRIGGER, name: 'התחל במגע', icon: '💥' },
    START_ON_MESSAGE: { category: categories.TRIGGER, name: 'התחל בקבלת הודעה', icon: '📨' },
    SEND_MESSAGE: { category: categories.TRIGGER, name: 'שלח הודעה', icon: '📤' },

    // תנועה
    MOVE_RIGHT: { category: categories.MOTION, name: 'זוז ימינה', icon: '➡️' },
    MOVE_LEFT: { category: categories.MOTION, name: 'זוז שמאלה', icon: '⬅️' },
    MOVE_UP: { category: categories.MOTION, name: 'זוז למעלה', icon: '⬆️' },
    MOVE_DOWN: { category: categories.MOTION, name: 'זוז למטה', icon: '⬇️' },
    TURN_RIGHT: { category: categories.MOTION, name: 'הסתובב ימינה', icon: '↩️' },
    TURN_LEFT: { category: categories.MOTION, name: 'הסתובב שמאלה', icon: '↪️' },
    HOP: { category: categories.MOTION, name: 'קפוץ', icon: '🦘' },
    GO_HOME: { category: categories.MOTION, name: 'חזור הביתה', icon: '🏠' },

    // מראה
    SAY: { category: categories.LOOKS, name: 'אמור', icon: '💬' },
    GROW: { category: categories.LOOKS, name: 'גדל', icon: '🔼' },
    SHRINK: { category: categories.LOOKS, name: 'התכווץ', icon: '🔽' },
    RESET_SIZE: { category: categories.LOOKS, name: 'אפס גודל', icon: '🔄' },
    HIDE: { category: categories.LOOKS, name: 'הסתר', icon: '👻' },
    SHOW: { category: categories.LOOKS, name: 'הצג', icon: '👀' },

    // צליל
    POP: { category: categories.SOUND, name: 'השמע פופ', icon: '🎵' },
    PLAY_RECORDED_SOUND: { category: categories.SOUND, name: 'נגן צליל מוקלט', icon: '🔊' },

    // בקרה
    WAIT: { category: categories.CONTROL, name: 'המתן', icon: '⏳' },
    STOP: { category: categories.CONTROL, name: 'עצור', icon: '🛑' },
    SET_SPEED_REPEAT: { category: categories.CONTROL, name: 'קבע מהירות וחזרה', icon: '🔁' },
    REPEAT_FOREVER: { category: categories.CONTROL, name: 'חזור לנצח', icon: '♾️' },
    REPEAT: { category: categories.CONTROL, name: 'חזור', icon: '🔂' },
    GO_TO_PAGE: { category: categories.CONTROL, name: 'עבור לדף', icon: '📄' },

    // סיום
    END: { category: categories.END, name: 'סיום', icon: '🏁' }
};

// יתר הקוד נשאר זהה
document.addEventListener('DOMContentLoaded', () => {
    initCategoryTabs();
    initBlockPalette();
    initScriptWorkspace();
});

function initCategoryTabs() {
    const tabsContainer = document.getElementById('category-tabs');
    Object.values(categories).forEach(category => {
        const tab = document.createElement('button');
        tab.className = 'category-tab';
        tab.textContent = category.name;
        tab.style.backgroundColor = category.color;
        tab.addEventListener('click', () => showCategoryBlocks(category));
        tabsContainer.appendChild(tab);
    });
}

function showCategoryBlocks(category) {
    const palette = document.getElementById('block-palette');
    palette.innerHTML = '';
    Object.values(blockTypes)
        .filter(block => block.category === category)
        .forEach(block => {
            const blockElement = createBlockElement(block);
            palette.appendChild(blockElement);
        });
}

function createBlockElement(blockType) {
    const blockElement = document.createElement('div');
    blockElement.className = 'block';
    blockElement.style.backgroundColor = blockType.category.color;
    blockElement.innerHTML = `
        <span class="block-icon">${blockType.icon}</span>
        <span class="block-name">${blockType.name}</span>
    `;
    blockElement.draggable = true;
    blockElement.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify(blockType));
    });
    return blockElement;
}

function initBlockPalette() {
    // הצג את הבלוקים של הקטגוריה הראשונה כברירת מחדל
    showCategoryBlocks(Object.values(categories)[0]);
}

function initScriptWorkspace() {
    const workspace = document.getElementById('script-workspace');
    workspace.addEventL
