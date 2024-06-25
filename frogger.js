// Canvas and context setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let frogX = canvas.width / 2;
let frogY = canvas.height - 50;
let score = 0;
let lives = 3;
let level = 1;
let gameOver = false;

// Images
const frogImage = new Image();
frogImage.src = 'frog.png';
const carImage = new Image();
carImage.src = 'car.png';
const logImage = new Image();
logImage.src = 'log.png';
const turtleImage = new Image();
turtleImage.src = 'turtle.png';
const alligatorImage = new Image();
alligatorImage.src = 'alligator.png';
const homeImage = new Image();
homeImage.src = 'home.png';

// Obstacles (using arrays for each type)
let cars = [];
let logs = [];
let turtles = [];
let alligators = [];

// Create obstacles on load
function createObstacles() {
  // Cars
  for (let i = 0; i < 5; i++) {
    let car = {
      x: Math.random() * (canvas.width - 50),
      y: i * 50,
      width: 50,
      height: 30,
      direction: Math.random() < 0.5 ? -1 : 1, // Random direction
      speed: 1, // Adjust speed for difficulty
    };
    cars.push(car);
  }

  // Logs
  for (let i = 0; i < 3; i++) {
    let log = {
      x: Math.random() * (canvas.width - 50),
      y: canvas.height / 2 + i * 50,
      width: 50,
      height: 20,
      direction: Math.random() < 0.5 ? -1 : 1, // Random direction
      speed: 1, // Adjust speed for difficulty
    };
    logs.push(log);
  }

  // Turtles
  for (let i = 0; i < 2; i++) {
    let turtle = {
      x: Math.random() * (canvas.width - 50),
      y: canvas.height / 2 + i * 50 + 30, // Place turtles below logs
      width: 50,
      height: 20,
      direction: Math.random() < 0.5 ? -1 : 1, // Random direction
      speed: 0.5, // Adjust speed for difficulty
    };
    turtles.push(turtle);
  }

  // Alligators
  for (let i = 0; i < 3; i++) {
    let alligator = {
      x: Math.random() * (canvas.width - 50),
      y: canvas.height / 2 + i * 50 + 60, // Place alligators below turtles
      width: 50,
      height: 20,
      direction: 0, // Alligators don't move
    };
    alligators.push(alligator);
  }
}

// Event listeners for frog movement
document.addEventListener('keydown', function (e) {
  switch (e.key) {
    case 'ArrowUp':
      frogY -= 50;
      break;
    case 'ArrowDown':
      frogY += 50;
      break;
    case 'ArrowLeft':
      frogX -= 50;
      break;
    case 'ArrowRight':
      frogX += 50;
      break;
  }

  // Check for collision with obstacles
  checkCollision();
});

// Function to check collision
function checkCollision() {
  // Check collision with cars
  cars.forEach((car) => {
    if (
      frogX >= car.x &&
      frogX <= car.x + car.width &&
      frogY >= car.y &&
      frogY <= car.y + car.height
    ) {
      lives--;
      resetFrog();
    }
  });

  // Check collision with logs and turtles
  logs.forEach((log) => {
    if (
      frogX >= log.x &&
      frogX <= log.x + log.width &&
      frogY >= log.y &&
      frogY <= log.y + log.height
    ) {
      // Move frog with log
      frogX += log.speed * log.direction;
    }
  });
  turtles.forEach((turtle) => {
    if (
      frogX >= turtle.x &&
      frogX <= turtle.x + turtle.width &&
      frogY >= turtle.y &&
      frogY <= turtle.y + turtle.height
    ) {
      // Move frog with turtle
      frogX += turtle.speed * turtle.direction;
    }
  });

  // Check collision with alligators
  alligators.forEach((alligator) => {
    if (
      frogX >= alligator.x &&
      frogX <= alligator.x + alligator.width &&
      frogY >= alligator.y &&
      frogY <= alligator.y + alligator.height
    ) {
      lives--;
      resetFrog();
    }
  });

  // Check if frog reached home
  if (frogY < 0) {
    score += 100;
    level++;
    resetFrog();
    createObstacles();
  }
}

// Function to reset frog position
function resetFrog() {
  frogX = canvas.width / 2;
  frogY = canvas.height - 50;
}

