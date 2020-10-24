var MAX_PROGRESS = 1;
var MIN_PROGRESS = 0;
var MIN_PROGRESS_STEP = 0.02;
var MAX_PROGRESS_STEP = 0.05;

//-------------------------------------------------------------------//
//-------------------------------------------------------------------//
//-------------------------------------------------------------------//

class Particle {
  constructor(
    pos_,
    target_,
    maxSpeed_,
    maxForce_,
    particleColorIndex_,
    particleColor_
  ) {
    this.pos = pos_;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.target = target_;
    this.closeEnoughTarget = CLOSE_ENOUGH_TARGET;

    this.maxSpeed = maxSpeed_;
    this.maxForce = maxForce_;

    this.particleColorIndex = particleColorIndex_;
    this.particleColor = particleColor_;

    this.isDead = false;

    this.progress = int(random(MIN_PROGRESS * 100, MAX_PROGRESS * 100)) / 100.0;
    this.progressIsPositive = int(random(2)) == 0;
    this.progressStep = random(MIN_PROGRESS_STEP, MAX_PROGRESS_STEP);
  }

  //-------------------------------------------------------------------//

  run() {
    this.makeProgress();
    this.update();
    this.display();
  }

  //-------------------------------------------------------------------//

  makeProgress() {
    if (this.progressIsPositive) {
      this.progress += this.progressStep;
      if (this.progress >= MAX_PROGRESS) {
        this.progressIsPositive = false;
      }
    } else {
      this.progress -= this.progressStep;
      if (this.progress <= MIN_PROGRESS) {
        this.progressIsPositive = true;
      }
    }

    constrain(this.progress, MIN_PROGRESS, MIN_PROGRESS);
  }

  //-------------------------------------------------------------------//

  update() {
    // Check if particle is close enough to its target to slow down
    var proximityMult = 1.0;
    var distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget;
    }

    // Add force towards target
    var towardsTarget = createVector(this.target.x, this.target.y);
    towardsTarget.sub(this.pos);
    towardsTarget.normalize();
    towardsTarget.mult(this.maxSpeed * proximityMult);

    var steer = createVector(towardsTarget.x, towardsTarget.y);
    steer.sub(this.vel);
    steer.normalize();
    steer.mult(this.maxForce);
    this.acc.add(steer);

    // Move particle
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  //-------------------------------------------------------------------//

  display() {}

  //-------------------------------------------------------------------//

  kill() {
    if (!this.isDead) {
      // Set its target outside the scene
      this.target = generateRandomPos(
        WIDTH / 2,
        HEIGHT / 2,
        (WIDTH + HEIGHT) / 2
      );
      this.isDead = true;
    }
  }

  //-------------------------------------------------------------------//

  applyForce(x, y) {
    var force =
      BASE_FORCE +
      random(-BASE_FORCE / 2, BASE_FORCE / 2) -
      dist(this.pos.x, this.pos.y, x, y);

    if (force > 0) {
      var angle = atan2(this.pos.x - x, this.pos.y - y);
      this.vel.x += force * sin(angle);
      this.vel.y += force * cos(angle);
    }
  }
}
