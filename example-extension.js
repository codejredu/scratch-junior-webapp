(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This extension must run unsandboxed');
    }

    class Scratch3ExampleExtension {
        constructor(runtime) {
            this.runtime = runtime;
        }

        getInfo() {
            return {
                id: 'exampleextension',
                name: 'Example Extension',
                blocks: [
                    {
                        opcode: 'sayHello',
                        blockType: 'reporter',
                        text: 'say hello to [NAME]',
                        arguments: {
                            NAME: {
                                type: 'string',
                                defaultValue: 'World'
                            }
                        }
                    },
                    {
                        opcode: 'addNumbers',
                        blockType: 'reporter',
                        text: 'add [NUM1] and [NUM2]',
                        arguments: {
                            NUM1: {
                                type: 'number',
                                defaultValue: 0
                            },
                            NUM2: {
                                type: 'number',
                                defaultValue: 0
                            }
                        }
                    }
                ]
            };
        }

        sayHello(args) {
            return `Hello, ${args.NAME}!`;
        }

        addNumbers(args) {
            return args.NUM1 + args.NUM2;
        }
    }

    Scratch.extensions.register(new Scratch3ExampleExtension());
})(Scratch);