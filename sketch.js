let player;
let obstacles = [];
let score = 0;
let bgHue = 0;
let gameOver = false;
let speed = 2;
let spawnRate = 90;
let playerY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  textAlign(CENTER, CENTER);
  textSize(32);
  player = width / 2;
  playerY = height - 160; // Moved up so not behind controls

  document.getElementById("left").addEventListener("touchstart", () => movePlayer(-1));
  document.getElementById("right").addEventListener("touchstart", () => movePlayer(1));
}

function draw() {
  let saturation = constrain(score, 0, 100);
  let brightness = constrain(score, 30, 100);
  for (let y = 0; y < height; y++) {
    stroke((bgHue + y / 5) % 360, saturation, brightness);
    line(0, y, width, y);
  }
  bgHue = (bgHue + 0.5) % 360;

  if (!gameOver) {
    score += 0.1;
    textSize(24);
    fill(0, 0, 100);
    text(`Meters: ${floor(score)}`, width / 2, 30);

    // Player
    fill(0, 0, 100);
    textSize(48);
    text("c50c", player, playerY);

    // Difficulty
    if (frameCount % 200 === 0) {
      speed += 0.2;
      spawnRate = max(20, spawnRate - 3);
    }

    // Spawn
    if (frameCount % spawnRate === 0) {
      obstacles.push({
        x: random(50, width - 50),
        y: -60,
        sizeFactor: random([0.5, 1.0, 1.5]),
        trailColors: Array.from({length: int(random(3, 6))}, () => color(random(360), 80, 80, 50))
      });
    }

    // Obstacle loop
    for (let i = obstacles.length - 1; i >= 0; i--) {
      let o = obstacles[i];
      let size = 48 * o.sizeFactor;
      textSize(size);

      // Trail
      for (let t = 0; t < o.trailColors.length; t++) {
        fill(o.trailColors[t]);
        text("d00r", o.x, o.y - t * 10);
      }

      // Main
      fill(0, 0, 100);
      text("d00r", o.x, o.y);
      o.y += speed;

      // Improved bounding box collision
      let playerW = textWidth("c50c");
      let obstacleW = textWidth("d00r") * o.sizeFactor;
      if (
        abs(o.x - player) < (obstacleW + playerW) / 2 &&
        abs(o.y - playerY) < size / 2
      ) {
        gameOver = true;
      }

      if (o.y > height + 60) {
        obstacles.splice(i, 1);
      }
    }
  } else {
    fill(0, 0, 100);
    textSize(36);
    text(`You touched the door after ${floor(score)} meters`, width / 2, height / 2);
    textSize(24);
    text("Tap to restart", width / 2, height / 2 + 40);
  }
}

function movePlayer(dir) {
  if (!gameOver) {
    player += dir * 30;
    player = constrain(player, 40, width - 40);
  }
}

function touchStarted() {
  if (gameOver) {
    score = 0;
    obstacles = [];
    player = width / 2;
    speed = 2;
    spawnRate = 90;
    gameOver = false;
  }
  return false;
}
