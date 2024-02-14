import Game from './game.js';

window.addEventListener('load', () => {
    const canvas = document.getElementById('main-canvas')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let ctx = canvas.getContext('2d');
    
    let game = new Game(canvas.width, canvas.height);
    
    let lastTime = 0;
    function animate(timeStamp){
        requestAnimationFrame(animate);
        let deltaTime = timeStamp - lastTime;
            lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
    
    }
    
    animate(0);
});

