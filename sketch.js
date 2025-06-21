let carX;
let carY;
let carSize = 40;
let speed = 5;
let obstacles = [];
let score = 0;
let gameState = 'title';
let fontSize = 32;
let buttonSize = 100;
let colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];
let music;
let touchZone = '';

function preload() {
  soundFormats('mp3', 'ogg');
  music = loadSound('https://upload.wikimedia.org/wikipedia/commons/4/4f/Spacesynth_theme.ogg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(fontSize);
  carX = width / 2;
  carY = height - 60;
}

function draw() {
  drawRainbowBackground();

  if (gameState === 'title') {
    fill(0);
    textSize(40);
    text("Don't Touch the Door", width / 2, height / 2 - 40);
    textSize(20);
    text("Tap to Start", width / 2, height / 2 + 20);
    return;
  }

  if (gameState === 'gameover') {
    fill(0);
    textSize(30);
    text("You touched the door after " + score + " meters", width / 2, height / 2 - 20);
    text("Tap to Restart", width / 2, height / 2 + 30);
    return;
  }

  fill(0);
  textSize(fontSize);
  text("C50C", carX, carY);

  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Meters: " + score, 10, 10);

  if (frameCount % 30 === 0) {
    let ox = random(40, width - 40);
    obstacles.push({ x: ox, y: 0, steps: int(random(3, 7)) });
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obs = obstacles[i];
    for (let j = 0; j < obs.steps; j++) {
      fill(color(colors[j % colors.length]));
      text("D00R", obs.x + j * 2, obs.y + j * 2);
    }
    obs.y += 4 + score * 0.02;

    if (dist(obs.x, obs.y, carX, carY) < 30) {
      gameState = 'gameover';
      noLoop();
    }

    if (obs.y > height) {
      score++;
      obstacles.splice(i, 1);
    }
  }

  drawButtons();
}

function drawRainbowBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color('#ff00ff'), color('#00ffff'), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawButtons() {
  fill(255, 200);
  noStroke();
  rect(0, height - buttonSize, buttonSize, buttonSize);
  rect(width - buttonSize, height - buttonSize, buttonSize, buttonSize);

  fill(0);
  text("←", buttonSize / 2, height - buttonSize / 2);
  text("→", width - buttonSize / 2, height - buttonSize / 2);
}

function touchStarted() {
  if (gameState === 'title') {
    gameState = 'playing';
    score = 0;
    carX = width / 2;
    obstacles = [];
    loop();
    if (music && !music.isPlaying()) {
      music.loop();
    }
    return;
  }

  if (gameState === 'gameover') {
    gameState = 'title';
    loop();
    return;
  }

  if (touches.length > 0) {
    if (touches[0].x < width / 2) {
      carX -= speed * 5;
    } else {
      carX += speed * 5;
    }
  }
  return false;
}
