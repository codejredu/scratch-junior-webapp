// main.js

import { initBlockPalette, blockTypes } from './blocks.js';
import { categories } from './categories.js';

document.addEventListener('DOMContentLoaded', () => {
    initUI();
    initBlockPalette();
    initStage();
    initEventListeners();
});

function initUI() {
    const workspace = document.getElementById('workspace');
    const stageArea = document.getElementById('stage-area');
    const scriptArea = document.getElementById('script-area');

    // יצירת אזור הבמה
    const stage = document.createElement('canvas');
    stage.id = 'stage';
    stage.width = 480;
    stage.height = 360;
    stageArea.appendChild(stage);

    // יצירת רשימת דמויות
    const spriteList = document.createElement('div');
    spriteList.id = 'sprite-list';
    stageArea.appendChild(spriteList);

    // יצירת לוח הבלוקים
    const blockPalette = document.createElement('div');
    blockPalette.id = 'block-palette';
    scriptArea.appendChild(blockPalette);

    // יצירת אזור התסריטים
    const scriptWorkspace = document.createElement('div');
    scriptWorkspace.id = 'script-workspace';
    scriptArea.appendChild(scriptWorkspace);
}

function initBlockPalette() {
    const palette = document.getElementById('block-palette');

    // יצירת לשוניות לקטגוריות
    const categoryTabs = document.createElement('div');
    categoryTabs.className = 'category-tabs';
    Object.values(categories).forEach(category => {
        const tab = document.createElement('button');
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

    // הצגת הקטגוריה הראשונה כברירת מחדל
    showCategoryBlocks(Object.values(categories)[0]);
}

function showCategoryBlocks(category) {
    const blocksArea = document.querySelector('.blocks-area');
    blocksArea.innerHTML = '';
    Object.values(blockTypes)
        .filter(blockType => blockType.category === category)
        .forEach(blockType => {
            const blockElement = createBlockElement(blockType);
            blocksArea.appendChild(blockElement);
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
    blockElement.dataset.blockType = blockType.name;
    return blockElement;
}

function initStage() {
    const stage = document.getElementById('stage');
    const ctx = stage.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, stage.width, stage.height);
}

function initEventListeners() {
    const scriptWorkspace = document.getElementById('script-workspace');
    
    // אירועי גרירה ושחרור
    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('block')) {
            e.dataTransfer.setData('text/plain', e.target.dataset.blockType);
        }
    });

    scriptWorkspace.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    scriptWorkspace.addEventListener('drop', (e) => {
        e.preventDefault();
        const blockType = e.dataTransfer.getData('text');
        const block = createBlockElement(blockTypes[blockType]);
        scriptWorkspace.appendChild(block);
    });

    // אירועי כפתורים
    document.getElementById('new-project').addEventListener('click', () => {
        console.log('יצירת פרויקט חדש');
    });

    document.getElementById('save-project').addEventListener('click', () => {
        console.log('שמירת פרויקט');
    });

    document.getElementById('load-project').addEventListener('click', () => {
        console.log('טעינת פרויקט');
    });
}
