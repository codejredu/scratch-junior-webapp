class Scratch3MicrobitExtension {
    constructor(runtime) {
        this.runtime = runtime;
        this.device = null;
        this.ledCharacteristic = null;
    }

    getInfo() {
        return {
            id: 'microbitLED',
            name: 'micro:bit LED',
            blocks: [
                {
                    opcode: 'connectMicrobit',
                    blockType: 'command',
                    text: 'Connect to micro:bit'
                },
                {
                    opcode: 'setLED',
                    blockType: 'command',
                    text: 'Set LED at x: [X] y: [Y] to [STATE]',
                    arguments: {
                        X: {
                            type: 'number',
                            defaultValue: 0
                        },
                        Y: {
                            type: 'number',
                            defaultValue: 0
                        },
                        STATE: {
                            type: 'string',
                            menu: 'ledStates',
                            defaultValue: 'on'
                        }
                    }
                }
            ],
            menus: {
                ledStates: ['on', 'off']
            }
        };
    }

    connectMicrobit() {
        return navigator.bluetooth.requestDevice({
            filters: [{ services: ['e95dd91d-251d-470a-a062-fa1922dfa9a8'] }]
        })
        .then(device => {
            this.device = device;
            return device.gatt.connect();
        })
        .then(server => server.getPrimaryService('e95dd91d-251d-470a-a062-fa1922dfa9a8'))
        .then(service => service.getCharacteristic('e95d7b77-251d-470a-a062-fa1922dfa9a8'))
        .then(characteristic => {
            this.ledCharacteristic = characteristic;
            return 'Connected to micro:bit';
        })
        .catch(error => {
            console.error('Connection error:', error);
            return 'Failed to connect';
        });
    }

    setLED(args) {
        if (!this.ledCharacteristic) {
            return 'Not connected to micro:bit';
        }

        const x = Math.floor(args.X);
        const y = Math.floor(args.Y);
        const state = args.STATE === 'on';

        if (x < 0 || x > 4 || y < 0 || y > 4) {
            return 'Invalid LED position';
        }

        const ledMatrix = new Uint8Array(5);
        const byteIndex = y;
        const bitIndex = 4 - x;

        if (state) {
            ledMatrix[byteIndex] |= (1 << bitIndex);
        } else {
            ledMatrix[byteIndex] &= ~(1 << bitIndex);
        }

        return this.ledCharacteristic.writeValue(ledMatrix)
            .then(() => `LED at (${x},${y}) set to ${state ? 'ON' : 'OFF'}`)
            .catch(error => {
                console.error('Error setting LED:', error);
                return 'Failed to set LED';
            });
    }
}

Scratch.extensions.register(new Scratch3MicrobitExtension());
