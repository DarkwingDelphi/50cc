
let player;
let doors = [];
let score = 0;
let gameState = "START";
let backgroundStage = 0;
let bgColor;
let lastBgChange = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();
  resetGame();
}

function resetGame() {
  doors = [];
  score = 0;
  backgroundStage = 0;
  bgColor = color(0);
  lastBgChange = 0;
  player.reset();
  gameState = "PLAY";
}

function draw() {
  if (gameState === "START") {
    background(0);
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("Don't Touch the Door", width / 2, height / 2);
    textSize(16);
    text("Tap to start", width / 2, height / 2 + 30);
  } else if (gameState === "PLAY") {
    drawGame();
  } else if (gameState === "END") {
    background(0);
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
    textSize(16);
    text("Tap to restart", width / 2, height / 2 + 30);
  }
}

function drawGame() {
  background(bgColor);
  score += 0.1;

  if (score - lastBgChange >= 100) {
    backgroundStage++;
    bgColor = color(random(255), random(255), random(255));
    lastBgChange = score;
  }

  fill(255);
  textSize(14);
  textAlign(LEFT);
  text("Score: " + int(score) + " miles", 10, 20);

  player.update();
  player.show();

  if (frameCount % 60 === 0) {
    doors.push(new Door());
  }

  for (let i = doors.length - 1; i >= 0; i--) {
    doors[i].update();
    doors[i].show();

    if (doors[i].hits(player)) {
      gameState = "END";
    }

    if (doors[i].offscreen()) {
      doors.splice(i, 1);
    }
  }
}

function touchStarted() {
  if (gameState === "START" || gameState === "END") {
    resetGame();
  } else {
    player.jump();
  }
}

class Player {
  constructor() {
    this.size = 40;
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height - this.size * 2;
    this.vy = 0;
    this.gravity = 1.2;
    this.lift = -20;
  }

  jump() {
    this.vy += this.lift;
  }

  update() {
    this.vy += this.gravity;
    this.y += this.vy;

    if (this.y > height - this.size) {
      this.y = height - this.size;
      this.vy = 0;
    }
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.size, this.size);
  }
}

class Door {
  constructor() {
    this.x = random(width);
    this.y = -20;
    this.size = 30;
    this.speed = 4;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(random(255), random(255), random(255));
    textSize(16);
    textAlign(CENTER);
    text("d00r", this.x, this.y);
  }

  hits(player) {
    return collideRectCircle(player.x, player.y, player.size, player.size, this.x, this.y, this.size);
  }

  offscreen() {
    return this.y > height;
  }
}
