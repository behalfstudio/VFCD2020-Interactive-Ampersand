var HERITAGE_TYPES_OF_PARTICLE = 6;

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

class Particle_Heritage extends Particle {
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

    this.typeOfParticle = int(random(HERITAGE_TYPES_OF_PARTICLE));

    this.isRotated = int(random(2)) == 0;

    this.size = GRID_UNIT;
    switch (this.typeOfParticle) {
      case 0:
      case 2:
      case 3:
      case 4:
      case 5:
        this.size *= 1.5;
    }

    if (this.typeOfParticle == 5) {
      this.s = loadImage(
        PARTICLE_DIRECTORY +
          "1_" +
          this.typeOfParticle +
          "_" +
          this.particleColorIndex +
          ".png"
      );
    }
  }

  //-------------------------------------------------------------------//

  display() {
    push();

    translate(this.pos.x + GRID_UNIT / 2, this.pos.y + GRID_UNIT / 2);

    if (this.isRotated) {
      rotate(HALF_PI);
    }

    for (var i = 0; i < 2; i++) {
      switch (this.typeOfParticle) {
        case 0:
          this.drawStrokeCircles();
          break;
        case 1:
          this.drawStrokeDualDiamonds();
          break;
        case 2:
          this.drawStrokeLineCircle();
          break;
        case 3:
          this.drawFillDiamond();
          break;
        case 4:
          this.drawFillHexagon();
          break;
        case 5:
          this.drawFillFlower();
          break;
      }

      rotate(PI);
    }

    pop();
  }

  //-------------------------------------------------------------------//
  //-------------------------------------------------------------------//
  //-------------------------------------------------------------------//

  drawStrokeCircles() {
    var componentWidth = this.size / 2;

    var offset;
    if (this.progressIsPositive) {
      offset = map(
        this.progress,
        MIN_PROGRESS,
        MAX_PROGRESS,
        0,
        this.size - componentWidth
      );
    } else {
      offset = map(
        this.progress,
        MAX_PROGRESS,
        MIN_PROGRESS,
        0,
        this.size - componentWidth
      );
    }

    ellipseMode(CENTER);

    stroke(this.particleColor);
    strokeWeight(STROKE_WEIGHT);
    noFill();

    ellipse(
      -(this.size - componentWidth) / 2 + offset,
      0,
      componentWidth,
      componentWidth
    );
  }

  //-------------------------------------------------------------------//

  drawStrokeDualDiamonds() {
    var componentWidth = (this.size * 2) / 3;

    var offset;
    if (this.progressIsPositive) {
      offset = map(
        this.progress,
        MIN_PROGRESS,
        MAX_PROGRESS,
        -this.size / 6,
        this.size - componentWidth + this.size / 6
      );
    } else {
      offset = map(
        this.progress,
        MAX_PROGRESS,
        MIN_PROGRESS,
        -this.size / 6,
        this.size - componentWidth + this.size / 6
      );
    }

    stroke(this.particleColor);
    strokeWeight(STROKE_WEIGHT);
    noFill();

    beginShape();
    vertex(-this.size / 2 + offset, -this.size / 6);
    vertex(-this.size / 6 + offset, -this.size / 2);
    vertex(this.size / 6 + offset, -this.size / 6);
    vertex(-this.size / 6 + offset, this.size / 6);
    endShape(CLOSE);

    beginShape();
    vertex(-this.size / 2 + offset, this.size / 6);
    vertex(-this.size / 6 + offset, -this.size / 6);
    vertex(this.size / 6 + offset, this.size / 6);
    vertex(-this.size / 6 + offset, this.size / 2);
    endShape(CLOSE);
  }

  //-------------------------------------------------------------------//

  drawStrokeLineCircle() {
    var componentWidth = this.size / 2;

    var offset;
    if (this.progressIsPositive) {
      offset = map(
        this.progress,
        MIN_PROGRESS,
        MAX_PROGRESS,
        -this.size / 8,
        this.size - componentWidth + this.size / 8
      );
    } else {
      offset = map(
        this.progress,
        MAX_PROGRESS,
        MIN_PROGRESS,
        -this.size / 8,
        this.size - componentWidth + this.size / 8
      );
    }

    ellipseMode(CENTER);

    stroke(this.particleColor);
    strokeWeight(STROKE_WEIGHT);
    noFill();

    line(-this.size / 2 + offset, -this.size / 4, offset, -this.size / 4);
    line(-this.size / 2 + offset, this.size / 4, offset, this.size / 4);
    ellipse(-this.size / 4 + offset, 0, this.size / 4, this.size / 4);
  }

  //-------------------------------------------------------------------//

  drawFillDiamond() {
    var componentWidth = this.size / 2;

    var offset;
    if (this.progressIsPositive) {
      offset = map(
        this.progress,
        MIN_PROGRESS,
        MAX_PROGRESS,
        0,
        this.size - componentWidth
      );
    } else {
      offset = map(
        this.progress,
        MAX_PROGRESS,
        MIN_PROGRESS,
        0,
        this.size - componentWidth
      );
    }

    fill(this.particleColor);
    noStroke();

    beginShape();
    vertex(-this.size / 2 + offset, 0);
    vertex(-(this.size - componentWidth) / 2 + offset, -this.size / 3);
    vertex(-this.size / 2 + componentWidth + offset, 0);
    vertex(-(this.size - componentWidth) / 2 + offset, this.size / 3);
    endShape(CLOSE);
  }

  //-------------------------------------------------------------------//

  drawFillHexagon() {
    var componentWidth = this.size / 2;

    var offset;
    if (this.progressIsPositive) {
      offset = map(
        this.progress,
        MIN_PROGRESS,
        MAX_PROGRESS,
        0,
        this.size - componentWidth
      );
    } else {
      offset = map(
        this.progress,
        MAX_PROGRESS,
        MIN_PROGRESS,
        0,
        this.size - componentWidth
      );
    }

    fill(this.particleColor);
    noStroke();

    beginShape();
    vertex(-this.size / 2 + offset, -this.size / 6);
    vertex(-this.size / 4 + offset, -this.size / 3);
    vertex(offset, -this.size / 6);
    vertex(offset, this.size / 6);
    vertex(-this.size / 4 + offset, this.size / 3);
    vertex(-this.size / 2 + offset, this.size / 6);
    endShape(CLOSE);
  }

  //-------------------------------------------------------------------//

  drawFillFlower() {
    var componentWidth = this.size / 2;

    var offset;
    if (this.progressIsPositive) {
      offset = map(
        this.progress,
        MIN_PROGRESS,
        MAX_PROGRESS,
        0,
        this.size - componentWidth
      );
    } else {
      offset = map(
        this.progress,
        MAX_PROGRESS,
        MIN_PROGRESS,
        0,
        this.size - componentWidth
      );
    }

    imageMode(CENTER);

    noStroke();
    fill(this.particleColor);

    image(
      this.s,

      -(this.size - componentWidth) / 2 + offset,
      -0,

      componentWidth,
      (this.size * 4) / 5
    );
  }
}
