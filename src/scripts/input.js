export default class Input{
    constructor(){
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
                    console.log('ArrowRight pressed');
                    this.keys.right.pressed = true;
                    break;
                case 'ArrowLeft':
                    console.log('ArrowLeft pressed');
                    this.keys.left.pressed = true;
                    break;
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