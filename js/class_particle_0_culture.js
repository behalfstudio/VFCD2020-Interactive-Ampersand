var CULTURE_TYPES_OF_PARTICLE = 6;
var CULTURE_SVG_BASE_SIZE = 25;

var CULTURE_SVG_DIRECTORY = "assets/svg/HANOI/";

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

class Particle_Culture extends Particle {
  constructor() {
    super();

    this.size = GRID_UNIT * pow(2, int(random(-1, 2)));

    this.typeOfParticle = int(random(CULTURE_TYPES_OF_PARTICLE));

    this.petal = loadShape(CULTURE_SVG_DIRECTORY + typeOfParticle + ".svg");
    this.petal.disableStyle();

    this.isStroke = int(random(2)) == 0;
    if (this.isStroke) {
      petal.setFill(false);
      petal.setStroke(this.particleColor);
    } else {
      petal.setStroke(false);
      petal.setFill(this.particleColor);
    }

    this.isRotated = int(random(2)) == 0;
  }

  //-------------------------------------------------------------------//

  display() {
    push();
    if (this.isStroke) {
      noFill();
      stroke(this.particleColor);
      strokeWeight(MAX_STROKE_WEIGHT);
    } else {
      noStroke();
      fill(this.particleColor);
    }

    translate(this.pos.x + GRID_UNIT / 2, this.pos.y + GRID_UNIT / 2);

    if (this.isRotated) {
      rotate(QUARTER_PI);
    }

    for (var i = 0; i < 4; i++) {
      switch (this.typeOfParticle) {
        case 2:
          drawPetalsAndLines();
          break;
        case 4:
          drawCircle();
        case 0:
        case 1:
        case 3:
        case 5:
          drawDiagonalPetals();
          break;
      }

      if (this.typeOfParticle == 2) {
      }

      rotate(HALF_PI);
    }
    pop();
  }

  //-------------------------------------------------------------------//
  //-------------------------------------------------------------------//
  //-------------------------------------------------------------------//

  drawDiagonalPetals() {
    shapeMode(CORNER);
    if (this.progressIsPositive) {
      var scale = map(
        this.progress,
        MIN_PROGRESS,
        MAX_PROGRESS,
        0,
        this.size / 2
      );
      constrain(scale, 0, this.size / 2);

      if (scale > 0) {
        if (this.isStroke) {
          strokeWeight((MAX_STROKE_WEIGHT * CULTURE_SVG_BASE_SIZE) / scale);
        }

        shape(
          this.petal,

          0,
          0,

          scale,
          scale
        );
      }
    } else {
      var scale = map(
        this.progress,
        MAX_PROGRESS,
        MIN_PROGRESS,
        this.size / 2,
        0
      );
      constrain(scale, 0, size / 2);

      if (scale > 0) {
        if (this.isStroke) {
          strokeWeight((MAX_STROKE_WEIGHT * CULTURE_SVG_BASE_SIZE) / scale);
        }

        shape(
          this.petal,

          map(this.progress, MAX_PROGRESS, MIN_PROGRESS, 0, this.size / 2),
          map(this.progress, MAX_PROGRESS, MIN_PROGRESS, 0, this.size / 2),

          scale,
          scale
        );
      }
    }
  }

  //-------------------------------------------------------------------//

  drawCircle() {
    ellipseMode(CENTER);
    strokeWeight(MAX_STROKE_WEIGHT);

    ellipse(
      0,
      0,
      map(this.progress, MAX_PROGRESS, MIN_PROGRESS, 0, this.size / 2),
      map(this.progress, MAX_PROGRESS, MIN_PROGRESS, 0, this.size / 2)
    );
  }

  //-------------------------------------------------------------------//

  drawPetalsAndLines() {
    FRAME.shapeMode(CENTER);

    if (progressIsPositive) {
      FRAME.noFill();
      FRAME.stroke(this.particleColor);
      FRAME.strokeWeight(STROKE_WEIGHT);
      FRAME.line(
        0,
        0,
        map(this.progress, MIN_PROGRESS, MAX_PROGRESS, 0, this.size / 2),
        map(this.progress, MIN_PROGRESS, MAX_PROGRESS, 0, this.size / 2)
      );

      var scale = map(
        this.progress,
        MIN_PROGRESS,
        MAX_PROGRESS,
        0,
        this.size / 2
      );
      constrain(scale, 0, this.size / 2);

      if (scale > 0) {
        if (this.isStroke) {
          FRAME.strokeCap(ROUND);
          FRAME.strokeWeight((STROKE_WEIGHT * CULTURE_SVG_BASE_SIZE) / scale);
        } else {
          FRAME.noStroke();
          FRAME.fill(this.particleColor);
        }

        FRAME.shape(
          this.petal,

          0,
          map(
            this.progress,
            MIN_PROGRESS,
            MAX_PROGRESS,
            this.size / 2,
            this.size / 4
          ),

          scale,
          scale
        );

        FRAME.strokeCap(SQUARE);
      }
    } else {
      FRAME.noFill();
      FRAME.stroke(this.particleColor);
      FRAME.strokeWeight(STROKE_WEIGHT);
      FRAME.line(
        map(this.progress, MAX_PROGRESS, MIN_PROGRESS, 0, this.size / 2),
        map(this.progress, MAX_PROGRESS, MIN_PROGRESS, 0, this.size / 2),
        this.size / 2,
        this.size / 2
      );

      var scale = map(
        this.progress,
        MAX_PROGRESS,
        MIN_PROGRESS,
        this.size / 2,
        0
      );
      constrain(scale, 0, this.size / 2);

      if (scale > 0) {
        if (this.isStroke) {
          FRAME.strokeCap(ROUND);
          FRAME.strokeWeight((STROKE_WEIGHT * CULTURE_SVG_BASE_SIZE) / scale);
        } else {
          FRAME.noStroke();
          FRAME.fill(this.particleColor);
        }

        FRAME.shape(
          this.petal,

          0,
          map(this.progress, MAX_PROGRESS, MIN_PROGRESS, this.size / 4, 0),

          scale,
          scale
        );

        FRAME.strokeCap(SQUARE);
      }
    }
  }
}