// Game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw frog
  ctx.drawImage(frogImage, frogX, frogY, 30, 30);

  // Draw obstacles
  cars.forEach((car) => {
    ctx.drawImage(carImage, car.x, car.y, car.width, car.height);
  });
  logs.forEach((log) => {
    ctx.drawImage(logImage, log.x, log.y, log.width, log.height);
  });
  turtles.forEach((turtle) => {
    ctx.drawImage(turtleImage, turtle.x, turtle.y, turtle.width, turtle.height);
  });
  alligators.forEach((alligator) => {
    ctx.drawImage(alligatorImage, alligator.x, alligator.y, alligator.width, alligator.height);
  });

  // Move obstacles
  cars.forEach((car) => {
    car.x += car.speed * car.direction;
    // Wrap cars around the canvas
    if (car.x + car.width < 0) {
      car.x = canvas.width;
    } else if (car.x > canvas.width) {
      car.x = 0 - car.width;
    }
  });
  logs.forEach((log) => {
    log.x += log.speed * log.direction;
    // Wrap logs around the canvas
    if (log.x + log.width < 0) {
      log.x = canvas.width;
    } else if (log.x > canvas.width) {
      log.x = 0 - log.width;
    }
  });
  turtles.forEach((turtle) => {
    turtle.x += turtle.speed * turtle.direction;
    // Wrap turtles around the canvas
    if (turtle.x + turtle.width < 0) {
      turtle.x = canvas.width;
    } else if (turtle.x > canvas.width) {
      turtle.x = 0 - turtle.width;
    }
  });

  // Check for game over
  if (lives <= 0) {
    gameOver = true;
  }

  // Draw score and lives
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
  ctx.fillText(`Lives: ${lives}`, 10, 60);
  ctx.fillText(`Level: ${level}`, 10, 90);

  // Draw home
  ctx.drawImage(homeImage, canvas.width / 2 - 25, 0, 50, 50);

  // Game over screen
  if (gameOver) {
    ctx.font = '40px Arial';
    ctx.fillText('Game Over!', canvas.width / 2 - 100, canvas.height / 2);
  }

  // Request animation frame for next loop
  requestAnimationFrame(gameLoop);
}

// Start the game
createObstacles();
gameLoop();// Canvas and context setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let frogX = canvas.width / 2;
let frogY = canvas.height - 50;
let score = 0;
let lives = 3;
let level = 1;
let gameOver = false;

// Images
const frogImage = new Image();
frogImage.src = 'frog.png';
const carImage = new Image();
carImage.src = 'car.png';
const logImage = new Image();
logImage.src = 'log.png';
const turtleImage = new Image();
turtleImage.src = 'turtle.png';
const alligatorImage = new Image();
alligatorImage.src = 'alligator.png';
const homeImage = new Image();
homeImage.src = 'home.png';

// Obstacles (using arrays for each type)
let cars = [];
let logs = [];
let turtles = [];
let alligators = [];

// Create obstacles on load
function createObstacles() {
  // Cars
  for (let i = 0; i < 5; i++) {
    let car = {
      x: Math.random() * (canvas.width - 50),
      y: i * 50,
      width: 50,
      height: 30,
      direction: Math.random() < 0.5 ? -1 : 1, // Random direction
      speed: 1, // Adjust speed for difficulty
    };
    cars.push(car);
  }

  // Logs
  for (let i = 0; i < 3; i++) {
    let log = {
      x: Math.random() * (canvas.width - 50),
      y: canvas.height / 2 + i * 50,
      width: 50,
      height: 20,
      direction: Math.random() < 0.5 ? -1 : 1, // Random direction
      speed: 1, // Adjust speed for difficulty
    };
    logs.push(log);
  }

  // Turtles
  for (let i = 0; i < 2; i++) {
    let turtle = {
      x: Math.random() * (canvas.width - 50),
      y: canvas.height / 2 + i * 50 + 30, // Place turtles below logs
      width: 50,
      height: 20,
      direction: Math.random() < 0.5 ? -1 : 1, // Random direction
      speed: 0.5, // Adjust speed for difficulty
    };
    turtles.push(turtle);
  }

  // Alligators
  for (let i = 0; i < 3; i++) {
    let alligator = {
      x: Math.random() * (canvas.width - 50),
      y: canvas.height / 2 + i * 50 + 60, // Place alligators below turtles
      width: 50,
      height: 20,
      direction: 0, // Alligators don't move
    };
    alligators.push(alligator);
  }
}

