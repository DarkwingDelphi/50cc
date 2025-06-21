
let car;
let doors = [];
let doorColors = ['#FF69B4', '#00FFFF', '#FFFF00', '#FFA500', '#00FF00'];
let score = 0;
let gameOver = false;
let speed = 2;
let spawnRate = 60;
let bgOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(32);
  car = width / 2;
}

function draw() {
  // Rainbow background
  for (let y = 0; y < height; y++) {
    let hue = (y + bgOffset) % height / height;
    stroke(color('hsb(' + (hue * 360) + ', 100%, 100%)'));
    line(0, y, width, y);
  }
  bgOffset += 1;

  if (gameOver) {
    fill(0);
    rect(0, 0, width, height);
    fill(255);
    text("You touched the door after " + int(score) + " meters", width / 2, height / 2);
    return;
  }

  fill(255);
  text("Meters: " + int(score), width / 2, 30);

  fill(255);
  textSize(48);
  text("c50c", car, height - 60);

  // Update and show doors
  for (let i = doors.length - 1; i >= 0; i--) {
    let door = doors[i];
    door.y += door.speed;

    // Ghosting trail
    for (let t = 1; t <= 4; t++) {
      fill(random(doorColors));
      textSize(door.size);
      text("d00r", door.x, door.y - t * 5);
    }

    fill(255);
    textSize(door.size);
    text("d00r", door.x, door.y);

    if (abs(door.y - (height - 60)) < 20 && abs(door.x - car) < 50) {
      gameOver = true;
    }

    if (door.y > height + 50) {
      doors.splice(i, 1);
    }
  }

  if (frameCount % spawnRate === 0) {
    let newDoor = {
      x: random(50, width - 50),
      y: -50,
      speed: speed + random(0, 2),
      size: random([24, 48]) // half or 1.5x normal (32)
    };
    doors.push(newDoor);
    score += 1;
    if (spawnRate > 20) spawnRate -= 1;
    speed += 0.05;
  }
}

function touchStarted() {
  if (mouseX < width / 2) {
    car -= 50;
  } else {
    car += 50;
  }
  return false;
}
