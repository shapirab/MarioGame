export default class Ramp{
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.position = {
            x: this.canvasWidth,
            y: 200
        }
        this.width = 800;
        this.height = 438;
        this.sizeFactor = 2;

        this.framesPerSecond = 130;
        this.frameInterval = 1000 / this.framesPerSecond;
        this.frameTimer = 0;
    }

    update(deltaTime){
        if(this.frameTimer > this.frameInterval){
            if(this.position.x < 0 - this.width / this.sizeFactor){
                this.position.x = this.canvasWidth;
            }
            else{
                this.position.x -= deltaTime;
            }
            this.frameTimer = 0;
        }
        else{
            this.frameTimer += deltaTime;
        }
    }

    draw(ctx){
        ctx.drawImage(cloudImg, this.position.x, this.position.y, 
            this.width / this.sizeFactor, this.height / this.sizeFactor);
    }
}