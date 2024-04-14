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

    this.input = new Input();
    this.verticalSpeedConstant = 5;
    this.maxVerticalWidth = 400;

    this.background = new Background(this);
    this.enemies = [];
    this.enemyTypes = ["Worm", "FlyingEnemy", "PlantEnemy"];
    this.enemyInterval = 1000;
    this.enemyTimer = 0;

    this.speed = 0;
    this.maxSpeed = 6;
  }

  update(deltaTime) {
    this.background.update();
    this.hero.update(deltaTime, this.input);
    this.ramp.update(deltaTime);

    if (this.enemyTimer > this.enemyInterval) {
      this.#createEnemies();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
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
