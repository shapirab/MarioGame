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
    this.markedForDeletion = false;
  }

  update(deltatime) {
    this.position.x -= this.velocity.x + this.game.speed;
    this.position.y += this.velocity.y;

    if(this.position.x < 0){
      this.markedForDeletion = true;
    }

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
    if(this.game.isDebug){
      ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }
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

  getRandomHeight(minHeight, maxHeight){   
    return this.getRandomInRange(minHeight, maxHeight);
  }

  getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
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

    let maxHeight = this.game.canvasHeight - this.height;
    let minHeight = this.game.canvasHeight - this.height - 80;

    this.position = {
      x: this.game.canvasWidth,
      y: this.getRandomHeight(minHeight, maxHeight)
    };
    this.velocity = {
      x: 1 + this.game.speed,
      y: 0,
    };

    this.ground = this.game.canvasHeight - this.height;
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

    let minHeight = 50;
    let maxHeight = this.game.canvasHeight * 0.5;

    this.variableOfAngle = Math.random() * 0.1 + 0.1;
    this.angle = 0;

    this.position = {
      x: this.game.canvasWidth + Math.random() * this.game.canvasWidth * 0.5,
      y: this.getRandomHeight(minHeight, maxHeight),
    };
    this.velocity = {
      x: 4 + this.game.speed,
      y: Math.sin(this.angle)
    };
    this.ground = this.game.canvasHeight - this.height;
  }  

  update(deltaTime){
    super.update(deltaTime);
    this.angle += this.variableOfAngle;
    this.position.y += Math.sin(this.angle);
  }
}

export class PlantEnemy extends Enemy {
  constructor(game){
    super(game);
    this.game = game;
    this.image = enemy_plant;
    let spriteWidth = 120;
    let spriteHeight = 87;
    this.width = spriteWidth / 2;
    this.height = 87;
    this.maxFrames = 1;

    let maxHeight = this.game.canvasHeight - this.height;
    let minHeight = this.game.canvasHeight - this.height - 80;
    this.position = {
      x: this.game.canvasWidth,
      y: this.getRandomHeight(minHeight, maxHeight)
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.ground = this.game.canvasHeight - this.height;
  }
}
