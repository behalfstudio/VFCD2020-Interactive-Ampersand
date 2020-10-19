var CULTURE_TYPES_OF_PARTICLE = 6;

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

class Particle_Culture extends Particle {
  constructor() {
    super();

    this.typeOfParticle = int(random(CULTURE_TYPES_OF_PARTICLE));

    this.sizePow = int(random(0, 3));
    this.size = GRID_UNIT * pow(2, this.sizePow - 1);

    this.imgDirectory = PARTICLE_DIRECTORY.concat(
      "0_",
      this.typeOfParticle.toString(),
      "_",
      this.particleColorIndex.toString()
    );

    this.isStroke = int(random(2)) == 0;
    if (this.isStroke) {
      this.imgDirectory = this.imgDirectory.concat(
        "_",
        this.sizePow.toString()
      );

      this.posOffset = -GRID_UNIT / 10 / pow(2, this.sizePow + 1);
      this.scaleOffset = 1 + pow(2, this.sizePow) / 10;
    } else {
      this.posOffset = 0;
      this.scaleOffset = 0;
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
      constrain(scale, 0, size / 2);

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
    imageMode(CENTER);

    noFill();
    stroke(this.particleColor);
    strokeWeight(STROKE_WEIGHT);

    if (progressIsPositive) {
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
