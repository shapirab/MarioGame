export default class Game{
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    update(){}

    draw(ctx){
        ctx.drawImage(marioImg, 0, 0, 30, 40, 100, 100, 120, 160);
    }
}