let car;
let obstacles = [];
let score = 0;
let leftButton, rightButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  car = new C50C(width / 2, height - 100);
  leftButton = createButton("◀");
  rightButton = createButton("▶");
  leftButton.position(40, height - 140);
  rightButton.position(width - 80, height - 140);
  leftButton.size(60, 60);
  rightButton.size(60, 60);
  leftButton.style('font-size', '32px');
  rightButton.style('font-size', '32px');
  leftButton.mousePressed(() => car.move(-1));
  rightButton.mousePressed(() => car.move(1));
}

function draw() {
  background(lerpColor(color('#ff00ff'), color('#00ffff'), frameCount % 120 / 120));
  fill(255);
  textSize(24);
  textAlign(CENTER, TOP);
  text("Score: " + score, width / 2, 10);

  car.display();

  if (frameCount % 60 === 0) {
    obstacles.push(new Obstacle(random(width), 0));
    score++;
  }

  for (let obs of obstacles) {
    obs.update();
    obs.display();
    if (obs.hits(car)) {
      noLoop();
      text("Game Over", width / 2, height / 2);
    }
  }
}

class C50C {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 60;
  }

  move(dir) {
    this.x += dir * 40;
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(0);
    rectMode(CENTER);
    rect(0, 0, this.size, this.size / 2); // main body
    rect(-this.size / 3, -this.size / 4, this.size / 6, this.size / 4); // left wheel
    rect(this.size / 3, -this.size / 4, this.size / 6, this.size / 4); // right wheel
    pop();
  }
}

class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 20;
    this.speed = 5;
  }

  update() {
    this.y += this.speed;
  }

  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  hits(c) {
    return collideRectRect(this.x, this.y, this.w, this.h, c.x - c.size/2, c.y - c.size/4, c.size, c.size/2);
  }
}
