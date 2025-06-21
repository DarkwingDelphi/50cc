
let music;
let started = false;

function preload() {
  soundFormats('mp3');
  music = loadSound('ambient_space_wave.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
}

function draw() {
  if (!started) {
    background(0);
    text("Tap to Start", width / 2, height / 2);
    return;
  }

  background(0);
  text("Game Running...", width / 2, height / 2);
}

function touchStarted() {
  if (!started) {
    userStartAudio();
    music.loop();
    started = true;
  }
}
