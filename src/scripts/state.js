const states = {
   STANDING_RIGHT: 0,
   RUNNING_RIGHT: 1,
   JUMP_RIGHT: 2,
   SLIDE: 3
}

class State{
    constructor(state){
        this.state = state;
    }
}

export class RunningRight extends State{
    constructor(player){
       super('RUNNING RIGHT');
       this.player = player;
    }
 
    enter(){
        this.player.image = new Image();
        this.player.image.src = `../images/hero/croped_hero/run/run_${this.player.imageCounter}.png`;
      //   this.player.image.width = this.player.width / this.player.sizeFactor;
      //   this.player.image.height = this.player.height / this.player.sizeFactor;
        this.player.maxImages = 8;
        
        this.player.hatHeightFactor = -200;
        this.player.hatYFactor = 50;
        this.player.bodyXFactor = -80;
        this.player.feetFactor = -50;
    }
 
    handleInputs(input){
      if(!input.keys.right.pressed){
         this.player.setState(states.STANDING_RIGHT, 0);
      }
      else if(input.keys.up.pressed){
         this.player.setState(states.JUMP_RIGHT, 0);
      }
      else if(input.keys.down.pressed){
         this.player.setState(states.SLIDE, 1);
      }
    }
 }

 export class StandingRight extends State{
   constructor(player){
      super('STANDING RIGHT');
      this.player = player;
   }

   enter(){
       this.player.image = new Image();
       this.player.image.src = `../images/hero/croped_hero/hero_${this.player.imageCounter}.png`;
       this.player.maxImages = 10;
       this.player.hatHeightFactor = -200;
       this.player.hatYFactor = 50;
       this.player.bodyXFactor = -50;
       this.player.feetFactor = 200;
   }

   handleInputs(input){
      if(input.keys.right.pressed){
         this.player.setState(states.RUNNING_RIGHT, 1);
      }
      else if(input.keys.up.pressed){
         this.player.setState(states.JUMP_RIGHT, 0);
      }
      else if(input.keys.down.pressed){
         this.player.setState(states.SLIDE, 1);
      }
   }
}
// export class RunningLeft extends State{
//     constructor(player){
//        super('RUNNING LEFT');
//        this.player = player;
//     }
 
//     enter(){
//         this.player.image = new Image();
//         this.player.image.src = `../images/hero/Adventure Girl/png/RunLeft(${this.player.imageCounter}).png`;
//       //   this.player.image.width = this.player.width / this.player.sizeFactor;
//       //   this.player.image.height = this.player.height / this.player.sizeFactor;
//         this.player.maxImages = 7;
//     }
 
//     handleInputs(input){
//       if(!input.keys.left.pressed){
//          this.player.setState(states.STANDING_LEFT, 0);
//       }
//     }
//  }

//  export class StandingLeft extends State{
//    constructor(player){
//       super('STANDING LEFT');
//       this.player = player;
//    }

//    enter(){
//        this.player.image = new Image();
//        this.player.image.src = `../images/hero/Adventure Girl/png/IdleLeft(${this.player.imageCounter}).png`;
//        this.player.image.width = this.player.width / this.player.sizeFactor;
//        this.player.image.height = this.player.height / this.player.sizeFactor;
//        this.player.maxImages = 10;
//    }

//    handleInputs(input){
//       if(input.keys.left.pressed){
//          this.player.setState(states.RUNNING_LEFT, -1);
//       }
//       else if(input.keys.right.pressed){
//          this.player.setState(states.STANDING_RIGHT, 0);
//       }
//    }
// }
 export class JumpingRight extends State{
   constructor(player){
      super('JUMPING RIGHT');
      this.player = player;
   }

   enter(){
       this.player.image = new Image();
       this.player.image.src = `../images/hero/Adventure Girl/png/jump (${this.player.imageCounter}).png`;
      //  this.player.image.width = this.player.width / this.player.sizeFactor;
      //  this.player.image.height = this.player.height / this.player.sizeFactor;
       this.player.maxImages = 9;

       this.player.hatHeightFactor = -80;
       this.player.hatYFactor = 0;
       this.player.bodyXFactor = -80;
       this.player.feetFactor = 0;

       if(this.player.onGround()){
         this.player.velocity.y = -20;
       }
   }

   handleInputs(input){
      if(!input.keys.up.pressed){
         this.player.setState(states.RUNNING_RIGHT, 1);
      }
   }
}

 export class Slide extends State{
   constructor(player){
      super('SLIDE');
      this.player = player;
   }

   enter(){
       this.player.image = new Image();
       this.player.image.src = `../images/hero/croped_hero/slide/slide_${this.player.imageCounter}.png`;
       this.player.maxImages = 4;
   }

   handleInputs(input){
      if(!input.keys.down.pressed){
         this.player.setState(states.RUNNING_RIGHT, 1);
      }
   }
}
