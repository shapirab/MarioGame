import Game from './game.js';

const canvas = document.getElementById('main-canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

let game = new Game(canvas.width, canvas.height);

function animate(){
    requestAnimationFrame(animate);
    game.update();
    game.draw(ctx);

}

animate();