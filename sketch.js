
let carX;
let carY;
let speed = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  carX = width / 2;
  carY = height - 100;
  textSize(24);
  textAlign(CENTER);
  noStroke();
}

function draw() {
  drawGradientBackground();
  fill('lime');
  text("C50C", carX, carY);
}

function drawGradientBackground() {
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color('#FF5F6D'), color('#FFC371'), inter);
    stroke(c);
    line(0, i, width, i);
  }
}

function moveLeft() {
  carX -= 20;
}

function moveRight() {
  carX += 20;
}
