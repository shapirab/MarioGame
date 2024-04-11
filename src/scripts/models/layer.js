class Layer {
  constructor(game, image, speedModifier, width, height) {
    this.image = image;
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.position = {
      x: 0,
      y: 0,
    };
  }

  update() {
    if (this.position.x <= -this.width) {
      this.position.x = 0;
    }
    else{
      this.position.x -= this.game.speed * this.speedModifier;
    }
  }

  draw(ctx) {   
    ctx.drawImage(
     this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    ctx.drawImage(
     this.image,
      this.position.x + this.width,
      this.position.y,
      this.width,
      this.height
    );
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = this.game.canvasWidth;
    this.height = this.game.canvasHeight;
    this.layer1image = layer_1;
    this.layer2image = layer_2;
    this.layer3image = layer_3;
    this.layer4image = layer_4;
    this.layer5image = layer_5;
    this.layer6image = layer_6;
    this.layer7image = layer_7;
    this.layer8image = layer_8;
    this.layer1 = new Layer(game,this.layer1image, 1, this.width, this.height);
    this.layer2 = new Layer(game,this.layer2image, 6/8, this.width, this.height);
    this.layer3 = new Layer(game,this.layer3image, 5/8, this.width, this.height);
    this.layer4 = new Layer(game,this.layer4image, 4/8, this.width, this.height);
    this.layer5 = new Layer(game,this.layer5image, 3/8, this.width, this.height);
    this.layer6 = new Layer(game,this.layer6image, 2/8, this.width, this.height);
    this.layer7 = new Layer(game,this.layer7image, 1/8, this.width, this.height);
    this.layer8 = new Layer(game,this.layer8image, 0, this.width, this.height);
      
    this.layers = [this.layer8, this.layer7, this.layer6, this.layer5, 
      this.layer4, this.layer3, this.layer2, this.layer1];
  }

  update() {
    this.layers.forEach(layer => {
        layer.update();
    });
  }

  draw(ctx) {
    this.layers.forEach(layer => {
        layer.draw(ctx);
    });
  }
}
