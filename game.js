
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.8;

let player = { x: canvas.width / 2, y: canvas.height - 60, size: 30 };
let doors = [];
let speed = 2;
let distance = 0;
let leftPressed = false;
let rightPressed = false;

document.getElementById('leftBtn').addEventListener('touchstart', () => leftPressed = true);
document.getElementById('leftBtn').addEventListener('touchend', () => leftPressed = false);
document.getElementById('rightBtn').addEventListener('touchstart', () => rightPressed = true);
document.getElementById('rightBtn').addEventListener('touchend', () => rightPressed = false);

function spawnDoor() {
  let x = Math.random() * (canvas.width - 40);
  doors.push({ x, y: -20 });
}

function drawPlayer() {
  ctx.fillStyle = 'lime';
  ctx.font = "bold 24px Courier New";
  ctx.fillText("C50C", player.x, player.y);
}

function drawDoors() {
  ctx.fillStyle = 'orange';
  ctx.font = "bold 20px Courier New";
  for (let door of doors) {
    ctx.fillText("D00R", door.x, door.y);
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  distance += 1;

  if (Math.random() < 0.02) spawnDoor();

  for (let door of doors) {
    door.y += speed;
    if (Math.abs(door.x - player.x) < 30 && Math.abs(door.y - player.y) < 20) {
      alert("Crash! Distance: " + distance);
      document.location.reload();
      return;
    }
  }

  if (leftPressed) player.x -= 5;
  if (rightPressed) player.x += 5;

  drawPlayer();
  drawDoors();
  ctx.fillStyle = 'white';
  ctx.fillText("Distance: " + distance, 10, 20);

  requestAnimationFrame(update);
}

update();
