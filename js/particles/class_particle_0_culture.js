var CULTURE_TYPES_OF_PARTICLE = 6;
var CULTURE_STROKE_AVAILABLE = [0, 1, 3];
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

class Particle_Culture extends Particle {
  constructor(
    pos_,
    target_,
    maxSpeed_,
    maxForce_,
    particleColorIndex_,
    particleColor_
  ) {
    super(
      pos_,
      target_,
      maxSpeed_,
      maxForce_,
      particleColorIndex_,
      particleColor_
    );

    this.typeOfParticle = int(random(CULTURE_TYPES_OF_PARTICLE));

    this.sizePow = int(random(0, 3));
    this.size = GRID_UNIT * pow(2, this.sizePow - 1);

    this.imgDirectory = PARTICLE_DIRECTORY.concat(
      "0_",
      this.typeOfParticle.toString(),
      "_",
      this.particleColorIndex.toString()
    );

    if (CULTURE_STROKE_AVAILABLE.includes(this.typeOfParticle)) {
      // stroke
      this.imgDirectory = this.imgDirectory.concat(
        "_",
        this.sizePow.toString()
      );

      this.posOffset = -GRID_UNIT / 10 / pow(2, this.sizePow + 1);
      this.scaleOffset = 1 + pow(2, -this.sizePow) / 10;
    } else {
      // fill
      this.posOffset = 0;
      this.scaleOffset = 1;
    }

    this.petal = loadImage(this.imgDirectory + ".png");
  }

  //-------------------------------------------------------------------//

  display() {
    push();

    translate(this.pos.x + GRID_UNIT / 2, this.pos.y + GRID_UNIT / 2);

    if (this.isRotated) {
      rotate(QUARTER_PI);
    }

    for (var i = 0; i < 4; i++) {
      switch (this.typeOfParticle) {
        case 5:
          this.drawCircle();
        case 0:
        case 1:
        case 2:
        case 3:
          this.drawDiagonalPetals();
          break;
        case 4:
          this.drawPetalsAndLines();
          break;
      }

      rotate(HALF_PI);
    }

    pop();
  }

  //-------------------------------------------------------------------//
  //-------------------------------------------------------------------//
  //-------------------------------------------------------------------//

  drawDiagonalPetals() {
    imageMode(CORNER);
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
        image(
          this.petal,

          this.posOffset,
          this.posOffset,

          scale * this.scaleOffset,
          scale * this.scaleOffset
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
      constrain(scale, 0, this.size / 2);

      if (scale > 0) {
        image(
          this.petal,

          map(this.progress, MAX_PROGRESS, MIN_PROGRESS, 0, this.size / 2) +
            this.posOffset,
          map(this.progress, MAX_PROGRESS, MIN_PROGRESS, 0, this.size / 2) +
            this.posOffset,

          scale * this.scaleOffset,
          scale * this.scaleOffset
        );
      }
    }
  }

  //-------------------------------------------------------------------//

  drawCircle() {
    ellipseMode(CENTER);
    noStroke();
    fill(this.particleColor);

    ellipse(
      0,
      0,
      map(this.progress, MAX_PROGRESS, MIN_PROGRESS, 0, this.size / 2),
      map(this.progress, MAX_PROGRESS, MIN_PROGRESS, 0, this.size / 2)
    );
  }

  //-------------------------------------------------------------------//

  drawPetalsAndLines() {
    imageMode(CENTER);

    noFill();
    stroke(this.particleColor);
    strokeWeight(STROKE_WEIGHT);

    if (this.progressIsPositive) {
      line(
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
        image(
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
      }
    } else {
      line(
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
        image(
          this.petal,

          0,
          map(this.progress, MAX_PROGRESS, MIN_PROGRESS, this.size / 4, 0),

          scale,
          scale
        );
      }
    }
  }
}