// Event listeners for frog movement
document.addEventListener('keydown', function (e) {
  switch (e.key) {
    case 'ArrowUp':
      frogY -= 50;
      break;
    case 'ArrowDown':
      frogY += 50;
      break;
    case 'ArrowLeft':
      frogX -= 50;
      break;
    case 'ArrowRight':
      frogX += 50;
      break;
  }

  // Check for collision with obstacles
  checkCollision();
});

// Function to check collision
function checkCollision() {
  // Check collision with cars
  cars.forEach((car) => {
    if (
      frogX >= car.x &&
      frogX <= car.x + car.width &&
      frogY >= car.y &&
      frogY <= car.y + car.height
    ) {
      lives--;
      resetFrog();
    }
  });

  // Check collision with logs and turtles
  logs.forEach((log) => {
    if (
      frogX >= log.x &&
      frogX <= log.x + log.width &&
      frogY >= log.y &&
      frogY <= log.y + log.height
    ) {
      // Move frog with log
      frogX += log.speed * log.direction;
    }
  });
  turtles.forEach((turtle) => {
    if (
      frogX >= turtle.x &&
      frogX <= turtle.x + turtle.width &&
      frogY >= turtle.y &&
      frogY <= turtle.y + turtle.height
    ) {
      // Move frog with turtle
      frogX += turtle.speed * turtle.direction;
    }
  });

  // Check collision with alligators
  alligators.forEach((alligator) => {
    if (
      frogX >= alligator.x &&
      frogX <= alligator.x + alligator.width &&
      frogY >= alligator.y &&
      frogY <= alligator.y + alligator.height
    ) {
      lives--;
      resetFrog();
    }
  });

  // Check if frog reached home
  if (frogY < 0) {
    score += 100;
    level++;
    resetFrog();
    createObstacles();
  }
}

// Function to reset frog position
function resetFrog() {
  frogX = canvas.width / 2;
  frogY = canvas.height - 50;
}

// Game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw frog
  ctx.drawImage(frogImage, frogX, frogY, 30, 30);

  // Draw obstacles
  cars.forEach((car) => {
    ctx.drawImage(carImage, car.x, car.y, car.width, car.height);
  });
  logs.forEach((log) => {
    ctx.drawImage(logImage, log.x, log.y, log.width, log.height);
  });
  turtles.forEach((turtle) => {
    ctx.drawImage(turtleImage, turtle.x, turtle.y, turtle.width, turtle.height);
  });
  alligators.forEach((alligator) => {
    ctx.drawImage(alligatorImage, alligator.x, alligator.y, alligator.width, alligator.height);
  });

  // Move obstacles
  cars.forEach((car) => {
    car.x += car.speed * car.direction;
    // Wrap cars around the canvas
    if (car.x + car.width < 0) {
      car.x = canvas.width;
    } else if (car.x > canvas.width) {
      car.x = 0 - car.width;
    }
  });
  logs.forEach((log) => {
    log.x += log.speed * log.direction;
    // Wrap logs around the canvas
    if (log.x + log.width < 0) {
      log.x = canvas.width;
    } else if (log.x > canvas.width) {
      log.x = 0 - log.width;
    }
  });
  turtles.forEach((turtle) => {
    turtle.x += turtle.speed * turtle.direction;
    // Wrap turtles around the canvas
    if (turtle.x + turtle.width < 0) {
      turtle.x = canvas.width;
    } else if (turtle.x > canvas.width) {
      turtle.x = 0 - turtle.width;
    }
  });

  // Check for game over
  if (lives <= 0) {
    gameOver = true;
  }

  // Draw score and lives
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
  ctx.fillText(`Lives: ${lives}`, 10, 60);
  ctx.fillText(`Level: ${level}`, 10, 90);

  // Draw home
  ctx.drawImage(homeImage, canvas.width / 2 - 25, 0, 50, 50);

  // Game over screen
  if (gameOver) {
    ctx.font = '40px Arial';
    ctx.fillText('Game Over!', canvas.width / 2 - 100, canvas.height / 2);
  }

  // Request animation frame for next loop
  requestAnimationFrame(gameLoop);
}

// Start the game
createObstacles();
gameLoop();
