
let player;
let obstacles = [];
let score = 0;
let gameOver = false;
let gameStarted = false;
let leftPressed = false;
let rightPressed = false;
let bgColorIntensity = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  player = new Player();
}

function draw() {
  if (!gameStarted) {
    background(0);
    fill(255);
    textSize(32);
    text("Don't Touch the Door", width / 2, height / 2 - 20);
    textSize(20);
    text("Tap to Start", width / 2, height / 2 + 20);
    return;
  }

  if (gameOver) {
    background(0);
    fill(255);
    textSize(32);
    text("You touched the door after " + floor(score) + " miles", width / 2, height / 2);
    textSize(20);
    text("Tap to Restart", width / 2, height / 2 + 40);
    return;
  }

  bgColorIntensity = min(255, score * 0.1);
  background(bgColorIntensity, bgColorIntensity * 0.8, bgColorIntensity * 0.6);

  player.update();
  player.show();

  if (frameCount % max(20 - floor(score / 100), 5) === 0) {
    obstacles.push(new Obstacle());
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();
    if (obstacles[i].hits(player)) {
      gameOver = true;
    }
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score += 1;
    }
  }

  fill(255);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Score: " + floor(score) + " miles", 10, 10);
}

function touchStarted() {
  if (!gameStarted) {
    gameStarted = true;
    return;
  }
  if (gameOver) {
    resetGame();
    return;
  }
  if (mouseX < width / 2) {
    player.move(-1);
  } else {
    player.move(1);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.move(-1);
  } else if (keyCode === RIGHT_ARROW) {
    player.move(1);
  }
}

function resetGame() {
  score = 0;
  obstacles = [];
  player = new Player();
  gameOver = false;
}

class Player {
  constructor() {
    this.size = 40;
    this.x = width / 2;
    this.y = height - this.size * 1.5;
  }

  update() {}

  move(dir) {
    this.x += dir * this.size * 1.5;
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
  }

  show() {
    fill(255 - bgColorIntensity, 255 - bgColorIntensity, 255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("c50c", this.x, this.y);
  }
}

class Obstacle {
  constructor() {
    this.size = random(20, 60);
    this.x = random(this.size / 2, width - this.size / 2);
    this.y = -this.size;
    this.speed = 2 + score * 0.01;
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(this.color);
    textSize(this.size / 2);
    text("d00r", this.x, this.y);
  }

  offscreen() {
    return this.y > height + this.size;
  }

  hits(player) {
    return dist(this.x, this.y, player.x, player.y) < (this.size + player.size) / 2;
  }
}
