export default class Hero{
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        
        //this determains the frequency of changing of frames, thus
        //extablishing the running pace
        this.framesPerSecond = 10;
        this.frameInterval = 1000 / this.framesPerSecond;
        this.frameTimer = 0;

        this.imageCounter = 1;
        this.maxImages = 8;
        this.imageName = `marioImg_${this.imageCounter}`;

        this.sizeFactor = 2.5;
        this.width = 641;
        this.height = 542;
       
        this.ground = this.canvasHeight - (this.height / this.sizeFactor);
        this.position = {
            x: 100,
            y: this.ground
        }
    }

    onGround(){
        return this.position.y === this.ground;
    }

    update(deltaTime){
        if(this.frameTimer > this.frameInterval){
            if(this.imageCounter >= this.maxImages){
                this.imageCounter = 1;
            }
            else{
                this.imageCounter++;
            }
            this.frameTimer = 0;
        }
        else{
            this.frameTimer += deltaTime;
        }
        
        this.image = new Image();
        this.image.src = `../images/hero/Adventure Girl/png/Run (${this.imageCounter}).png`;
        this.image.width = this.width / this.sizeFactor;
        this.image.height = this.height / this.sizeFactor;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.image.width, this.image.height);
    }
}