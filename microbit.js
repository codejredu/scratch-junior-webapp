// micro:bit Bluetooth UUIDs
const MICROBIT_SERVICE_UUID = 'e95dd91d-251d-470a-a062-fa1922dfa9a8';
const LED_STATE_CHARACTERISTIC_UUID = 'e95d7b77-251d-470a-a062-fa1922dfa9a8';

let microbitDevice;
let ledCharacteristic;

// Connect to micro:bit
async function connectMicrobit() {
    try {
        console.log('Requesting Bluetooth Device...');
        microbitDevice = await navigator.bluetooth.requestDevice({
            filters: [{ services: [MICROBIT_SERVICE_UUID] }]
        });

        console.log('Connecting to GATT Server...');
        const server = await microbitDevice.gatt.connect();

        console.log('Getting LED Service...');
        const service = await server.getPrimaryService(MICROBIT_SERVICE_UUID);

        console.log('Getting LED Characteristic...');
        ledCharacteristic = await service.getCharacteristic(LED_STATE_CHARACTERISTIC_UUID);

        console.log('micro:bit connected!');
    } catch (error) {
        console.error('Connection error:', error);
    }
}

// Set LED state
async function setLED(x, y, state) {
    if (!ledCharacteristic) {
        console.error('Not connected to micro:bit');
        return;
    }

    const ledMatrix = new Uint8Array(5);
    const byteIndex = Math.floor(y / 8);
    const bitIndex = y % 8;

    // Set or clear the bit corresponding to the LED
    if (state) {
        ledMatrix[byteIndex] |= (1 << bitIndex);
    } else {
        ledMatrix[byteIndex] &= ~(1 << bitIndex);
    }

    try {
        await ledCharacteristic.writeValue(ledMatrix);
        console.log(`LED at (${x},${y}) set to ${state ? 'ON' : 'OFF'}`);
    } catch (error) {
        console.error('Error setting LED:', error);
    }
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
    const connectButton = document.getElementById('connectButton');
    const ledToggleButton = document.getElementById('ledToggleButton');

    connectButton.addEventListener('click', connectMicrobit);

    ledToggleButton.addEventListener('click', async () => {
        // Toggle LED at position (2,2)
        await setLED(2, 2, true);
        setTimeout(() => setLED(2, 2, false), 1000); // Turn off after 1 second
    });
});
