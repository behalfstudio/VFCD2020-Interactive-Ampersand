var AMPERSAND_IMG_DIRECTORY = "assets/img/";
var AMPERSAND_COUNT = 4;
var ampersandImages = [];

var PARTICLE_DIRECTORY = "assets/particles/";

//-------------------------------------------------------------------//

var ps;

var currentTheme;

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

  GRID_UNIT = 20;
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
  OFF_WHITE = color("#F6F5EE");
  TRANSPARENT = color(0, 0);
  LIGHT_GRAY = color(230);
}

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

function preload() {
  for (var i = 0; i < AMPERSAND_COUNT; i++) {
    var img = loadImage(AMPERSAND_IMG_DIRECTORY + 0 + ".jpg");
    ampersandImages.push(img);
  }
}

//-------------------------------------------------------------------//

var canvas;
var bg;

function setup() {
  declareConstants();

  //-------------------------------------------------------------------//

  strokeCap(SQUARE);

  //-------------------------------------------------------------------//

  canvas = createCanvas(WIDTH, HEIGHT);
  canvas.id("particle-canvas");

  bg = document.getElementById("particle-background");
  bg.style("z-index", "-1");

  //-------------------------------------------------------------------//

  canvas.currentTheme = getCurrentTheme();

  ps = new ParticleSystem(currentTheme);
}

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

function draw() {
  background(ps.bgColor);
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

function windowResized() {
  declareConstants();
  canvas = createCanvas(WIDTH, HEIGHT);
}
