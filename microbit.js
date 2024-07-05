(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting function
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Your custom blocks
    ext.myCustomBlock = function() {
        // Block functionality here
        alert('Custom block executed!');
    };

    // Block definitions
    var descriptor = [
        {
            opcode: 'myCustomBlock',
            blockType: Scratch.BlockType.COMMAND,
            text: 'my custom block'
        }
    ];

    // Register the extension
    Scratch.extensions.register('My Custom Extension', descriptor);
})({});
