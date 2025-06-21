
let car;
let carX;
let speed = 5;
let doors = [];
let distance = 0;
let moveDir = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(32);
  car = "C50C";
  carX = width / 2;
}

function draw() {
  setGradientBackground();

  fill(255);
  text("Distance: " + distance, width / 2, 30);

  drawCar();
  updateDoors();
  checkCollision();

  carX += moveDir * 10;
  carX = constrain(carX, 0, width);

  distance++;
}

function drawCar() {
  fill(0, 255, 0);
  text(car, carX, height - 100);
}

function updateDoors() {
  for (let i = doors.length - 1; i >= 0; i--) {
    doors[i].y += speed;
    fill(255, 165, 0);
    text(doors[i].label, doors[i].x, doors[i].y);

    if (doors[i].y > height) {
      doors.splice(i, 1);
    }
  }

  if (frameCount % 30 === 0) {
    doors.push({
      x: random(50, width - 50),
      y: -50,
      label: "D00R"
    });
  }
}

function checkCollision() {
  for (let door of doors) {
    let d = dist(carX, height - 100, door.x, door.y);
    if (d < 50) {
      noLoop();
      background(255, 0, 0);
      fill(0);
      text("CRASH! You made it " + distance + " units.", width / 2, height / 2);
    }
  }
}

function moveLeft() {
  moveDir = -1;
}

function moveRight() {
  moveDir = 1;
}

function stopMove() {
  moveDir = 0;
}

function setGradientBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(255, 0, 0), color(0, 0, 255), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
