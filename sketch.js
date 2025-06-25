
// 50cc v1.5.4

let player;
let doors = [];
let score = 0;
let gameOver = false;
let version = "v1.5.4";
let bgElements = [];
let carImage;
let doorGhosts = [];

function preload() {
  carImage = loadImage('https://darkwingdelphi.github.io/50cc/assets/c50c.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();
}

function draw() {
  background(0);

  if (!gameOver) {
    score += deltaTime / 100;

    updateBackground();
    for (let e of bgElements) {
      e.display();
    }

    player.update();
    player.display();

    if (frameCount % 60 === 0) {
      doors.push(new Door());
    }

    for (let i = doors.length - 1; i >= 0; i--) {
      doors[i].update();
      doors[i].display();

      if (doors[i].hits(player)) {
        gameOver = true;
      }

      if (doors[i].offscreen()) {
        doors.splice(i, 1);
      }
    }

    fill(255);
    textSize(24);
    text(`Miles: ${nf(score, 1, 1)}`, 20, 30);
    text(version, 20, 60);
  } else {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(`You touched the door after ${nf(score, 1, 1)} miles`, width / 2, height / 2);
  }
}

function updateBackground() {
  if (floor(score) % 100 === 0 && !bgElements.some(e => e.milestone === floor(score))) {
    bgElements.push(new BackgroundElement(floor(score)));
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.move(-1);
  } else if (keyCode === RIGHT_ARROW) {
    player.move(1);
  } else if (gameOver) {
    resetGame();
  }
}

function resetGame() {
  gameOver = false;
  score = 0;
  player = new Player();
  doors = [];
  bgElements = [];
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 100;
    this.w = 60;
    this.h = 60;
    this.speed = 10;
    this.targetX = this.x;
  }

  move(dir) {
    this.targetX += dir * 100;
  }

  update() {
    this.x = lerp(this.x, this.targetX, 0.1);
  }

  display() {
    imageMode(CENTER);
    image(carImage, this.x, this.y, this.w, this.h);
    noFill();
    stroke(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
}

class Door {
  constructor() {
    this.x = random(50, width - 50);
    this.y = -60;
    this.w = random(30, 80);
    this.h = random(60, 120);
    this.speed = random(3, 6);
  }

  update() {
    this.y += this.speed;
  }

  display() {
    fill(200, 0, 0, 200);
    rect(this.x, this.y, this.w, this.h);
  }

  hits(p) {
    return !(p.x + p.w / 2 < this.x - this.w / 2 ||
             p.x - p.w / 2 > this.x + this.w / 2 ||
             p.y + p.h / 2 < this.y - this.h / 2 ||
             p.y - p.h / 2 > this.y + this.h / 2);
  }

  offscreen() {
    return this.y > height + this.h;
  }
}

class BackgroundElement {
  constructor(milestone) {
    this.milestone = milestone;
    this.x = random(width);
    this.y = random(height);
    this.r = 0;
    this.opacity = 0;
  }

  display() {
    this.r += 0.5;
    this.opacity = min(255, this.opacity + 1);
    noFill();
    stroke(100, 100, 255, this.opacity);
    ellipse(this.x, this.y, this.r);
  }
}
