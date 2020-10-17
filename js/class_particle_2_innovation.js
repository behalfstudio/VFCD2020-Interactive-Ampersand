var INNOVATION_MAX_DOT_GRID_SIZE = GRID_UNIT / 2;
var INNOVATION_TYPES_OF_PARTICLE = 6;

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

class Particle_Innovation extends Particle {
  constructor() {
    super();

    var isFlipped = int(random(2)) == 0;
    var flip = isFlipped ? GRID_UNIT : 0;

    var typeOfParticle = int(random(INNOVATION_TYPES_OF_PARTICLE));
  }

  //-------------------------------------------------------------------//

  display() {
    push();
    translate(this.pos.x + GRID_UNIT / 2, this.pos.y + GRID_UNIT / 2);

    switch (this.typeOfParticle) {
      case 0:
        drawSingleLine();
        break;
      case 1:
        draw3Lines();
        break;
      case 2:
        drawArrowLine();
        break;
      case 3:
        drawTriangle();
        break;
      case 4:
        drawCrystal();
        break;
      case 5:
        drawSquare();
        break;
    }

    drawDotGrid();
    pop();
  }

  //-------------------------------------------------------------------//
  //-------------------------------------------------------------------//
  //-------------------------------------------------------------------//

  drawDotGrid() {
    rectMode(CENTER);

    fill(this.particleColor);
    noStroke();

    rect(
      GRID_UNIT / 2 - this.flip,
      -GRID_UNIT / 2,
      map(
        this.progress,
        MAX_PROGRESS,
        MIN_PROGRESS,
        0,
        INNOVATION_MAX_DOT_GRID_SIZE
      ),
      map(
        this.progress,
        MAX_PROGRESS,
        MIN_PROGRESS,
        0,
        INNOVATION_MAX_DOT_GRID_SIZE
      )
    );
  }

  //-------------------------------------------------------------------//

  drawSingleLine() {
    noFill();
    stroke(this.particleColor);
    strokeWeight(STROKE_WEIGHT);

    if (this.progressIsPositive) {
      line(
        -GRID_UNIT / 2 + this.flip,
        GRID_UNIT / 2,
        map(
          this.progress,
          MIN_PROGRESS,
          MAX_PROGRESS,
          -GRID_UNIT / 2 + this.flip,
          GRID_UNIT / 2 - this.flip
        ),
        map(
          this.progress,
          MIN_PROGRESS,
          MAX_PROGRESS,
          GRID_UNIT / 2,
          -GRID_UNIT / 2
        )
      );
    } else {
      line(
        map(
          this.progress,
          MAX_PROGRESS,
          MIN_PROGRESS,
          -GRID_UNIT / 2 + this.flip,
          GRID_UNIT / 2 - this.flip
        ),
        map(
          this.progress,
          MAX_PROGRESS,
          MIN_PROGRESS,
          GRID_UNIT / 2,
          -GRID_UNIT / 2
        ),
        GRID_UNIT / 2 - this.flip,
        -GRID_UNIT / 2
      );
    }
  }

  //-------------------------------------------------------------------//

  draw3Lines() {
    noFill();
    stroke(this.particleColor);
    strokeWeight(STROKE_WEIGHT);

    if (this.progressIsPositive) {
      line(
        -GRID_UNIT / 2 + this.flip,
        GRID_UNIT / 2,
        map(
          this.progress,
          MIN_PROGRESS,
          MAX_PROGRESS,
          -GRID_UNIT / 2 + this.flip,
          GRID_UNIT / 2 - this.flip
        ),
        map(
          this.progress,
          MIN_PROGRESS,
          MAX_PROGRESS,
          GRID_UNIT / 2,
          -GRID_UNIT / 2
        )
      );

      line(
        0,
        GRID_UNIT / 2,
        map(
          this.progress,
          MIN_PROGRESS,
          MAX_PROGRESS,
          0,
          GRID_UNIT / 2 - this.flip
        ),
        map(this.progress, MIN_PROGRESS, MAX_PROGRESS, GRID_UNIT / 2, 0)
      );

      line(
        -GRID_UNIT / 2 + this.flip,
        0,
        map(
          this.progress,
          MIN_PROGRESS,
          MAX_PROGRESS,
          -GRID_UNIT / 2 + this.flip,
          0
        ),
        map(this.progress, MIN_PROGRESS, MAX_PROGRESS, 0, -GRID_UNIT / 2)
      );
    } else {
      line(
        map(
          this.progress,
          MAX_PROGRESS,
          MIN_PROGRESS,
          -GRID_UNIT / 2 + this.flip,
          GRID_UNIT / 2 - this.flip
        ),
        map(
          this.progress,
          MAX_PROGRESS,
          MIN_PROGRESS,
          GRID_UNIT / 2,
          -GRID_UNIT / 2
        ),
        GRID_UNIT / 2 - this.flip,
        -GRID_UNIT / 2
      );

      line(
        map(
          this.progress,
          MAX_PROGRESS,
          MIN_PROGRESS,
          -GRID_UNIT / 2 + this.flip,
          0
        ),
        map(this.progress, MAX_PROGRESS, MIN_PROGRESS, 0, -GRID_UNIT / 2),
        0,
        -GRID_UNIT / 2
      );

      line(
        map(
          this.progress,
          MAX_PROGRESS,
          MIN_PROGRESS,
          0,
          GRID_UNIT / 2 - this.flip
        ),
        map(this.progress, MAX_PROGRESS, MIN_PROGRESS, GRID_UNIT / 2, 0),
        GRID_UNIT / 2 - this.flip,
        0
      );
    }
  }

