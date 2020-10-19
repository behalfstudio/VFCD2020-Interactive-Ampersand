var AMPERSAND_IMG_DIRECTORY = "assets/img/";
var AMPERSAND_COUNT = 4;
var ampersandImages = [];

var PARTICLE_DIRECTORY = "assets/particles/";

//-------------------------------------------------------------------//

var ps;

var currentTheme;

var WHITE, BLACK, OFF_WHITE, TRANSPARENT, LIGHT_GRAY;

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

function preload() {
  for (var i = 0; i < AMPERSAND_COUNT; i++) {
    //var img = loadImage(AMPERSAND_IMG_DIRECTORY + 0 + ".jpg");
    //ampersandImages.push(img);
  }
}

//-------------------------------------------------------------------//

function setup() {
  createCanvas(WIDTH, HEIGHT);

  WHITE = color(255);
  BLACK = color(0);
  OFF_WHITE = color("#F6F5EE");
  TRANSPARENT = color(0, 0);
  LIGHT_GRAY = color(230);

  strokeCap(SQUARE);

  currentTheme = getCurrentTheme();

  ps = new ParticleSystem(currentTheme);
}

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

function mousePressed() {
  ps = new ParticleSystem(++currentTheme % 4);
}
