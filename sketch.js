let car;
let carX;
let carSize = 50;
let obstacles = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  carX = width / 2;
  textSize(32);
}

function draw() {
  background(0, 0); // Transparent so gradient shows
  fill(255);
  text("Score: " + score, 20, 40);

  if (gameOver) {
    textSize(48);
    text("You touched the d00r", width / 2 - 200, height / 2);
    noLoop();
    return;
  }

  // Draw car
  fill(0);
  textSize(32);
  text("c50c", carX, height - 60);

  // Draw and update obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    fill(255, 0, 0);
    text("d00r", obstacles[i].x, obstacles[i].y);
    obstacles[i].y += obstacles[i].speed;

    // Collision
    if (
      obstacles[i].y > height - 100 &&
      obstacles[i].x > carX - 20 &&
      obstacles[i].x < carX + carSize
    ) {
      gameOver = true;
    }

    // Remove and score
    if (obstacles[i].y > height) {
      obstacles.splice(i, 1);
      score++;
    }
  }

  // Spawn new obstacles
  if (frameCount % 60 === 0) {
    obstacles.push({
      x: random(50, width - 50),
      y: -20,
      speed: 3 + score * 0.05,
    });
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    carX -= 20;
  } else if (keyCode === RIGHT_ARROW) {
    carX += 20;
  }
}
