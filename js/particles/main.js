var DIRECTORY =
  "https://vfcd.events/wp-content/themes/vfcd/BLANK/images/particles/";
var AMPERSAND_IMG_DIRECTORY = DIRECTORY + "amp/";
var PARTICLE_DIRECTORY = DIRECTORY + "components/";

//-------------------------------------------------------------------//

var AMPERSAND_COUNT = 4;
var ampersandImages = [];

//-------------------------------------------------------------------//

var FRAME_RATE = 30;

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

function preload() {
  for (var i = 0; i < AMPERSAND_COUNT; i++) {
    var img = loadImage(AMPERSAND_IMG_DIRECTORY + "amp_" + i + ".jpg");
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
  canvas.parent("particle-container");

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
  console.log(ps.particles.length);
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
