let player;
let doors = [];
let score = 0;
let gameOver = false;
let gradientSpeed = 0;
let lastSpawnTime = 0;
let spawnInterval = 1000;
let colors = [];
let bgStage = 0;
let playerColorShift = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  player = new Player();
  score = 0;
  doors = [];
  gameOver = false;
}

function draw() {
  if (gameOver) {
    background(0);
    fill(255);
    textSize(32);
    text("You touched the door after " + Math.floor(score / 10) + " miles", width / 2, height / 2);
    return;
  }

  drawBackground();

  if (millis() - lastSpawnTime > spawnInterval) {
    doors.push(new Door());
    lastSpawnTime = millis();
    if (spawnInterval > 200) {
      spawnInterval -= 5;
    }
  }

  player.update();
  player.display();

  for (let i = doors.length - 1; i >= 0; i--) {
    doors[i].update();
    doors[i].display();

    if (player.hits(doors[i])) {
      gameOver = true;
    }

    if (doors[i].offscreen()) {
      doors.splice(i, 1);
    }
  }

  score++;
  gradientSpeed = constrain(score / 1000, 0, 2);

  fill(255);
  textSize(24);
  text(Math.floor(score / 10) + " m", width / 2, 30);
}

function touchStarted() {
  if (touches.length > 0) {
    if (touches[0].x < width / 2) {
      player.move(-1);
    } else {
      player.move(1);
    }
  }
  return false;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    player.move(-1);
  } else if (keyCode === RIGHT_ARROW) {
    player.move(1);
  }
}

function drawBackground() {
  let from = color(0);
  let to = color(255 * sin(frameCount * 0.01), 255 * sin(frameCount * 0.015), 255 * sin(frameCount * 0.02));
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(from, to, inter * gradientSpeed);
    stroke(c);
    line(0, y, width, y);
  }

  let meter = Math.floor(score / 100);
  if (meter > bgStage) {
    bgStage = meter;
    if (bgStage === 10) {
      colors.push(color(255, 0, 0));
    } else if (bgStage === 20) {
      colors.push(color(255, 0, 255));
    } else if (bgStage === 30) {
      colors.push(color(0, 255, 255));
    }
  }

  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    noStroke();
    ellipse(random(width), random(height), 10, 10);
  }
}

class Player {
  constructor() {
    this.size = 40;
    this.x = width / 2;
    this.y = height - 80;
  }

  update() {
    playerColorShift += 0.02;
  }

  display() {
    fill(255 * abs(sin(playerColorShift)), 255 * abs(cos(playerColorShift)), 255 * abs(sin(playerColorShift + 1)));
    stroke(255);
    strokeWeight(2);
    textSize(this.size);
    text("c50c", this.x, this.y);
  }

  move(dir) {
    this.x += dir * 50;
    this.x = constrain(this.x, 0, width);
  }

  hits(other) {
    return dist(this.x, this.y, other.x, other.y) < 30;
  }
}

class Door {
  constructor() {
    this.size = random([20, 60]);
    this.x = random(width);
    this.y = 0;
    this.speed = map(score, 0, 3000, 2, 10);
    this.colorShift = random(TWO_PI);
  }

  update() {
    this.y += this.speed;
  }

  display() {
    fill(255 * abs(cos(this.colorShift + frameCount * 0.05)), 255 * abs(sin(this.colorShift)), 255 * abs(sin(this.colorShift + 2)));
    stroke(255);
    strokeWeight(2);
    textSize(this.size);
    text("d00r", this.x, this.y);
  }

  offscreen() {
    return this.y > height + 50;
  }
}
