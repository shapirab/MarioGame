import { RunningLeft, RunningRight, StandingLeft, StandingRight } from "../state.js";

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
        this.maxRunningImages = 8;
        this.imageName = `marioImg_${this.imageCounter}`;

        this.runningRightImages = [];
        this.runningLeftImages = [];
        this.standingLeftImages = [];
        this.standingRightImages = [];

        this.maxStandingImages = 10;
        this.loadRunningRightImages();
        this.loadRunningLeftImages();
        this.loadStandingRightImages();
        this.loadStandingLeftImages();

        this.sizeFactor = 2.5;
        this.width = 641;
        this.height = 542;
       
        this.ground = this.canvasHeight - (this.height / this.sizeFactor);
        this.position = {
            x: 100,
            y: this.ground
        }
        this.velocity = {
            x: 0,
            y: 0
        }

        this.states = [ new StandingRight(this), new RunningRight(this), 
            new StandingLeft(this), new RunningLeft(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
    }

    loadRunningRightImages(){
        for (let i = 1; i <= this.maxRunningImages; i++) {
            const image = new Image();
            image.src = `../images/hero/Adventure Girl/png/Run (${i}).png`;
            this.runningRightImages.push(image);
        }
    }

    loadRunningLeftImages(){
        for (let i = 1; i <= this.maxRunningImages; i++) {
            const image = new Image();
            image.src = `../images/hero/Adventure Girl/png/RunLeft(${i}).png`;
            this.runningLeftImages.push(image);
        }
    }

    loadStandingRightImages(){
        for (let i = 1; i <= this.maxStandingImages; i++) {
            const image = new Image();
            image.src = `../images/hero/Adventure Girl/png/Idle (${i}).png`;
            this.standingRightImages.push(image);
        }
    }

    loadStandingLeftImages(){
        for (let i = 1; i <= this.maxStandingImages; i++) {
            const image = new Image();
            image.src = `../images/hero/Adventure Girl/png/IdleLeft(${i}).png`;
            this.standingLeftImages.push(image);
        }  
    }

    setState(state){
        this.currentState = this.states[state];
        this.currentState.enter();
    }

    onGround(){
        return this.position.y === this.ground;
    }

    update(deltaTime, input){
        this.currentState.handleInputs(input);
        this.currentState.enter();
        console.log('this.currentState: ');
        console.log(this.currentState);
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

        this.position.x += this.velocity.x;
        this.position.y -= this.velocity.y;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.image.width, this.image.height);
    }
}