// main.js

const blockTypes = {
    MOVE_RIGHT: { category: 'תנועה', name: 'זוז ימינה', icon: '➡️', color: '#4a6cd4' },
    MOVE_LEFT: { category: 'תנועה', name: 'זוז שמאלה', icon: '⬅️', color: '#4a6cd4' },
    MOVE_UP: { category: 'תנועה', name: 'זוז למעלה', icon: '⬆️', color: '#4a6cd4' },
    MOVE_DOWN: { category: 'תנועה', name: 'זוז למטה', icon: '⬇️', color: '#4a6cd4' },
    SAY: { category: 'מראה', name: 'אמור', icon: '💬', color: '#8a55d7' },
    PLAY_SOUND: { category: 'צליל', name: 'נגן צליל', icon: '🔊', color: '#bb42c3' },
    WAIT: { category: 'בקרה', name: 'המתן', icon: '⏳', color: '#e1a91a' },
    ON_FLAG: { category: 'אירועים', name: 'כשלוחצים על הדגל', icon: '🏁', color: '#c88330' }
};

document.addEventListener('DOMContentLoaded', () => {
    initBlockPalette();
    initScriptWorkspace();
});

function initBlockPalette() {
    const palette = document.getElementById('block-palette');
    Object.values(blockTypes).forEach(blockType => {
        const blockElement = createBlockElement(blockType);
        palette.appendChild(blockElement);
    });
}

function createBlockElement(blockType) {
    const blockElement = document.createElement('div');
    blockElement.className = 'block';
    blockElement.style.backgroundColor = blockType.color;
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
