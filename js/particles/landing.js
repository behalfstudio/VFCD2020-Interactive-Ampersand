var AMPERSAND_IMG_DIRECTORY = "../images/particles/amp/";
var PARTICLE_DIRECTORY = "../images/particles/components/";

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

var AMPERSAND_COUNT = 4;
var ampersandImages = [];

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

function preload() {
  for (var i = 0; i < AMPERSAND_COUNT; i++) {
    var img = loadImage("amp_" + AMPERSAND_IMG_DIRECTORY + i + ".jpg");
    ampersandImages.push(img);
  }
}

//-------------------------------------------------------------------//

var canvas;
var bg;

var ps;
var currentTheme;

function setup() {
  declareConstants();

  for (var i = 0; i < AMPERSAND_COUNT; i++) {
    ampersandImages[i].resize(HEIGHT, 0);
  }

  //-------------------------------------------------------------------//

  canvas = createCanvas(WIDTH, HEIGHT);
  canvas.id("particle-canvas");

  frameRate(FRAME_RATE);

  //-------------------------------------------------------------------//

  currentTheme = getCurrentTheme();
  ps = new ParticleSystem(currentTheme);

  //-------------------------------------------------------------------//

  bg = document.getElementById("particle-background");
  bg.style.background = ps.bgColor;
}

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

function draw() {
  clear();
  ps.run();
}

//-------------------------------------------------------------------//

function getCurrentTheme() {
  if (month() == 11 && year() == 2020) {
    // CULTURE
    if (day() >= 7 && day() <= 12) {
      return 0;
    }

    // HERITAGE
    if (day() >= 13 && day() <= 15) {
      return 1;
    }

    // INNOVATION
    if (day() >= 16 && day() <= 22) {
      return 2;
    }
  }

  // COMMUNITY
  return 3;
}

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

function mousePressed() {
  if (mouseButton == LEFT) {
    ps.explode(mouseX, mouseY);
  }

  if (mouseButton == RIGHT) {
    ps.initCoordsIndexes();
  }
}

function mouseDragged() {
  if (mouseButton == LEFT) {
    ps.explode(mouseX, mouseY);
  }
}

function touchStarted() {
  ps.explode(mouseX, mouseY);
}

function touchMoved() {
  ps.explode(mouseX, mouseY);
}

//-------------------------------------------------------------------//

function windowResized() {
  declareConstants();

  resizeCanvas(WIDTH, HEIGHT);
}
