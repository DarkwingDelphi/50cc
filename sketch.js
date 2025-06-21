
let car;
let carSize = 40;
let carY;
let obstacles = [];
let gameOver = false;
let distance = 0;
let leftPressed = false;
let rightPressed = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  car = width / 2;
  carY = height - 60;
}

function draw() {
  if (gameOver) {
    background(255, 0, 0);
    fill(0, 0, 139);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("CRASH! You made it " + distance + " meters", width / 2, height / 2);
    return;
  }

  setGradient(0, 0, width, height, color(255, 0, 255), color(0, 255, 255));

  drawCar(car, carY);
  moveCar();
  handleObstacles();
  drawUI();
}

function drawCar(x, y) {
  fill(0);
  rect(x - 20, y - 20, 40, 40); // body
  fill(255);
  rect(x - 25, y - 20, 5, 20); // left door
  rect(x + 20, y - 20, 5, 20); // right door
}

function moveCar() {
  if (leftPressed) car -= 5;
  if (rightPressed) car += 5;
  car = constrain(car, 0 + carSize / 2, width - carSize / 2);
}

function handleObstacles() {
  if (frameCount % 60 === 0) {
    obstacles.push({ x: random(width), y: -20 });
    distance++;
  }
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 6;
    fill(0);
    rect(obstacles[i].x, obstacles[i].y, 20, 20);
    if (
      abs(obstacles[i].x - car) < 30 &&
      abs(obstacles[i].y - carY) < 30
    ) {
      gameOver = true;
    }
  }
}

function drawUI() {
  fill(0);
  textSize(16);
  text("[<<<]", 10, height - 10);
  text("[>>>]", width - 60, height - 10);
}

function mousePressed() {
  if (mouseY > height - 40) {
    if (mouseX < width / 2) leftPressed = true;
    else rightPressed = true;
  }
}

function mouseReleased() {
  leftPressed = false;
  rightPressed = false;
}

function setGradient(x, y, w, h, c1, c2) {
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}
