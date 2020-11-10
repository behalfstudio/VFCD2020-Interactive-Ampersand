var PARTICLE_DIRECTORY =
  "https://vfcd.events/wp-content/themes/vfcd/BLANK/images/particles/components/";

//-------------------------------------------------------------------//

var FRAME_RATE = 30;

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

function preload() {}

//-------------------------------------------------------------------//

var canvas;
var bg;

var ps;
var currentTheme;

function setup() {
  declareConstants();

  //-------------------------------------------------------------------//

  canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent("particle-container");

  frameRate(FRAME_RATE);

  //-------------------------------------------------------------------//

  currentTheme = 3;
  $("#btn" + currentTheme).addClass("active");

  ps = new ParticleSystem(currentTheme);
}

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

function draw() {
  clear();
  ps.run();
}

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

function mousePressed() {
  if (mouseButton == LEFT) {
    ps.trail(mouseX, mouseY);
  }

  if (mouseButton == RIGHT) {
    ps.trail();
  }
}

function mouseDragged() {
  if (mouseButton == LEFT) {
    ps.trail(mouseX, mouseY);
  }
}

function touchStarted() {
  ps.trail(mouseX, mouseY);
}

function touchMoved() {
  ps.trail(mouseX, mouseY);
}

//-------------------------------------------------------------------//

function windowResized() {
  declareConstants();

  resizeCanvas(WIDTH, HEIGHT);
}
