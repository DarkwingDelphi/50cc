let player;
let playerSizeFactor = 0.5;
let obstacles = [];
let score = 0;
let baseSpeed = 2;
let playerY;
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  textAlign(CENTER, CENTER);
  textSize(32);
  player = width / 2;
  playerY = height - 160;

  document.getElementById("left").addEventListener("touchstart", () => movePlayer(-1));
  document.getElementById("right").addEventListener("touchstart", () => movePlayer(1));
}

function draw() {
  let distance = score;
  let rampFactor = distance / 1500; // every 1500m = 100% increase
  let currentSpeed = baseSpeed * (1 + rampFactor);
  let currentHue = (frameCount * 0.5) % 360;
  let saturation = constrain(rampFactor * 100, 0, 100);
  let brightness = constrain(30 + rampFactor * 70, 0, 100);
  let colorOn = rampFactor > 0.1;

  // Rainbow gradient background
  for (let y = 0; y < height; y++) {
    let hue = (currentHue + y / 5) % 360;
    stroke(colorOn ? hue : 0, colorOn ? saturation : 0, colorOn ? brightness : y / height * 100);
    line(0, y, width, y);
  }

  if (!gameOver) {
    score += 0.2;
    textSize(24);
    fill(0, 0, 100);
    text(`Meters: ${floor(score)}`, width / 2, 30);

    // Player
    let playerFill = colorOn ? color(currentHue, 100, 100) : color(0, 0, 60);
    fill(playerFill);
    textSize(48 * playerSizeFactor);
    text("c50c", player, playerY);

    // Obstacle spawn frequency increases too
    let spawnRate = max(15, 90 - floor(rampFactor * 30));
    if (frameCount % floor(spawnRate) === 0) {
      let sizeFactor = random([0.5, 1.0, 1.5]);
      let obsWidth = textWidth("d00r") * sizeFactor;
      let minSpace = textWidth("c50c") * playerSizeFactor + 10;
      let validX;
      let attempts = 10;

      while (!validX && attempts-- > 0) {
        let x = random(obsWidth / 2, width - obsWidth / 2);
        if (abs(x - player) > minSpace) validX = x;
      }

      if (validX) {
        obstacles.push({
          x: validX,
          y: -60,
          sizeFactor,
          trailColors: Array.from({length: int(random(3, 5))}, () =>
            colorOn ? color(random(360), 80, 80, 50) : color(0, 0, 60, 30)
          )
        });
      }
    }

    // Draw & update obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
      let o = obstacles[i];
      let size = 48 * o.sizeFactor;
      textSize(size);

      // Trails
      for (let t = 0; t < o.trailColors.length; t++) {
        fill(o.trailColors[t]);
        text("d00r", o.x, o.y - t * 10);
      }

      // Main
      fill(colorOn ? 0 : 0, 0, 100);
      text("d00r", o.x, o.y);
      o.y += currentSpeed;

      // Hit detection
      let pW = textWidth("c50c") * playerSizeFactor;
      let oW = textWidth("d00r") * o.sizeFactor;
      if (
        abs(o.x - player) < (oW + pW) / 2 &&
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
    textSize(32);
    text(`YOU TOUCHED THE DOOR`, width / 2, height / 2 - 40);
    textSize(24);
    text(`Distance: ${floor(score)} meters`, width / 2, height / 2);
    text(`Tap to restart`, width / 2, height / 2 + 40);
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
    gameOver = false;
  }
  return false;
}
