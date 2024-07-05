class MyExtension {
    constructor (runtime) {
        this.runtime = runtime;
        this.runtime.registerExtension('MyExtension', this);
    }

    getInfo () {
        return {
            id: 'myExtension',
            name: 'My Extension',
            blocks: [
                {
                    opcode: 'sayHello',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Say Hello to [NAME]',
                    arguments: {
                        NAME: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'World'
                        }
                    }
                }
            ]
        };
    }

    sayHello (args) {
        const name = args.NAME;
        console.log(`Hello, ${name}!`);
    }
}

module.exports = MyExtension;
