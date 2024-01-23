import Hero from "./models/hero.js";
import Ramp from "./models/ramp.js";
import Input from "./input.js";

export default class Game {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.hero = new Hero(canvasWidth, canvasHeight);
    this.ramp = new Ramp(canvasWidth, canvasHeight, this.hero);
    this.input = new Input();
    this.verticalSpeedConstant = 5;
    this.maxVerticalWidth = 400;
  }

  update(deltaTime) {
    this.hero.update(deltaTime);
    this.ramp.update(deltaTime);

    if (this.input.keys.right.pressed) {
        if (this.hero.position.x < this.maxVerticalWidth) {
            this.hero.velocity.x = this.verticalSpeedConstant;
        }
        else{
            this.hero.velocity.x = 0;
            this.ramp.velocity.x = -this.verticalSpeedConstant;
        }

    } else if (this.input.keys.left.pressed) {
        if (this.hero.position.x > 0) {
            this.hero.velocity.x = -this.verticalSpeedConstant;
        }
        else{
            this.hero.velocity.x = 0;
        }

    } else {
        this.hero.velocity.x = 0;
        this.ramp.velocity.x = 0;
    }

    if (this.input.keys.up.pressed) {
      console.log("jumping up");
    }
    if (this.input.keys.down.pressed) {
      console.log("sitting down");
    }
  }

  draw(ctx) {
    this.hero.draw(ctx);
    this.ramp.draw(ctx);
  }
}
