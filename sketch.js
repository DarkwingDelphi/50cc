
let player;
let doors = [];
let doorTimer = 0;
let score = 0;
let gameOver = false;
let leftPressed = false;
let rightPressed = false;
let speedFactor = 1;
let backgroundElements = [];
let version = "v1.1.0";

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();
  textSize(32);
  textAlign(CENTER, CENTER);
}

function draw() {
  if (!gameOver) {
    updateGame();
  } else {
    showGameOver();
  }
}

function updateGame() {
  drawBackground();
  player.update();
  player.display();

  if (millis() > doorTimer) {
    doors.push(new Door());
    doorTimer = millis() + max(500 - score / 2, 100);
  }

  for (let i = doors.length - 1; i >= 0; i--) {
    doors[i].update();
    doors[i].display();
    if (doors[i].hits(player)) {
      gameOver = true;
    }
    if (doors[i].offscreen()) {
      doors.splice(i, 1);
      score += 1;
    }
  }

  fill(255);
  textSize(24);
  text(`${int(score)} miles`, width / 2, 30);

  speedFactor = 1 + score / 1000;
}

function showGameOver() {
  background(0);
  fill(255);
  textSize(32);
  text(`You touched the door after ${int(score)} miles`, width / 2, height / 2);
  textSize(24);
  text("Tap to restart", width / 2, height / 2 + 40);
}

function touchStarted() {
  if (gameOver) {
    resetGame();
  } else {
    if (touches.length) {
      if (touches[0].x < width / 2) {
        leftPressed = true;
      } else {
        rightPressed = true;
      }
    }
  }
}

function touchEnded() {
  leftPressed = false;
  rightPressed = false;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) leftPressed = true;
  if (keyCode === RIGHT_ARROW) rightPressed = true;
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) leftPressed = false;
  if (keyCode === RIGHT_ARROW) rightPressed = false;
}

function resetGame() {
  score = 0;
  doors = [];
  gameOver = false;
  player = new Player();
}

function drawBackground() {
  background(0);
  let intensity = min(score % 100 / 100, 1);
  let colorVal = lerpColor(color(50), color(255, 0, 255), intensity);
  fill(colorVal);
  rect(0, 0, width, height / 10);
}

class Player {
  constructor() {
    this.size = 40;
    this.x = width / 2;
    this.y = height - this.size * 2;
  }

  update() {
    if (leftPressed) this.x -= 8;
    if (rightPressed) this.x += 8;
    this.x = constrain(this.x, 0, width - this.size);
  }

  display() {
    fill(255);
    textSize(this.size);
    text("C50C", this.x, this.y);
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      w: textWidth("C50C"),
      h: this.size
    };
  }
}

class Door {
  constructor() {
    this.size = random(24, 64);
    this.x = random(width - this.size);
    this.y = -this.size;
    this.speed = random(2, 4) * speedFactor;
  }

  update() {
    this.y += this.speed;
  }

  display() {
    fill(255, 100, 100);
    textSize(this.size);
    text("D00R", this.x, this.y);
  }

  offscreen() {
    return this.y > height + this.size;
  }

  hits(player) {
    let a = this.getBounds();
    let b = player.getBounds();
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );
  }

  getBounds() {
    return {
      x: this.x,
      y: this.y,
      w: textWidth("D00R"),
      h: this.size
    };
  }
}
