import Hero from "./models/hero.js";
import Ramp from "./models/ramp.js";

export default class Game{
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.hero = new Hero(canvasWidth, canvasHeight);
        this.ramp = new Ramp(canvasWidth, canvasHeight);
    }

    update(deltaTime){
        this.hero.update(deltaTime);
        this.ramp.update(deltaTime);
    }

    draw(ctx){
        this.hero.draw(ctx);
        this.ramp.draw(ctx);
    }
}