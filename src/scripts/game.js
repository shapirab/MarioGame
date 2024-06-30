import Hero from "./models/hero.js";
import Ramp from "./models/ramp.js";
import Input from "./input.js";
import { FlyingEnemy, PlantEnemy, Worm } from "./models/enemies.js";
import { Background } from "./models/layer.js";

export default class Game {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.hero = new Hero(this, canvasWidth, canvasHeight);
    this.ramp = new Ramp(canvasWidth, canvasHeight, this.hero);

    this.input = new Input(this);
    this.verticalSpeedConstant = 5;
    this.maxVerticalWidth = 400;

    this.background = new Background(this);
    this.enemies = [];
    this.enemyTypes = ["Worm", "FlyingEnemy", "PlantEnemy"];
    this.enemyInterval = 1000;
    this.enemyTimer = 0;

    this.speed = 0;
    this.maxSpeed = 6;
    this.collision = false;

    this.isDebug = false;   
  }

  update(deltaTime) {
    this.background.update();
    this.hero.update(deltaTime, this.input);
    this.ramp.update(deltaTime);

    this.addEnemiesToList(deltaTime);
    
    this.enemies.forEach((enemy, index) => {
      enemy.update(deltaTime);
      if(enemy.markedForDeletion){
        this.enemies.splice(index, 1);
      }
      this.handleCollision(enemy);
    });
  }

  draw(ctx) {
    this.background.draw(ctx);
    this.ramp.draw(ctx);
    
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    });

    this.hero.draw(ctx);
  }

  addEnemiesToList(deltaTime){
    if (this.enemyTimer > this.enemyInterval) {
      this.#createEnemies();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }

  handleCollision(enemy){
    if(this.isColliding(enemy)){
      console.log(`handleCollision: ${this.isColliding(enemy)}`)
      this.collision = true;
    }
  }

  // isColliding(enemy){
  //   let factor = 0;
  //   let enemyCenterX = enemy.position.x + enemy.width / 2;
  //   let enemyCenterY = enemy.position.y + enemy.height / 2;
  //   let heroCenterX = this.hero.position.x + this.hero.width / 2;
  //   let heroCenterY = this.hero.position.y + this.hero.height / 2;

  //   let enemyRadius = enemy.width / 2;
  //   let heroRaidus = this.hero.width / 2 - factor;
  //   let sumOfRedii = enemyRadius + heroRaidus;
    
  //   let distanceX = enemyCenterX - heroCenterX;
  //   let distanceY = enemyCenterY - heroCenterY;
  //   let distance = Math.hypot(distanceX, distanceY);

  //   return distance <= sumOfRedii;
  // }

  isColliding(enemy){
    return this.isCollidingFeet(enemy) || this.isCollidingBody(enemy) || this.isCollidingHat(enemy);
    //return false;
  }

  isCollidingHat(enemy){
    return this.hero.position.x + this.hero.width >= enemy.position.x &&
    this.hero.position.x < enemy.width + enemy.position.x &&
    this.hero.position.y + this.hero.height + this.hero.hatHeightFactor > enemy.position.y &&
    this.hero.position.y + this.hero.hatYFactor < enemy.height + enemy.position.y;
  }

  isCollidingBody(enemy){
    return this.hero.position.x + this.hero.width + this.hero.bodyXFactor >= enemy.position.x &&
    this.hero.position.x < enemy.width + enemy.position.x &&
    this.hero.position.y + this.hero.height > enemy.position.y &&
    this.hero.position.y < enemy.height + enemy.position.y;
  }

  isCollidingFeet(enemy){
    return this.hero.position.x + this.hero.width >= enemy.position.x &&
    this.hero.position.x < enemy.width + enemy.position.x &&
    this.hero.position.y + this.hero.height + this.hero.feetFactor > enemy.position.y &&
    this.hero.position.y + this.hero.feetFactor < enemy.height + enemy.position.y;
  }

  #createEnemies() {
    let enemyIndex = Math.floor(Math.random() * this.enemyTypes.length);
    let randomEnemy = this.enemyTypes[enemyIndex];
    if (randomEnemy == "Worm") {
      this.enemies.push(new Worm(this));
    } 
    else if (randomEnemy == "FlyingEnemy") {
      this.enemies.push(new FlyingEnemy(this));
    }
    else if(this.speed > 0 && randomEnemy == "PlantEnemy"){
      this.enemies.push(new PlantEnemy(this));
    }
  }
}
