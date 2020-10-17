var CULTURE = 0;
var HERITAGE = 1;
var INNOVATION = 2;
var COMMUNITY = 3;

//-------------------------------------------------------------------//

var WIDTH = 500;
var HEIGHT = 500;

var GRID_UNIT = 20;
var DOMINANT_COLOR_PROB_THEME = 0.85;
var DOMINANT_COLOR_PROB_COMBINED = 0.5;
var DENSITY = 0.9;

var NOISE_STEP = GRID_UNIT / 50;
var BLACK_THRESHOLD = 0.38;
var POSITIVE_THRESHOLD = 0.7;

//-------------------------------------------------------------------//

var MIN_SPEED = (WIDTH * 6) / 1500;
var MAX_SPEED = MIN_SPEED * 2;
var MAX_FORCE_RATIO = 0.025;

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
        this.bgColor = COLORS[theme][0];
        break;

      case COMMUNITY:
        this.bgColor = OFF_WHITE;
        break;
    }

    this.particles = [];

    this.coordsIndexes = [];
    this.initCoordsIndexes();
  }

  //-------------------------------------------------------------------//

  initCoordsIndexes() {
    noiseSeed(int(random(10000)));

    var noiseStep = NOISE_STEP;
    var xOffset, yOffset;

    yOffset = 0;
    for (var i = 0; i < WIDTH / GRID_UNIT; i++) {
      xOffset = 0;

      for (var j = 0; j < HEIGHT / GRID_UNIT; j++) {
        var x = int(i * GRID_UNIT);
        var y = int(j * GRID_UNIT);

        var r = noise(xOffset, yOffset);

        if (PARTICLE_MAP.get(x, y) == BLACK) {
          r += BLACK_THRESHOLD;
        }

        if (r >= POSITIVE_THRESHOLD) {
          if (random(1) <= DENSITY) {
            coordsIndexes.add(x + y * WIDTH);
          }
        }

        xOffset += noiseStep;
      }

      yOffset += noiseStep;
    }

    var particleCount = particles.size();
    var particleIndex = 0;

    while (coordsIndexes.size() > 0) {
      // Pick a random coordinate
      var randomIndex = int(random(0, coordsIndexes.size()));
      var coordIndex = coordsIndexes.get(randomIndex);
      coordsIndexes.remove(randomIndex);

      var x = coordIndex % WIDTH;
      var y = coordIndex / WIDTH;

      if (particleIndex < particleCount) {
        var p = particles.get(particleIndex);
        p.isDestroyed = false;

        p.target.x = x;
        p.target.y = y;

        particleIndex++;
      } else {
        this.addParticle(x, y);
      }
    }

    // Kill off any leftover particles
    if (particleIndex < particleCount) {
      for (var i = particleIndex; i < particleCount; i++) {
        var p = particles.get(i);
        p.destroy();
      }
    }
  }

  //-------------------------------------------------------------------//

  run() {
    for (var i = this.particles.length - 1; i >= 0; i--) {
      var p = this.particles[i];
      p.run();

      if (p.isDead) {
        this.particles.splice(i, 1);
      }
    }
  }

  //-------------------------------------------------------------------//

  addParticle(x, y) {
    var newParticle = new Particle();

    var pos = generateRandomPos(WIDTH / 2, HEIGHT / 2, (WIDTH + HEIGHT) / 2);
    var target = new PVector(x, y);
    var maxSpeed = random(MIN_SPEED, MAX_SPEED);
    var maxForce = newParticle.maxSpeed * MAX_FORCE_RATIO;

    var particleColor = COLORS[particleTheme][0];

    var particleTheme;
    if (theme < 3) {
      particleTheme = theme;
      if (random(1) >= DOMINANT_COLOR_PROB_THEME) {
        particleColor = COLORS[particleTheme][int(random(2))];
      }
    } else {
      particleTheme = int(random(theme));
      if (random(1) >= DOMINANT_COLOR_PROB_COMBINED) {
        particleColor = COLORS[particleTheme][int(random(2))];
      }
    }

    switch (particleTheme) {
      case CULTURE:
        newParticle = new Particle_Culture(
          pos,
          vel,
          acc,
          target,
          maxSpeed,
          maxForce,
          particleColor
        );
        break;

      case HERITAGE:
        newParticle = new Particle_Heritage(
          pos,
          vel,
          acc,
          target,
          maxSpeed,
          maxForce,
          particleColor
        );
        break;

      case INNOVATION:
        newParticle = new Particle_Innovation(
          pos,
          vel,
          acc,
          target,
          maxSpeed,
          maxForce,
          particleColor
        );
        break;
    }

    particles.add(newParticle);
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