  //-------------------------------------------------------------------//

  drawArrowLine() {
    noFill();
    stroke(this.particleColor);
    strokeWeight(STROKE_WEIGHT);

    if (this.progressIsPositive) {
      line(
        -GRID_UNIT / 2 + this.flip,
        GRID_UNIT / 2,
        map(
          this.progress,
          MIN_PROGRESS,
          MAX_PROGRESS,
          -GRID_UNIT / 2 + this.flip,
          GRID_UNIT / 2 - this.flip
        ),
        map(
          this.progress,
          MIN_PROGRESS,
          MAX_PROGRESS,
          GRID_UNIT / 2,
          -GRID_UNIT / 2
        )
      );

      line(
        -GRID_UNIT / 2 + this.flip,
        -GRID_UNIT / 2,
        map(
          this.progress,
          MIN_PROGRESS,
          MAX_PROGRESS,
          -GRID_UNIT / 2 + this.flip,
          GRID_UNIT / 2 - this.flip
        ),
        -GRID_UNIT / 2
      );

      line(
        GRID_UNIT / 2 - this.flip,
        GRID_UNIT / 2,
        GRID_UNIT / 2 - this.flip,
        map(
          this.progress,
          MIN_PROGRESS,
          MAX_PROGRESS,
          GRID_UNIT / 2,
          -GRID_UNIT / 2
        )
      );
    } else {
      line(
        map(
          this.progress,
          MAX_PROGRESS,
          MIN_PROGRESS,
          -GRID_UNIT / 2 + this.flip,
          GRID_UNIT / 2 - this.flip
        ),
        map(
          this.progress,
          MAX_PROGRESS,
          MIN_PROGRESS,
          GRID_UNIT / 2,
          -GRID_UNIT / 2
        ),
        GRID_UNIT / 2 - this.flip,
        -GRID_UNIT / 2
      );

      line(
        map(
          this.progress,
          MAX_PROGRESS,
          MIN_PROGRESS,
          -GRID_UNIT / 2 + this.flip,
          GRID_UNIT / 2 - this.flip
        ),
        -GRID_UNIT / 2,
        GRID_UNIT / 2 - this.flip,
        -GRID_UNIT / 2
      );

      line(
        GRID_UNIT / 2 - this.flip,
        map(
          this.progress,
          MAX_PROGRESS,
          MIN_PROGRESS,
          GRID_UNIT / 2,
          -GRID_UNIT / 2
        ),
        GRID_UNIT / 2 - this.flip,
        -GRID_UNIT / 2
      );
    }
  }

  //-------------------------------------------------------------------//

  drawTriangle() {
    fill(this.particleColor);
    noStroke();

    beginShape();

    if (this.progressIsPositive) {
      vertex(-GRID_UNIT / 2 + this.flip, -GRID_UNIT / 2);
      vertex(
        map(
          this.progress,
          MIN_PROGRESS,
          MAX_PROGRESS,
          -GRID_UNIT / 2 + this.flip,
          GRID_UNIT / 2 - this.flip
        ),
        -GRID_UNIT / 2
      );
      vertex(
        GRID_UNIT / 2 - this.flip,
        map(
          this.progress,
          MIN_PROGRESS,
          MAX_PROGRESS,
          GRID_UNIT / 2,
          -GRID_UNIT / 2
        )
      );
      vertex(GRID_UNIT / 2 - this.flip, GRID_UNIT / 2);
    } else {
      vertex(
        map(
          this.progress,
          MAX_PROGRESS,
          MIN_PROGRESS,
          -GRID_UNIT / 2 + this.flip,
          GRID_UNIT / 2 - this.flip
        ),
        -GRID_UNIT / 2
      );
      vertex(GRID_UNIT / 2 - this.flip, -GRID_UNIT / 2);
      vertex(
        GRID_UNIT / 2 - this.flip,
        map(
          this.progress,
          MAX_PROGRESS,
          MIN_PROGRESS,
          GRID_UNIT / 2,
          -GRID_UNIT / 2
        )
      );
    }

    endShape(CLOSE);
  }

