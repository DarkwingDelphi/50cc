
let kart;
let doors = [];
let gameState = "start";
let score = 0;
let speed = 2;
let fontSize = 32;
let flashAlpha = 0;
let shakeTimer = 0;
let rightButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(fontSize);
  kart = {
    x: width / 2,
    y: height - 100,
    w: textWidth("C50C"),
    h: fontSize
  };

  rightButton = createButton("➡️");
  rightButton.position(width - 100, height - 100);
  rightButton.size(60, 60);
  rightButton.style('font-size', '32px');
  rightButton.mousePressed(() => {
    kart.x += 20;
  });
  rightButton.hide();
}

function draw() {
  if (shakeTimer > 0) {
    translate(random(-10, 10), random(-10, 10));
    shakeTimer--;
  }

  background(50);

  if (flashAlpha > 0) {
    fill(255, flashAlpha);
    rect(0, 0, width, height);
    flashAlpha -= 10;
  }

  if (gameState === "start") {
    fill(255);
    textSize(36);
    text("DON’T TOUCH THE DOOR\nTap to Start", width / 2, height / 2);
  }

  else if (gameState === "play") {
    rightButton.show();
    drawKart();
    updateDoors();
    score += 1;
    textSize(20);
    fill(255);
    text("Distance: " + score, width / 2, 40);
    speed += 0.002;
  }

  else if (gameState === "end") {
    rightButton.hide();
    fill(255, 0, 0);
    textSize(32);
    text("YOU CRASHED!\nDistance: " + score + "\nTap to Restart", width / 2, height / 2);
  }
}

function drawKart() {
  fill(0, 255, 0);
  textSize(fontSize);
  text("C50C", kart.x, kart.y);
  kart.x = constrain(kart.x, 50, width - 50);
}

function updateDoors() {
  if (frameCount % 60 === 0) {
    doors.push({
      x: random(50, width - 50),
      y: -50,
      w: textWidth("D00R"),
      h: fontSize
    });
  }

  for (let i = doors.length - 1; i >= 0; i--) {
    let d = doors[i];
    fill(200, 100, 0);
    textSize(fontSize);
    text("D00R", d.x, d.y);
    d.y += speed;

    if (collides(kart, d)) {
      flashAlpha = 200;
      shakeTimer = 20;
      gameState = "end";
    }

    if (d.y > height + 50) {
      doors.splice(i, 1);
    }
  }
}

function collides(a, b) {
  return !(a.x + a.w / 2 < b.x - b.w / 2 ||
           a.x - a.w / 2 > b.x + b.w / 2 ||
           a.y + a.h / 2 < b.y - b.h / 2 ||
           a.y - a.h / 2 > b.y + b.h / 2);
}

function touchStarted() {
  if (gameState === "start") {
    gameState = "play";
    score = 0;
    doors = [];
    speed = 2;
  } else if (gameState === "end") {
    gameState = "start";
  }
}
