export default class Ramp{
    constructor(canvasWidth, canvasHeight, player){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.player = player;

        this.width = 800;
        this.height = 438;
        this.sizeFactor = 2;

        this.randomHeight = this.getRandomHeight();

        this.position = {
            x: this.canvasWidth,
            y: this.randomHeight
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.framesPerSecond = 130;
        this.frameInterval = 1000 / this.framesPerSecond;
        this.frameTimer = 0;

        this.setPositionY();
    }

    update(deltaTime){       
        // if(this.frameTimer > this.frameInterval){
        //     if(this.position.x < 0 - this.width / this.sizeFactor){
        //         this.setPositionY();
        //         this.position.x = this.canvasWidth;                                             
        //     }
        //     else{
        //         this.position.x -= deltaTime;
        //     }
        //     this.frameTimer = 0;
        // }
        // else{
        //     this.frameTimer += deltaTime;
        // }
        this.position.x += this.velocity.x;
        if(this.position.x < -this.width){
            this.setPositionY();
            this.position.x = this.canvasWidth;
        }
    }

    draw(ctx){
        ctx.drawImage(cloudImg, this.position.x, this.position.y, 
            this.width / this.sizeFactor, this.height / this.sizeFactor);
    }

    setPositionY(){
        this.randomHeight = this.getRandomHeight();
        this.position.y = this.randomHeight;
    }

    getRandomHeight(){
        let minHeight = 50;
        //this is the location of the player top
        let maxHeight = this.canvasHeight - this.height;
        //Math.floor(Math.random() * (max - min + 1) + min)
        return Math.random() * (maxHeight - minHeight + 1) + minHeight;
    }
}