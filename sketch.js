
let player, obstacles = [], score = 0, gameOver = false;
let playerColorShift = 0, obstacleColorShift = 180;
let spawnRate = 90, speedMultiplier = 1, gradientShift = 0;
let restartButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(32);
  player = { x: width / 2, y: height - 60, size: 32 };
  restartButton = document.getElementById("restartButton");
}

function draw() {
  drawRainbowBackground();
  if (!gameOver) {
    movePlayer();
    updateObstacles();
    drawPlayer();
    drawScore();
    spawnRate = max(20, 90 - int(score / 300));
  } else {
    showGameOver();
  }
}

function drawRainbowBackground() {
  gradientShift += 0.01;
  for (let y = 0; y < height; y++) {
    stroke(color('hsb(' + (gradientShift * 50 + y / 5) % 360 + ',100%,50%)'));
    line(0, y, width, y);
  }
}

function drawPlayer() {
  playerColorShift = (playerColorShift + 1) % 360;
  fill(color('hsb(' + playerColorShift + ',100%,100%)'));
  stroke(255);
  strokeWeight(2);
  text("C50C", player.x, player.y);
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) player.x -= 7;
  if (keyIsDown(RIGHT_ARROW)) player.x += 7;
  player.x = constrain(player.x, 30, width - 30);
}

function updateObstacles() {
  if (frameCount % spawnRate === 0) {
    let size = random([16, 32, 48]);
    obstacles.push({
      x: random(30, width - 30),
      y: -40,
      size: size,
      colorShift: (obstacleColorShift + random(-30, 30)) % 360
    });
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    let o = obstacles[i];
    o.y += 4 * speedMultiplier;
    o.colorShift = (o.colorShift + 1) % 360;
    fill(color('hsb(' + o.colorShift + ',100%,100%)'));
    stroke(0);
    strokeWeight(2);
    text("d00r", o.x, o.y);

    if (collides(player, o)) {
      gameOver = true;
      noLoop();
      restartButton.style.display = "block";
    }

    if (o.y > height) {
      obstacles.splice(i, 1);
      score++;
    }
  }
}

function collides(p, o) {
  return abs(p.x - o.x) < (p.size + o.size) / 2 && abs(p.y - o.y) < 24;
}

function drawScore() {
  fill(255);
  noStroke();
  textSize(20);
  text(score + " meters", width / 2, 30);
}

function showGameOver() {
  fill(255);
  textSize(28);
  text("You touched the door after " + score + " meters", width / 2, height / 2 - 40);
}

function touchStarted() {
  if (touches.length > 0) {
    if (touches[0].x < width / 2) {
      player.x -= 50;
    } else {
      player.x += 50;
    }
  }
}
