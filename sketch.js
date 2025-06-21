let car;
let doors = [];
let leftPressed = false;
let rightPressed = false;
let gameOver = false;
let score = 0;
let startTime;
let state = 'title';

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(32);
  car = new Car();
}

function draw() {
  background(0);
  if (state === 'title') {
    fill(255);
    textSize(48);
    text("DON'T TOUCH THE DOOR", width / 2, height / 3);
    textSize(24);
    text("Tap to Start", width / 2, height / 2);
  } else if (state === 'game') {
    if (!gameOver) {
      playGame();
    } else {
      fill(255, 0, 0);
      textSize(32);
      text("YOU TOUCHED THE DOOR AFTER " + score + " METERS", width / 2, height / 2);
      text("Tap to Restart", width / 2, height / 2 + 40);
    }
  }
}

function playGame() {
  score = int((millis() - startTime) / 100);
  fill(255);
  textSize(20);
  text(score + " METERS", width / 2, 30);

  if (leftPressed) car.move(-1);
  if (rightPressed) car.move(1);
  car.show();

  if (frameCount % int(60 - min(score / 10, 40)) === 0) {
    doors.push(new Door());
  }

  for (let i = doors.length - 1; i >= 0; i--) {
    doors[i].update();
    doors[i].show();
    if (doors[i].hits(car)) {
      gameOver = true;
    }
    if (doors[i].offscreen()) {
      doors.splice(i, 1);
    }
  }
}

function mousePressed() {
  if (state === 'title') {
    state = 'game';
    score = 0;
    gameOver = false;
    doors = [];
    startTime = millis();
  } else if (gameOver) {
    state = 'title';
  } else {
    if (mouseX < width / 2) {
      leftPressed = true;
    } else {
      rightPressed = true;
    }
  }
}

function mouseReleased() {
  leftPressed = false;
  rightPressed = false;
}

class Car {
  constructor() {
    this.w = 80;
    this.h = 40;
    this.x = width / 2;
    this.y = height - 100;
  }
  move(dir) {
    this.x += dir * 10;
    this.x = constrain(this.x, this.w / 2, width - this.w / 2);
  }
  show() {
    fill(255);
    textSize(32);
    text("c50c", this.x, this.y);
  }
}

class Door {
  constructor() {
    this.w = 80;
    this.h = 40;
    this.x = random(this.w / 2, width - this.w / 2);
    this.y = -40;
    this.speed = 3 + score / 100;
    this.color = color(random(255), random(255), random(255));
  }
  update() {
    this.y += this.speed;
  }
  show() {
    fill(this.color);
    textSize(32);
    text("d00r", this.x, this.y);
  }
  offscreen() {
    return this.y > height + 20;
  }
  hits(car) {
    return abs(this.x - car.x) < 40 && abs(this.y - car.y) < 20;
  }
}
