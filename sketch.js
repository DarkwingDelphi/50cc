
let kart;
let doors = [];
let score = 0;
let speed = 2;
let gameOver = false;
let leftPressed = false;
let rightPressed = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  kart = width / 2;
}

function draw() {
  if (gameOver) {
    background(255, 0, 0);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("CRASH! You made it " + score + " meters", width / 2, height / 2);
    return;
  }

  // Rainbow background gradient
  for (let y = 0; y < height; y++) {
    stroke(lerpColor(color("#ff0000"), color("#0000ff"), y / height));
    line(0, y, width, y);
  }

  // Move kart
  if (leftPressed) kart -= 5;
  if (rightPressed) kart += 5;
  kart = constrain(kart, 0, width);

  // Draw kart
  fill(0);
  textAlign(CENTER);
  textSize(32);
  text("C50C", kart, height - 50);

  // Generate doors
  if (frameCount % 30 === 0) {
    doors.push({ x: random(width), y: 0 });
  }

  // Move and draw doors
  for (let i = doors.length - 1; i >= 0; i--) {
    let d = doors[i];
    d.y += speed;
    fill(0);
    textSize(24);
    text("D00R", d.x, d.y);

    // Collision detection
    if (dist(kart, height - 50, d.x, d.y) < 40) {
      gameOver = true;
    }

    // Remove off-screen doors
    if (d.y > height) {
      doors.splice(i, 1);
      score++;
      speed += 0.05;
    }
  }

  // Draw ASCII arrows
  textSize(24);
  text("[<<]", 50, height - 20);
  text("[>>]", width - 50, height - 20);
}

function touchStarted() {
  if (mouseX < width / 2) {
    leftPressed = true;
  } else {
    rightPressed = true;
  }
}

function touchEnded() {
  leftPressed = false;
  rightPressed = false;
}
