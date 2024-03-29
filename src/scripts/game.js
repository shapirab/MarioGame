import Hero from "./models/hero.js";
import Ramp from "./models/ramp.js";
import Input from "./input.js";
import Layer from "./models/layer.js";
import { FlyingEnemy, Worm } from "./models/enemies.js";

export default class Game {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.hero = new Hero(canvasWidth, canvasHeight);
    this.ramp = new Ramp(canvasWidth, canvasHeight, this.hero);

    this.input = new Input();
    this.verticalSpeedConstant = 5;
    this.maxVerticalWidth = 400;

    this.layers = [];
    this.createLayers();

    this.enemies = [];
    this.enemyTypes = ["Worm", "FlyingEnemy"];
    this.enemyInterval = 500;
    this.enemyTimer = 0;
  }

  createLayers() {
    let layerNum = 8;
    let counter = 1;
    for (let i = layerNum; i > 0; i--) {
      this.createLayer(i, counter, layerNum);
      counter++;
    }
  }

  createLayer(layerIdNum, counter, maxLayers) {
    let layerId = `layer_${layerIdNum}`;
    let speedBase = 10;
    let speedFactorBase = 1 / maxLayers;
    let speedFactor = speedFactorBase * counter;
    let speed = Math.floor(speedBase * speedFactor);
    let layer = new Layer(layerId, speed, this.canvasHeight);
    this.layers.push(layer);
  }

  #createEnemies() {
    let enemyIndex = Math.floor(Math.random() * this.enemyTypes.length);
    let randomEnemy = this.enemyTypes[enemyIndex];
    if (randomEnemy == "Worm") {
      this.enemies.push(new Worm(this));
    } else if (randomEnemy == "FlyingEnemy") {
      this.enemies.push(new FlyingEnemy(this));
    }
  }

  update(deltaTime) {
    this.hero.update(deltaTime, this.input);
    this.ramp.update(deltaTime);
    if (
      this.hero.currentState == this.hero.states[1] ||
      this.hero.currentState == this.hero.states[2]
    ) {
      this.layers.forEach((layer) => {
        layer.update();
      });
    }

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
    this.layers.forEach((layer) => {
      layer.draw(ctx);
    });

    this.hero.draw(ctx);
    this.ramp.draw(ctx);

    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    });
  }
}
