export default class Hero{
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.heroWidth = 200;
        this.heroHeight = 200;
      
        this.frameX = 0;
        
        this.framesPerSecond = 10;
        this.frameInterval = 1000 / this.framesPerSecond;
        this.frameTimer = 0;
        this.maxFrame = 8;
    }

    update(deltaTime){
        //sprite animation
        if(this.frameTimer > this.frameInterval){           
            if(this.frameX >= this.maxFrame){               
                this.frameX = 0;
            }
            else{
                this.frameX++;
            }
            this.frameTimer = 0;
        }
        else{           
            this.frameTimer += deltaTime;            
        }
    }

    draw(ctx){
        ctx.drawImage(marioImg, this.frameX * this.heroWidth, 0 * this.heroHeight, 
            this.heroWidth, this.heroHeight, 
            100, this.canvasHeight - this.heroHeight, this.heroWidth, this.heroHeight);
    }
}