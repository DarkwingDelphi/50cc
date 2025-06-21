let carX;
let carY;
let carSize = 40;
let speed = 5;
let obstacles = [];
let score = 0;
let fontSize = 32;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(fontSize);
  carX = width / 2;
  carY = height - 60;
}

function draw() {
  drawRainbowBackground();

  fill(0);
  text("C50C", carX, carY);

  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 10);

  if (frameCount % 60 === 0) {
    let ox = random(40, width - 40);
    obstacles.push({ x: ox, y: 0 });
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obs = obstacles[i];
    fill(0);
    text("DOOR", obs.x, obs.y);
    obs.y += 4;

    if (dist(obs.x, obs.y, carX, carY) < 30) {
      noLoop(); // Game over
    }

    if (obs.y > height) {
      score++;
      obstacles.splice(i, 1);
    }
  }
}

function drawRainbowBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color('#ff00ff'), color('#00ffff'), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    carX -= speed * 10;
  } else if (keyCode === RIGHT_ARROW) {
    carX += speed * 10;
  }
}

function touchStarted() {
  if (touches.length > 0) {
    if (touches[0].x < width / 2) {
      carX -= speed * 2;
    } else {
      carX += speed * 2;
    }
  }
}
