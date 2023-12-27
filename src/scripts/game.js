import Hero from "./models/hero.js";

export default class Game{
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.hero = new Hero(canvasWidth, canvasHeight);
    }

    update(deltaTime){
        this.hero.update(deltaTime);
    }

    draw(ctx){
        this.hero.draw(ctx);
    }
}