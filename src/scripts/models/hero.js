import {
  JumpingRight,
  RunningRight,
  Slide,
  StandingRight,
} from "../state.js";

export default class Hero {
  constructor(game, canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.game = game;

    //this determains the frequency of changing of frames, thus
    //extablishing the running pace
    this.framesPerSecond = 10;
    this.frameInterval = 1000 / this.framesPerSecond;
    this.frameTimer = 0;

    this.imageCounter = 1;
    this.maxImages = 8;
    this.imageName = `marioImg_${this.imageCounter}`;

    this.maxStandingImages = 10;

    this.width = 215;
    this.height = 225;

    this.ground = this.canvasHeight - this.height;
    this.position = {
      x: 100,
      y: this.ground,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.gravity = 1;
    this.maxJump = 10;
    this.maxSpeed = 10;

    this.states = [
      new StandingRight(this),
      new RunningRight(this),
      new JumpingRight(this),
      new Slide(this)
    ];
    this.currentState = this.states[0];
    this.currentState.enter();

    this.hatHeightFactor = 0;
    this.hatYFactor = 0;
    this.bodyXFactor = 0;
    this.feetFactor = 0;
  }

  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.speed = speed * this.game.maxSpeed;
    this.currentState.enter();
  }

  onGround() {
    return this.position.y === this.ground;
  }

  jump() {
    this.position.y += this.velocity.y;

    if(!this.onGround()){
        this.velocity.y += this.gravity;
    }
    else{
        this.velocity.y = 0;
    }
  }

  update(deltaTime, input) {
    this.currentState.handleInputs(input);
    this.currentState.enter();
    if (this.frameTimer > this.frameInterval) {
      if (this.imageCounter >= this.maxImages) {
        this.imageCounter = 1;
      } else {
        this.imageCounter++;
      }
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }

    this.jump();
    this.position.x += this.velocity.x;
  }

  draw(ctx) {
    let factor = 0;
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    if(this.game.isDebug){
      //hat
      ctx.strokeRect(this.position.x, this.position.y + 50, this.width, this.height - 200);
      //core
      ctx.strokeRect(this.position.x + 50, this.position.y, this.width - 100, this.height);
      //feet
      ctx.strokeRect(this.position.x, this.position.y + 200, this.width, this.height - 200);
      // ctx.arc(this.position.x + this.width / 2, this.position.y + this.height / 2, 
      //   this.width / 2 - factor, 0, 2 *Math.PI, false);
      // ctx.stroke();
    }
  }
}
