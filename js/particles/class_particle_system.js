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

var BASE_FORCE;
var FALLOFF;

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

  GRID_UNIT = (WIDTH + HEIGHT) / 150;

  STROKE_WEIGHT = GRID_UNIT / 10;
  DOMINANT_COLOR_PROB_THEME = 0.85;
  DOMINANT_COLOR_PROB_COMBINED = 0.5;
  DENSITY = 0.1;

  TRAIL_RADIUS = GRID_UNIT * 5;

  NOISE_STEP = GRID_UNIT / 50;
  BLACK_THRESHOLD = 0.38;
  POSITIVE_THRESHOLD = 0.7;

  MIN_SPEED = (WIDTH * 6) / 1500;
  MAX_SPEED = MIN_SPEED * 2;
  MAX_FORCE_RATIO = 0.025;
  CLOSE_ENOUGH_TARGET = GRID_UNIT * 7;

  BASE_FORCE = GRID_UNIT * 0.8;
  FALLOFF = GRID_UNIT * 0.4;

  WHITE = color(255);
  BLACK = color(0);
  OFF_WHITE = "#F6F5EE";
  TRANSPARENT = color(0, 0);
  LIGHT_GRAY = color(230);
}

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

class ParticleSystem {
  constructor(theme_) {
    this.theme = theme_;

    switch (this.theme) {
      case CULTURE:
      case HERITAGE:
      case INNOVATION:
        this.bgColor = COLORS[this.theme][0];
        break;

      case COMMUNITY:
        this.bgColor = OFF_WHITE;
        break;
    }

    this.particles = [];

    this.coordsIndexes = [];
  }

  //-------------------------------------------------------------------//

  trail(mX, mY) {
    noiseSeed(int(random(10000)));

    var noiseStep = NOISE_STEP;
    var xOffset;
    var yOffset;

    yOffset = 0;
    for (var i = 0; i < WIDTH / GRID_UNIT; i++) {
      xOffset = 0;

      for (var j = 0; j < HEIGHT / GRID_UNIT; j++) {
        var x = int(i * GRID_UNIT);
        var y = int(j * GRID_UNIT);

        var n = noise(xOffset, yOffset);

        if (dist(x, y, mX, mY) <= TRAIL_RADIUS) {
          var n = noise(xOffset, yOffset);

          if (dist(x, y, mX, mY) <= TRAIL_RADIUS / 2) {
            n += BLACK_THRESHOLD;
          }

          if (n >= POSITIVE_THRESHOLD) {
            if (random(1) <= DENSITY) {
              this.addParticle(x, y);
            }
          }
        }

        xOffset += noiseStep;
      }

      yOffset += noiseStep;
    }
  }

  //-------------------------------------------------------------------//

  run() {
    background(this.bgColor);

    for (var i = this.particles.length - 1; i >= 0; i--) {
      var p = this.particles[i];
      p.run();

      if (
        p.isDead &&
        (p.pos.x < 0 || p.pos.x > WIDTH || p.pos.y < 0 || p.pos.y > HEIGHT)
      ) {
        this.particles.splice(i, 1);
      }
    }
  }

  //-------------------------------------------------------------------//

  addParticle(x, y) {
    var newParticle = new Particle();

    var pos = generateRandomPos(WIDTH / 2, HEIGHT / 2, (WIDTH + HEIGHT) / 2);
    var target = createVector(x, y);
    var maxSpeed = random(MIN_SPEED, MAX_SPEED);
    var maxForce = maxSpeed * MAX_FORCE_RATIO;

    var particleTheme;
    var particleColorIndex;
    var particleColor;

    if (this.theme < 3) {
      particleTheme = this.theme;

      particleColorIndex = 0;
      particleColor = WHITE;

      if (random(1) >= DOMINANT_COLOR_PROB_THEME) {
        particleColorIndex = int(random(2, 4));
        particleColor = COLORS[particleTheme][particleColorIndex - 1];
      }
    } else {
      particleTheme = int(random(this.theme));

      particleColorIndex = 1;
      particleColor = COLORS[particleTheme][0];

      if (random(1) >= DOMINANT_COLOR_PROB_COMBINED) {
        particleColorIndex = int(random(2, 4));
        particleColor = COLORS[particleTheme][particleColorIndex - 1];
      }
    }

    switch (particleTheme) {
      case CULTURE:
        newParticle = new Particle_Culture(
          pos,
          target,
          maxSpeed,
          maxForce,
          particleColorIndex,
          particleColor
        );
        break;

      case HERITAGE:
        newParticle = new Particle_Heritage(
          pos,
          target,
          maxSpeed,
          maxForce,
          particleColorIndex,
          particleColor
        );
        break;

      case INNOVATION:
        newParticle = new Particle_Innovation(
          pos,
          target,
          maxSpeed,
          maxForce,
          particleColorIndex,
          particleColor
        );
        break;
    }

    this.particles.push(newParticle);
  }

  //-------------------------------------------------------------------//

  killParticle(n) {
    var p = this.particles[n];
    p.kill();
  }

  //-------------------------------------------------------------------//

  destroySystem() {
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.killParticle(n);
    }
  }
}

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

function generateRandomPos(x, y, mag) {
  var randomDir = createVector(random(0, WIDTH), random(0, HEIGHT));

  var pos = createVector(x, y);
  pos.sub(randomDir);
  pos.normalize();
  pos.mult(mag);
  pos.add(x, y);

  return pos;
}
