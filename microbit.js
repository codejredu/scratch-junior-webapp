// שם התוסף
Scratch.extensions["microbit_bluetooth"] = {

  // שם התוסף שיופיע ב-Scratch
  name: "Microbit Bluetooth",

  // תיאור התוסף
  description: "Connect to a Microbit via Bluetooth and control the LED matrix.",

  // קטגוריות התוסף
  categories: ["Communication", "Sensors"],

  // בלוקים
  blocks: [

    // בלוק להתחברות למיקרוביט באמצעות בלוטות'
    {
      opcode: "connectToMicrobit",
      blockType: "command",
      text: "Connect to Microbit",
      args: [],
    },

    // בלוק לקריאת ערך מהמגנטומטר
    {
      opcode: "readMagnetometerX",
      blockType: "reporter",
      text: "Read Magnetometer X",
      args: [],
    },

    // בלוק להגדרת בהירות של LED
    {
      opcode: "setLedBrightness",
      blockType: "command",
      text: "Set LED Brightness",
      args: [
        {
          name: "led",
          type: "number",
          defaultValue: 1,
          min: 1,
          max: 5,
        },
        {
          name: "brightness",
          type: "number",
          defaultValue: 0,
          min: 0,
          max: 255,
        },
      ],
    },

    // בלוק להצגת תו על גבי LED
    {
      opcode: "displayCharacter",
      blockType: "command",
      text: "Display Character",
      args: [
        {
          name: "character",
          type: "string",
          defaultValue: "A",
        },
        {
          name: "led",
          type: "number",
          defaultValue: 1,
          min: 1,
          max: 5,
        },
      ],
    },

    // בלוק להגדרת כל ה-LEDים כבויים
    {
      opcode: "turnAllLedsOff",
      blockType: "command",
      text: "Turn All LEDs Off",
      args: [],
    },

    // בלוק להגדרת כל ה-LEDים למקסימום בהירות
    {
      opcode: "turnAllLedsOn",
      blockType: "command",
      text: "Turn All LEDs On",
      args: [],
    },

  ],

  // אירועים
  events: [],

  // דגלים
  flags: [],

};
