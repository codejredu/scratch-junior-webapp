// main.js

const categories = {
    MOTION: { name: 'תנועה', color: '#4a6cd4' },
    LOOKS: { name: 'מראה', color: '#8a55d7' },
    SOUND: { name: 'צליל', color: '#bb42c3' },
    CONTROL: { name: 'בקרה', color: '#e1a91a' },
    EVENTS: { name: 'אירועים', color: '#c88330' }
};

const blockTypes = {
    MOVE_RIGHT: { category: categories.MOTION, name: 'זוז ימינה', icon: '➡️' },
    MOVE_LEFT: { category: categories.MOTION, name: 'זוז שמאלה', icon: '⬅️' },
    MOVE_UP: { category: categories.MOTION, name: 'זוז למעלה', icon: '⬆️' },
    MOVE_DOWN: { category: categories.MOTION, name: 'זוז למטה', icon: '⬇️' },
    SAY: { category: categories.LOOKS, name: 'אמור', icon: '💬' },
    PLAY_SOUND: { category: categories.SOUND, name: 'נגן צליל', icon: '🔊' },
    WAIT: { category: categories.CONTROL, name: 'המתן', icon: '⏳' },
    ON_FLAG: { category: categories.EVENTS, name: 'כשלוחצים על הדגל', icon: '🏁' }
};

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
    // Show blocks for the first category by default
    showCategoryBlocks(Object.values(categories)[0]);
}

function initScriptWorkspace() {
    const workspace = document.getElementById('script-workspace');
    workspace.addEventListener('dragover', (e) => e.preventDefault());
    workspace.addEventListener('drop', (e) => {
        e.preventDefault();
        const blockType = JSON.parse(e.dataTransfer.getData('text'));
        const blockElement = createBlockElement(blockType);
        workspace.appendChild(blockElement);
    });
}
