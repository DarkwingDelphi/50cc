
let player;
let doors = [];
let score = 0;
let gameOver = false;
let leftPressed = false;
let rightPressed = false;
let rampSpeed = 1;
let doorTimer = 0;
let lastSpawnTime = 0;
let restartBtn;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  player = new Player();
  restartBtn = document.getElementById('restartButton');
}

function draw() {
  if (gameOver) {
    drawGameOver();
    return;
  }

  drawGradientBackground();

  player.update();
  player.show();

  updateDoors();

  checkCollisions();

  score += 0.1 * rampSpeed;
  rampSpeed = 1 + score / 1000;

  drawScore();
}

function drawGradientBackground() {
  noFill();
  let intensity = constrain(score % 100, 0, 100) / 100;

  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let r = lerp(100, 255, inter * intensity);
    let g = lerp(100, 100 + 155 * sin(score / 50), inter * intensity);
    let b = lerp(100, 255 * cos(score / 60), inter * intensity);
    stroke(r, g, b);
    line(0, y, width, y);
  }
}

function drawScore() {
  fill(255);
  textSize(24);
  text(`${Math.floor(score)} meters`, width / 2, 30);
}

function updateDoors() {
  if (millis() - lastSpawnTime > max(500 - score / 5, 150)) {
    doors.push(new Door());
    lastSpawnTime = millis();
  }

  for (let i = doors.length - 1; i >= 0; i--) {
    doors[i].update();
    doors[i].show();
    if (doors[i].offscreen()) doors.splice(i, 1);
  }
}

function checkCollisions() {
  for (let door of doors) {
    if (player.hits(door)) {
      gameOver = true;
      restartBtn.style.display = 'block';
    }
  }
}

function drawGameOver() {
  background(0);
  fill(255);
  textSize(28);
  text(`You touched the door after\n${Math.floor(score)} meters`, width / 2, height / 3);
}

function restartGame() {
  gameOver = false;
  restartBtn.style.display = 'none';
  player = new Player();
  doors = [];
  score = 0;
  rampSpeed = 1;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) leftPressed = true;
  if (keyCode === RIGHT_ARROW) rightPressed = true;
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) leftPressed = false;
  if (keyCode === RIGHT_ARROW) rightPressed = false;
}

function touchStarted() {
  if (touches.length > 0) {
    if (touches[0].x < width / 2) leftPressed = true;
    else rightPressed = true;
  }
  return false;
}

function touchEnded() {
  leftPressed = false;
  rightPressed = false;
  return false;
}

class Player {
  constructor() {
    this.size = 40;
    this.x = width / 2;
    this.y = height - this.size * 2;
  }

  update() {
    if (leftPressed) this.x -= 10;
    if (rightPressed) this.x += 10;
    this.x = constrain(this.x, 0, width - this.size);
  }

  show() {
    let phase = (score / 50) % 1;
    let r = lerp(255, 0, phase);
    let g = lerp(255, 0, phase);
    let b = lerp(255, 0, phase);
    fill(r, g, b);
    stroke(255);
    strokeWeight(2);
    textSize(this.size);
    text("c50c", this.x + this.size / 2, this.y);
  }

  hits(door) {
    return collideRectRect(this.x, this.y, this.size, this.size, door.x, door.y, door.size, door.size);
  }
}

class Door {
  constructor() {
    this.size = random(20, 60);
    this.x = random(width - this.size);
    this.y = -this.size;
    this.speed = random(3, 6) * rampSpeed;
    this.colorShift = random(100);
  }

  update() {
    this.y += this.speed;
  }

  show() {
    let phase = (score / 50 + this.colorShift) % 1;
    let r = lerp(0, 255, phase);
    let g = lerp(0, 255, 1 - phase);
    let b = lerp(255, 0, phase);
    fill(r, g, b);
    stroke(255);
    strokeWeight(2);
    textSize(this.size);
    text("d00r", this.x + this.size / 2, this.y);
  }

  offscreen() {
    return this.y > height;
  }
}
