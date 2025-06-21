
let car;
let carImg;
let obstacles = [];
let score = 0;
let bgOffset = 0;

function preload() {
  carImg = loadImage('https://darkwingdelphi.github.io/50cc/c50c.png'); // C50C sprite
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  car = createVector(width / 2, height - 100);
  textSize(24);
}

function draw() {
  drawRainbowBackground();
  drawScore();
  moveCar();
  displayCar();
  handleObstacles();
  updateScore();
}

function drawRainbowBackground() {
  for (let y = 0; y < height; y++) {
    let hue = (y * 0.5 + bgOffset) % 360;
    stroke(color(`hsl(${hue}, 100%, 70%)`));
    line(0, y, width, y);
  }
  bgOffset += 0.5;
}

function drawScore() {
  fill(0);
  text("Score: " + score, 10, 30);
}

function moveCar() {
  if (keyIsDown(LEFT_ARROW)) car.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) car.x += 5;
  car.x = constrain(car.x, 0, width - 50);
}

function displayCar() {
  image(carImg, car.x, car.y, 50, 100);
}

function handleObstacles() {
  if (frameCount % 60 === 0) {
    let x = random(0, width - 50);
    obstacles.push(createVector(x, -50));
  }

  for (let obs of obstacles) {
    obs.y += 6;
    fill(0);
    rect(obs.x, obs.y, 50, 50);
    if (collides(car, obs)) {
      noLoop();
      fill(255, 0, 0);
      text("Game Over", width / 2 - 60, height / 2);
    }
  }

  obstacles = obstacles.filter(obs => obs.y < height);
}

function collides(a, b) {
  return !(a.x + 50 < b.x || a.x > b.x + 50 || a.y + 100 < b.y || a.y > b.y + 50);
}

function updateScore() {
  score += 1;
}