  //-------------------------------------------------------------------//

  drawCrystal() {
    fill(this.particleColor);
    noStroke();

    beginShape();

    if (this.progressIsPositive) {
      vertex(-GRID_UNIT / 2 + this.flip, GRID_UNIT / 2);
      vertex(
        -GRID_UNIT / 2 + this.flip,
        map(
          this.progress,
          MIN_PROGRESS,
          MAX_PROGRESS,
          GRID_UNIT / 2,
          -GRID_UNIT / 2
        )
      );
      vertex(
        map(
          this.progress,
          MIN_PROGRESS,
          MAX_PROGRESS,
          GRID_UNIT / 2 - this.flip,
          -GRID_UNIT / 2 + this.flip
        ),
        -GRID_UNIT / 2
      );
      vertex(GRID_UNIT / 2 - this.flip, -GRID_UNIT / 2);
      vertex(
        GRID_UNIT / 2 - this.flip,
        map(
          this.progress,
          MIN_PROGRESS,
          MAX_PROGRESS,
          -GRID_UNIT / 2,
          GRID_UNIT / 2
        )
      );
      vertex(
        map(
          this.progress,
          MIN_PROGRESS,
          MAX_PROGRESS,
          -GRID_UNIT / 2 + this.flip,
          GRID_UNIT / 2 - this.flip
        ),
        GRID_UNIT / 2
      );
    } else {
      vertex(-GRID_UNIT / 2 + this.flip, -GRID_UNIT / 2);
      vertex(
        map(
          this.progress,
          MAX_PROGRESS,
          MIN_PROGRESS,
          GRID_UNIT / 2 - this.flip,
          -GRID_UNIT / 2 + this.flip
        ),
        -GRID_UNIT / 2
      );
      vertex(
        GRID_UNIT / 2 - this.flip,
        map(
          this.progress,
          MAX_PROGRESS,
          MIN_PROGRESS,
          -GRID_UNIT / 2,
          GRID_UNIT / 2
        )
      );
      vertex(GRID_UNIT / 2 - this.flip, GRID_UNIT / 2);
      vertex(
        map(
          this.progress,
          MAX_PROGRESS,
          MIN_PROGRESS,
          -GRID_UNIT / 2 + this.flip,
          GRID_UNIT / 2 - this.flip
        ),
        GRID_UNIT / 2
      );
      vertex(
        -GRID_UNIT / 2 + this.flip,
        map(
          this.progress,
          MAX_PROGRESS,
          MIN_PROGRESS,
          GRID_UNIT / 2,
          -GRID_UNIT / 2
        )
      );
    }

    endShape(CLOSE);
  }

  //-------------------------------------------------------------------//

  drawSquare() {
    rectMode(CENTER);

    fill(this.particleColor);
    noStroke();

    if (this.progressIsPositive) {
      rect(
        map(
          this.progress,
          MIN_PROGRESS,
          MAX_PROGRESS,
          -GRID_UNIT / 2 + this.flip,
          0
        ),
        map(this.progress, MIN_PROGRESS, MAX_PROGRESS, GRID_UNIT / 2, 0),
        map(this.progress, MIN_PROGRESS, MAX_PROGRESS, 0, GRID_UNIT),
        map(this.progress, MIN_PROGRESS, MAX_PROGRESS, 0, GRID_UNIT)
      );
    } else {
      rect(
        map(
          this.progress,
          MAX_PROGRESS,
          MIN_PROGRESS,
          0,
          GRID_UNIT / 2 - this.flip
        ),
        map(this.progress, MAX_PROGRESS, MIN_PROGRESS, 0, -GRID_UNIT / 2),
        map(this.progress, MAX_PROGRESS, MIN_PROGRESS, GRID_UNIT, 0),
        map(this.progress, MAX_PROGRESS, MIN_PROGRESS, GRID_UNIT, 0)
      );
    }
  }
}
