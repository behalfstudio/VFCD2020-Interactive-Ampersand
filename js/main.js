var AMPERSAND_IMG_DIRECTORY = "assets/amp/amp-0";
var AMPERSAND_COUNT = 4;
var ampersandImages = [];
var BLACK_AMP;

var PARTICLE_DIRECTORY = "assets/particles/";

//-------------------------------------------------------------------//

var CULTURE = 0;
var HERITAGE = 1;
var INNOVATION = 2;
var COMMUNITY = 3;

//-------------------------------------------------------------------//

var WIDTH;
var HEIGHT;

var GRID_UNIT;
var STROKE_WEIGHT;
var DOMINANT_COLOR_PROB_THEME;
var DOMINANT_COLOR_PROB_COMBINED;
var DENSITY;

var NOISE_STEP;
var BLACK_THRESHOLD;
var POSITIVE_THRESHOLD;

//-------------------------------------------------------------------//

var MIN_SPEED;
var MAX_SPEED;
var MAX_FORCE_RATIO;
var CLOSE_ENOUGH_TARGET;

//-------------------------------------------------------------------//

var COLORS = [
  // CULTURE
  [
    "#F5C022", // yellow
    "#F7731B", // orange
    "#149738", // green
  ],

  // HERITAGE
  [
    "#F59AB8", // light pink
    "#D10353", // deep pink
    "#283BBD", // deep blue
  ],

  // INNOVATION
  [
    "#6EB8F0", // light blue
    "#283BBD", // deep blue
    "#F7731B", // orange
  ],
];

var WHITE, BLACK, OFF_WHITE, TRANSPARENT, LIGHT_GRAY;

//-------------------------------------------------------------------//

function declareConstants() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;

  GRID_UNIT = (WIDTH * HEIGHT) / 75000;
  STROKE_WEIGHT = GRID_UNIT / 10;
  DOMINANT_COLOR_PROB_THEME = 0.85;
  DOMINANT_COLOR_PROB_COMBINED = 0.5;
  DENSITY = 0.9;

  NOISE_STEP = GRID_UNIT / 50;
  BLACK_THRESHOLD = 0.38;
  POSITIVE_THRESHOLD = 0.7;

  MIN_SPEED = (WIDTH * 6) / 1500;
  MAX_SPEED = MIN_SPEED * 2;
  MAX_FORCE_RATIO = 0.025;
  CLOSE_ENOUGH_TARGET = GRID_UNIT * 7;

  WHITE = color(255);
  BLACK = color(0);
  BLACK_AMP = [0, 0, 0, 255];
  OFF_WHITE = "#F6F5EE";
  TRANSPARENT = color(0, 0);
  LIGHT_GRAY = color(230);
}

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

function preload() {
  for (var i = 0; i < AMPERSAND_COUNT; i++) {
    var img = loadImage(AMPERSAND_IMG_DIRECTORY + i + ".jpg");
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
  image(ampersandImages[currentTheme], (WIDTH - HEIGHT) / 2, 0);
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

function windowResized() {
  declareConstants();

  resizeCanvas(WIDTH, HEIGHT);
}

//-------------------------------------------------------------------//

function mousePressed() {
  ps.initCoordsIndexes();
}
