let player;
let doors = [];
let score = 0;
let gameState = "PLAY";
let bgColor;
let lastColorChange = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();
  bgColor = color(0);
  for (let i = 0; i < 5; i++) {
    doors.push(new Door(random(width), -i * 150));
  }
}

function draw() {
  background(bgColor);
  if (gameState === "PLAY") {
    drawGame();
  } else if (gameState === "END") {
    drawGameOver();
  }
}

function drawGame() {
  score += 0.1;
  fill(255);
  textSize(16);
  textAlign(LEFT);
  text("Score: " + int(score) + " miles", 10, 20);

  player.update();
  player.show();

  if (frameCount % 30 === 0) {
    doors.push(new Door(random(width), 0));
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

  updateBackgroundColor();
}

function updateBackgroundColor() {
  if (score - lastColorChange >= 10) {
    bgColor = color(random(255), random(255), random(255));
    lastColorChange = score;
  }
}

function drawGameOver() {
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
}

function touchMoved() {
  player.setX(mouseX);
  return false;
}

class Player {
  constructor() {
    this.size = 20;
    this.x = width / 2;
    this.y = height - this.size * 2;
  }

  update() {}

  setX(val) {
    this.x = constrain(val, 0, width - this.size);
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.size, this.size);
  }
}

class Door {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.size = 20;
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(this.color);
    textSize(16);
    textAlign(CENTER);
    text("d00r", this.x, this.y);
  }

  offscreen() {
    return this.y > height + 20;
  }

  hits(player) {
    return (
      this.y + this.size > player.y &&
      this.y < player.y + player.size &&
      this.x > player.x &&
      this.x < player.x + player.size
    );
  }
}
