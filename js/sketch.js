var AMPERSAND_IMG_DIRECTORY = "assets/img/";
var AMPERSAND_COUNT = 4;
var ampersandImages = [];

//-------------------------------------------------------------------//

var ps;

var currentTheme;

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

function preload() {
  for (var i = 0; i < AMPERSAND_COUNT; i++) {}
}

//-------------------------------------------------------------------//

function setup() {
  createCanvas(WIDTH, HEIGHT);

  var img = loadImage(AMPERSAND_IMG_DIRECTORY + 0 + ".jpg");

  var WHITE = color(255);
  var BLACK = color(0);
  var OFF_WHITE = color("#F6F5EE");
  var TRANSPARENT = color(0, 0);
  var LIGHT_GRAY = color(230);

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
