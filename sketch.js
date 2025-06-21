
let playerX;
let playerY;
let playerSize = 40;
let speed = 5;
let distance = 0;
let gameOver = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerX = width / 2;
  playerY = height - 100;
  textAlign(CENTER, CENTER);
  textSize(32);
}

function draw() {
  if (gameOver) {
    background(255, 0, 0);
    fill(0, 0, 100);
    text("CRASH! You made it " + distance + " meters", width / 2, height / 2);
    return;
  }

  background(lerpColor(color('#ff0080'), color('#00ffff'), sin(frameCount * 0.01) * 0.5 + 0.5));

  // Move and draw player (simple rectangle for now)
  fill(0);
  rect(playerX - playerSize/2, playerY - playerSize/2, playerSize, playerSize);

  // Move obstacles (not implemented here)
  distance += floor(speed / 5);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    playerX -= 40;
  } else if (keyCode === RIGHT_ARROW) {
    playerX += 40;
  }
}

document.getElementById("left").addEventListener("click", () => {
  playerX -= 40;
});
document.getElementById("right").addEventListener("click", () => {
  playerX += 40;
});
