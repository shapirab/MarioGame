export default class Layer {
  constructor(image, speed, canvasHeight) {
    this.image = image;
    
    this.width = 1920;
    this.height = canvasHeight;
    this.speed = speed;
    this.position = {
      x: 0,
      y: 0,
    };
  }

  update() {
    if (this.position.x <= -this.width) {
      this.position.x = 0;
    }

    this.positionX = Math.floor((this.position.x -= this.speed));
  }

  draw(ctx) {   
    var imageElement = document.getElementById(this.image);
    ctx.drawImage(
     imageElement,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    ctx.drawImage(
     imageElement,
      this.position.x + this.width,
      this.position.y,
      this.width,
      this.height
    );
  }
}
