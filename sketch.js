let player;
let doors = [];
let distance = 0;
let speed = 2;
let leftPressed = false;
let rightPressed = false;
let gameOver = false;
let rainbowOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(24);
  player = {
    x: width / 2,
    y: height - 80,
    size: 30
  };

  for (let i = 0; i < 10; i++) {
    doors.push({
      x: random(width),
      y: random(-1000, 0)
    });
  }
}

function draw() {
  drawRainbowBackground();

  if (gameOver) {
    fill(255);
    textSize(32);
    text("You crashed!
Distance: " + distance, width / 2, height / 2);
    return;
  }

  fill(0, 255, 0);
  textSize(32);
  text("C50C", player.x, player.y);

  for (let door of doors) {
    fill(255, 165, 0);
    textSize(24);
    text("D00R", door.x, door.y);
    door.y += speed;
    if (collides(player, door)) {
      gameOver = true;
    }
  }

  doors = doors.filter(door => door.y < height + 50);
  while (doors.length < 10) {
    doors.push({
      x: random(width),
      y: random(-200, 0)
    });
  }

  if (leftPressed) player.x -= 5;
  if (rightPressed) player.x += 5;
  player.x = constrain(player.x, 0, width);

  distance += floor(speed);
  speed += 0.001;

  fill(255);
  textSize(16);
  text("Distance: " + distance, width / 2, 20);

  drawControls();
}

function drawControls() {
  fill(100);
  rect(0, height - 100, width / 2, 100);
  rect(width / 2, height - 100, width / 2, 100);

  fill(255);
  textSize(48);
  text("⬅️", width / 4, height - 50);
  text("➡️", 3 * width / 4, height - 50);
}

function touchStarted() {
  if (mouseY > height - 100) {
    if (mouseX < width / 2) {
      leftPressed = true;
    } else {
      rightPressed = true;
    }
  }
}

function touchEnded() {
  leftPressed = false;
  rightPressed = false;
}

function collides(p, d) {
  return dist(p.x, p.y, d.x, d.y) < 30;
}

function drawRainbowBackground() {
  for (let y = 0; y < height; y++) {
    let hue = (y * 0.5 + rainbowOffset) % 360;
    stroke(color('hsl(' + hue + ', 100%, 50%)'));
    line(0, y, width, y);
  }
  rainbowOffset += 0.5;
}
