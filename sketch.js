
let player;
let doors = [];
let score = 0;
let gameOver = false;
let restartButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();
  textAlign(CENTER, CENTER);
  restartButton = createButton('Restart');
  restartButton.position(width / 2 - 40, height / 2 + 40);
  restartButton.mousePressed(() => {
    score = 0;
    gameOver = false;
    doors = [];
    player = new Player();
    restartButton.hide();
  });
  restartButton.hide();
}

function draw() {
  background(map(score % 100, 0, 100, 50, 255));
  if (!gameOver) {
    player.update();
    player.show();

    if (frameCount % 60 === 0) {
      doors.push(new Door());
    }

    for (let i = doors.length - 1; i >= 0; i--) {
      doors[i].update();
      doors[i].show();
      if (player.hits(doors[i])) {
        gameOver = true;
        restartButton.show();
      }
      if (doors[i].offscreen()) {
        doors.splice(i, 1);
      }
    }

    score += 0.1;
    fill(255);
    textSize(24);
    text("Distance: " + nf(score, 1, 1) + "m", width / 2, 30);
  } else {
    fill(255, 0, 0);
    textSize(32);
    text("You touched the door after " + nf(score, 1, 1) + " meters", width / 2, height / 2);
  }
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 60;
    this.size = 40;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) this.x -= 5;
    if (keyIsDown(RIGHT_ARROW)) this.x += 5;
    this.x = constrain(this.x, 0, width);
  }

  show() {
    fill(255);
    stroke(0);
    strokeWeight(2);
    textSize(this.size);
    text("c50c", this.x, this.y);
  }

  hits(door) {
    return collideRectRect(this.x - 20, this.y - 20, 40, 40, door.x, door.y, door.w, door.h);
  }
}

class Door {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.w = 60;
    this.h = 40;
    this.speed = 4;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(255);
    stroke(0);
    strokeWeight(2);
    textSize(32);
    text("door", this.x, this.y);
  }

  offscreen() {
    return this.y > height;
  }
}
