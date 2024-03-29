class Enemy {
  constructor(game) {
    this.game = game;
    this.ground = this.game.canvasHeight - this.height;

    this.frameX = 0;
    this.frameY = 0;
    this.maxFrames = 4;
    this.framesPerSecond = 20;
    this.frameInterval = 1000 / this.framesPerSecond;
    this.frameTimer = 0;
  }

  update(deltatime) {
    this.position.x += this.velocity.x * deltatime;
    this.position.y += this.velocity.y * deltatime;

    //animation
    this.animateEnemy(deltatime);
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  animateEnemy(deltatime) {
    if (this.frameTimer > this.frameInterval) {
      //serve the next frame
      if (this.frameX < this.maxFrames) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
      //reset frameTimer
      this.frameTimer = 0;
    } else {
      //increase the frameTimer
      this.frameTimer += deltatime;
    }
  }
}

export class Worm extends Enemy {
  constructor(game) {
    super(game);
    this.game = game;
    this.image = enemy_worm;
    let spriteWidth = 482;
    let spriteHeight = 60;
    this.width = spriteWidth / 6;
    this.height = 60;
    this.maxFrames = 5;

    this.position = {
      x: this.game.canvasWidth,
      y: this.game.canvasHeight - this.height,
    };
    this.velocity = {
      x: -0.5,
      y: 0,
    };
  }
}

export class FlyingEnemy extends Enemy {
  constructor(game){
    super(game);
    this.game = game;
    this.image = enemy_fly;
    let spriteWidth = 360;
    let spriteHeight = 44;
    this.width = spriteWidth / 6;
    this.height = 44;
    this.maxFrames = 5;

    this.position = {
      x: this.game.canvasWidth,
      y: getRandomHeight(),
    };
    this.velocity = {
      x: -0.5,
      y: 0,
    };
  }

  getRandomHeight(){
    
  }
}
