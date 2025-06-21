
let car;
let carX;
let speed;
let doors = [];
let distance;
let gameOver = false;
let moveLeft = false;
let moveRight = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  car = "C50C";
  carX = width / 2;
  speed = 2;
  distance = 0;

  for (let i = 0; i < 5; i++) {
    doors.push({
      x: random(0, width - 100),
      y: random(-1000, 0),
    });
  }

  document.getElementById("left").ontouchstart = () => moveLeft = true;
  document.getElementById("left").ontouchend = () => moveLeft = false;
  document.getElementById("right").ontouchstart = () => moveRight = true;
  document.getElementById("right").ontouchend = () => moveRight = false;
}

function draw() {
  drawRainbowBackground();
  if (gameOver) {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("You crashed!
Distance: " + floor(distance), width / 2, height / 2);
    return;
  }

  distance += 0.1;
  speed += 0.001;

  if (moveLeft) carX -= 5;
  if (moveRight) carX += 5;

  carX = constrain(carX, 0, width - 60);

  fill(255);
  textSize(32);
  textAlign(LEFT, TOP);
  text("Distance: " + floor(distance), 10, 10);

  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(car, carX + 30, height - 60);

  for (let door of doors) {
    fill(255, 0, 0);
    rect(door.x, door.y, 60, 100);
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("D00R", door.x + 30, door.y + 50);
    door.y += speed;

    if (
      door.y + 100 >= height - 60 &&
      door.x < carX + 60 &&
      door.x + 60 > carX
    ) {
      gameOver = true;
    }

    if (door.y > height) {
      door.y = random(-200, -100);
      door.x = random(0, width - 60);
    }
  }
}

function drawRainbowBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(
      color(255, 0, 0),
      color(0, 0, 255),
      inter
    );
    stroke(c);
    line(0, y, width, y);
  }
}
