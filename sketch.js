let car;
let carWidth = 40;
let carHeight = 60;
let score = 0;
let obstacles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  car = createVector(width / 2, height - carHeight - 20);
}

function draw() {
  background('#9575CD');

  drawScore();
  moveCar();
  drawCar();
  handleObstacles();
  checkCollisions();
}

function drawScore() {
  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);
}

function moveCar() {
  if (keyIsDown(LEFT_ARROW)) {
    car.x -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    car.x += 5;
  }
  car.x = constrain(car.x, 0, width - carWidth);
}

function drawCar() {
  fill(255, 0, 0);
  rect(car.x, car.y, carWidth, carHeight, 10);
  fill(0);
  rect(car.x + 5, car.y + 10, 10, 10); // left headlight
  rect(car.x + carWidth - 15, car.y + 10, 10, 10); // right headlight
}

function handleObstacles() {
  if (frameCount % 60 === 0) {
    let x = random(width - 30);
    obstacles.push(createVector(x, -30));
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    let o = obstacles[i];
    fill(0);
    rect(o.x, o.y, 30, 30);
    o.y += 4;

    if (o.y > height) {
      obstacles.splice(i, 1);
      score++;
    }
  }
}

function checkCollisions() {
  for (let o of obstacles) {
    if (
      car.x < o.x + 30 &&
      car.x + carWidth > o.x &&
      car.y < o.y + 30 &&
      car.y + carHeight > o.y
    ) {
      noLoop();
      fill(255, 0, 0);
      textSize(48);
      textAlign(CENTER, CENTER);
      text("Game Over", width / 2, height / 2);
    }
  }
}
