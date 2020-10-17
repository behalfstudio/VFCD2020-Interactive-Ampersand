var HERITAGE_TYPES_OF_PARTICLE = 6;

var HERITAGE_SVG_DIRECTORY = "assets/svg/HUE/";

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

class Particle_Heritage extends Particle {
  constructor() {
    super();

    this.typeOfParticle = int(random(HERITAGE_TYPES_OF_PARTICLE));

    this.isRotated = int(random(2)) == 0;

    this.size = GRID_UNIT;
    switch (typeOfParticle) {
      case 0:
      case 2:
      case 3:
      case 4:
      case 5:
        this.size *= 1.5;
    }

    if (typeOfParticle == 5) {
      this.s = loadShape(svgDirectory + typeOfParticle + ".svg");
      this.s.disableStyle();
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
      switch (typeOfParticle) {
        case 0:
          drawStrokeCircles();
          break;
        case 1:
          drawStrokeDualDiamonds();
          break;
        case 2:
          drawStrokeLineCircle();
          break;
        case 3:
          drawFillDiamond();
          break;
        case 4:
          drawFillHexagon();
          break;
        case 5:
          drawFillFlower();
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

    shapeMode(CENTER);

    noStroke();
    fill(this.particleColor);

    shape(
      s,

      -(this.size - componentWidth) / 2 + offset,
      -0,

      componentWidth,
      (this.size * 4) / 5
    );
  }
}
