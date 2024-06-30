export default class Input{
    constructor(game){
        this.game = game;
        this.keys = {
            right: {
                pressed: false
            },
            left: {
                pressed: false
            },
            up: {
                pressed: false
            },
            down: {
                pressed: false
            }           
        };

        window.addEventListener('keydown', (e) => {
            switch(e.key){
                case 'ArrowUp':
                    this.keys.up.pressed = true;
                    break;
                case 'ArrowDown':
                    this.keys.down.pressed = true;
                    break;
                case 'ArrowRight':
                    this.keys.right.pressed = true;
                    break;
                case 'ArrowLeft':
                    this.keys.left.pressed = true;
                    break;
                case 'd':
                    console.log('d was pressed')
                    this.game.isDebug = !this.game.isDebug;
            }
        });

        window.addEventListener('keyup', (e) => {
            switch(e.key){
                case 'ArrowUp':
                    this.keys.up.pressed = false;
                    break;
                case 'ArrowDown':
                    this.keys.down.pressed = false;
                    break;
                case 'ArrowRight':
                    this.keys.right.pressed = false;
                    break;
                case 'ArrowLeft':
                    this.keys.left.pressed = false;
                    break;               
            }
        });
    }
}