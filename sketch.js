// version 1.5.3
let player;
let doors = [];
let score = 0;
let gameOver = false;
let version = "1.5.3";
let speed = 3;
let doorSpawnRate = 80;
let bgElements = [];
let frameColorShift = 0;
let carImg;

function preload() {
  carImg = loadImage("https://upload.wikimedia.org/wikipedia/commons/3/37/Go-kart_carting_frame.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  resetGame();
}

function resetGame() {
  player = new Player();
  doors = [];
  bgElements = [];
  score = 0;
  speed = 3;
  doorSpawnRate = 80;
  frameColorShift = 0;
  gameOver = false;
  loop();
}

function draw() {
  if (!gameOver) {
    drawBackground();
    handleGameplay();
  } else {
    drawGameOver();
  }
}

function drawBackground() {
  colorMode(HSB, 360, 100, 100);
  let intensity = min(100, score);
  background((frameColorShift + score) % 360, intensity, intensity);
  frameColorShift += 0.05;

  // Background elements every 100 meters
  let thresholds = [100, 200, 300, 400, 500];
  thresholds.forEach((thresh, i) => {
    if (score > thresh) {
      fill((frameCount + i * 30) % 360, 100, 100, 0.1);
      noStroke();
      for (let j = 0; j < 20; j++) {
        ellipse(
          random(width),
          random(height),
          random(20, 50),
          random(20, 50)
        );
      }
    }
  });
}

function handleGameplay() {
  score += 0.05;
  if (frameCount % floor(doorSpawnRate) === 0) {
    doors.push(new Door());
    if (doorSpawnRate > 20) doorSpawnRate -= 0.5;
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

  player.update();
  player.display();

  fill(0);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Miles: " + floor(score), 10, 10);
  text("v" + version, 10, 40);
}

function drawGameOver() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("You touched the door after " + floor(score) + " miles", width / 2, height / 2);
  textSize(24);
  text("Tap to restart", width / 2, height / 2 + 40);
  noLoop();
}

function touchStarted() {
  if (gameOver) {
    resetGame();
  } else {
    player.move();
  }
  return false;
}

class Player {
  constructor() {
    this.size = 50;
    this.x = width / 2;
    this.y = height - 100;
    this.col = color(0);
  }

  update() {
    let hueShift = (360 - frameColorShift) % 360;
    this.col = color(hueShift, 100, 100);
  }

  display() {
    fill(this.col);
    stroke(255);
    strokeWeight(2);
    imageMode(CENTER);
    image(carImg, this.x, this.y, this.size * 1.5, this.size);
  }

  move() {
    this.x = (this.x > width / 2) ? width / 2 - 100 : width / 2 + 100;
  }
}

class Door {
  constructor() {
    this.size = random(30, 100);
    this.x = random(width * 0.1, width * 0.9);
    this.y = -this.size;
    this.speed = speed + random(0, 3);
    this.hue = (frameCount * 2) % 360;
  }

  update() {
    this.y += this.speed;
  }

  display() {
    fill(this.hue, 100, 100);
    stroke(255);
    strokeWeight(2);
    rect(this.x, this.y, this.size, this.size);
  }

  hits(player) {
    return !(player.x + player.size / 2 < this.x ||
             player.x - player.size / 2 > this.x + this.size ||
             player.y + player.size / 2 < this.y ||
             player.y - player.size / 2 > this.y + this.size);
  }

  offscreen() {
    return this.y > height + this.size;
  }
}
