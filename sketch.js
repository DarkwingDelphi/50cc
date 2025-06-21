let carX;
let carY;
let speed = 2;
let distance = 0;
let doors = [];
let gameOver = false;
let showCrashText = false;
let restartButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  carX = width / 2;
  carY = height - 60;
  restartButton = createButton("RESTART");
  restartButton.position(width / 2 - 50, height / 2 + 40);
  restartButton.mousePressed(restartGame);
  restartButton.hide();
}

function draw() {
  if (gameOver) {
    background(0);
    fill(255);
    textSize(40);
    text("You touched the door!
You went " + distance + " meters", width / 2, height / 2);
    restartButton.show();
    return;
  }

  setGradient(0, 0, width, height, color(255, 0, 255), color(0, 255, 255));
  fill(255);
  textSize(32);
  text("c50c", carX, carY);

  updateDoors();
  drawDoors();

  for (let d of doors) {
    if (abs(d.x - carX) < 40 && abs(d.y - carY) < 40) {
      gameOver = true;
    }
  }

  distance += Math.floor(speed / 2);
  speed += 0.001;
  textSize(20);
  text("Distance: " + distance + " meters", width / 2, 30);
}

function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, sin(millis() / 1000 + i / 100));
    stroke(c);
    line(x, i, x + w, i);
  }
}

function updateDoors() {
  if (frameCount % Math.floor(60 / min(speed, 6)) === 0) {
    doors.push({
      x: random(50, width - 50),
      y: -20,
      dx: random(-1, 1),
      dy: speed + random(0.5, 2)
    });
  }

  for (let d of doors) {
    d.x += d.dx;
    d.y += d.dy;
  }

  doors = doors.filter(d => d.y < height + 40);
}

function drawDoors() {
  fill(255);
  textSize(32);
  for (let d of doors) {
    text("d00r", d.x, d.y);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) carX -= 20;
  if (keyCode === RIGHT_ARROW) carX += 20;
}

function restartGame() {
  gameOver = false;
  distance = 0;
  speed = 2;
  carX = width / 2;
  doors = [];
  restartButton.hide();
}

function touchStarted() {
  if (touches.length > 0) {
    if (touches[0].x < width / 2) carX -= 20;
    else carX += 20;
  }
}
