let player;
let score = 0;
let version = "v1.4.2";
let startTime;
let hearts = [];
let rainbowColors;
let bgTimer = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = createVector(width / 2, height - 50);
  startTime = millis();
  rainbowColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
}

function draw() {
  // Procedural background
  bgTimer++;
  background(0);
  drawRainbowTrails();
  if (score >= 1000) drawHearts();

  // Score logic
  let elapsed = millis() - startTime;
  score = floor(elapsed / 200); // Increases gradually
  fill(255);
  textSize(16);
  text(version, 5, 15);
  text("Score: " + score + " miles", 5, 35);

  // Player
  fill(255);
  rectMode(CENTER);
  rect(player.x, player.y, 30, 30);
}

function touchMoved() {
  // Smooth player movement
  player.x = lerp(player.x, mouseX, 0.25);
  return false;
}

function drawRainbowTrails() {
  for (let i = 0; i < height; i += 40) {
    stroke(rainbowColors[(frameCount + i / 40) % rainbowColors.length]);
    line(0, i + sin((frameCount + i) * 0.05) * 20, width, i + sin((frameCount + i + 50) * 0.05) * 20);
  }
}

function drawHearts() {
  for (let i = 0; i < 10; i++) {
    fill(255, 0, 100, 100);
    text("♥", random(width), random(height));
  }
}
