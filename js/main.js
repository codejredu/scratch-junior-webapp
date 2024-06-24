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
    // ... (שאר הבלוקים כפי שהיו קודם)
};

document.addEventListener('DOMContentLoaded', () => {
    initCategoryTabs();
    initBlockPalette();
    initScriptWorkspace();
});

function initCategoryTabs() {
    const tabsContainer = document.getElementById('category-tabs');
    if (!tabsContainer) {
        console.error('Element with id "category-tabs" not found');
        return;
    }
    tabsContainer.innerHTML = ''; // נקה את הלשוניות הקיימות
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
    if (!palette) {
        console.error('Element with id "block-palette" not found');
        return;
    }
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
    const firstCategory = Object.values(categories)[0];
    showCategoryBlocks(firstCategory);
}

function initScriptWorkspace() {
    const workspace = document.getElementById('script-workspace');
    if (!workspace) {
        console.error('Element with id "script-workspace" not found');
        return;
    }
    workspace.addEventListener('dragover', (e) => e.preventDefault());
    workspace.addEventListener('drop', (e) => {
        e.preventDefault();
        const blockType = JSON.parse(e.dataTransfer.getData('text'));
        const blockElement = createBlockElement(blockType);
        workspace.appendChild(blockElement);
    });
}

// הוספת פונקציה לדיבוג
function debugDisplay() {
    console.log('Categories:', categories);
    console.log('Block Types:', blockTypes);
    console.log('Category Tabs:', document.getElementById('category-tabs'));
    console.log('Block Palette:', document.getElementById('block-palette'));
}

// קריאה לפונקציית הדיבוג
document.addEventListener('DOMContentLoaded', debugDisplay);
