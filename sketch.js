
let player;
let enemies = [];
let score = 0;
let gameOver = false;
let restartButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Arial Black');
  player = new Player();
  for (let i = 0; i < 5; i++) {
    enemies.push(new Enemy());
  }
  restartButton = createButton("Restart");
  restartButton.position(width / 2 - 40, height / 2 + 30);
  restartButton.mousePressed(restartGame);
  restartButton.hide();
}

function draw() {
  let meters = int(score / 60);
  background(getDynamicBackground(meters));

  if (!gameOver) {
    player.update();
    player.display();

    for (let e of enemies) {
      e.update();
      e.display();

      if (player.hits(e)) {
        gameOver = true;
        restartButton.show();
      }
    }

    score++;
    fill(255);
    textSize(24);
    textAlign(LEFT, TOP);
    text(`${meters} m`, 20, 20);
  } else {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(`You touched the door after ${int(score / 60)} miles`, width / 2, height / 2);
  }
}

function restartGame() {
  score = 0;
  player = new Player();
  enemies = [];
  for (let i = 0; i < 5; i++) {
    enemies.push(new Enemy());
  }
  gameOver = false;
  restartButton.hide();
}

class Player {
  constructor() {
    this.size = 60;
    this.x = width / 2;
    this.y = height - this.size * 1.5;
  }

  update() {
    if (touches.length > 0) {
      this.x = touches[0].x;
    }

    if (keyIsDown(LEFT_ARROW)) this.x -= 5;
    if (keyIsDown(RIGHT_ARROW)) this.x += 5;

    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
  }

  display() {
    let c = lerpColor(color(0), color(255), 1 - (score % 6000) / 6000.0);
    fill(c);
    stroke(0);
    strokeWeight(2);
    textSize(this.size);
    textAlign(CENTER, CENTER);
    text("c50c", this.x, this.y);
  }

  hits(enemy) {
    return dist(this.x, this.y, enemy.x, enemy.y) < (this.size + enemy.size) / 2;
  }
}

class Enemy {
  constructor() {
    this.size = random(40, 100);
    this.x = random(width);
    this.y = random(-1000, -40);
  }

  update() {
    this.y += 3 + score / 1000;
    if (this.y > height + this.size) {
      this.y = random(-1000, -40);
      this.x = random(width);
    }
  }

  display() {
    let c = lerpColor(color(255), color(0), (score % 6000) / 6000.0);
    fill(c);
    stroke(255);
    strokeWeight(2);
    textSize(this.size);
    textAlign(CENTER, CENTER);
    text("door", this.x, this.y);
  }
}

function getDynamicBackground(meters) {
  let ramp = (meters % 100) / 100;
  if (meters < 100) return lerpColor(color(100), color(120), ramp);
  if (meters < 200) return lerpColor(color(120), color(140), ramp);
  if (meters < 300) return lerpColor(color(140), color(160), ramp);
  if (meters < 400) return lerpColor(color(160), color(180), ramp);
  return color(200);
}
