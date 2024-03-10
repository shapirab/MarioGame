import Hero from "./models/hero.js";
import Ramp from "./models/ramp.js";
import Input from "./input.js";
import Layer from "./models/layer.js";

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

  update(deltaTime) {
    this.hero.update(deltaTime, this.input);
    this.ramp.update(deltaTime);

  }

  draw(ctx) {
    this.layers.forEach((layer) => {
      layer.update();
      layer.draw(ctx);
    });
    this.hero.draw(ctx);
    this.ramp.draw(ctx);

  }
}
