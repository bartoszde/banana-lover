const board = document.getElementById("game-board")

class Game {
    constructor(){
        this.player = null;
        this.obstaclesArr = [];  //will store instances of the class Obstacle
    }
    start(){
        this.player = new Player();
        this.attachEventListeners();


        //create obstacles
        setInterval( () => {  
            const myObstacle = new Obstacle();
            this.obstaclesArr.push(myObstacle);
        }, 4000)
        
        //move all obstacles
        setInterval( () => {   
            this.obstaclesArr.forEach( (obstacleInstance) => {
                obstacleInstance.moveLeft();
                this.detectCollision(obstacleInstance); 
            });
        }, 200);
    }
    attachEventListeners(){
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp"){
                this.player.moveUp();
            } else if (event.key === "ArrowDown") {
                this.player.moveDown();
            }
        });
    }

    detectCollision(obstacleInstance){
        if (
            this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            this.player.positionX + this.player.width > obstacleInstance.positionX &&
            this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            this.player.height + this.player.positionY > obstacleInstance.positionY
          ){
            //console.log("game over my fren!");
            window.location.href = "./gameover.html";
          }
    }
}

class Player {
    constructor (){
        this.width = 70;
        this.height = 70;
        this.positionX = 0;
        this.positionY = 245 - (this.height / 2);
        this.playerElm = document.getElementById("player");
        this.playerElm.style.bottom = this.positionY + "px";

        this.playerElm.style.width = this.width + "px";
        this.playerElm.style.height = this.height + "px";
    }

    moveUp(){
        if (this.positionY > 0) {
            this.positionY -= 70;                  //player is moving by block of 70px
            this.playerElm.style.top = this.positionY + "px";
        }
    };
    
    moveDown(){
        if (this.positionY < 420) {
            this.positionY += 70;
            this.playerElm.style.top = this.positionY + "px";
        }
    };
}

class Obstacle {
    constructor (){
        this.width = 70;
        this.height = 70;
        this.positionX = 1000;
        this.positionY = 245 - (this.height / 2);
        this.obstacleElm = null;
        this.createDomElement();
    }

    createDomElement(){
        this.obstacleElm = document.createElement('div'); 

        this.obstacleElm.className = "obstacle";
        this.obstacleElm.style.width = this.width  + "px";
        this.obstacleElm.style.height = this.height  + "px";
        this.obstacleElm.style.top = this.positionY + "px";

        const boardElm = document.getElementById("game-board");
        boardElm.appendChild(this.obstacleElm);
    };

    moveLeft(){
        this.positionX = this.positionX - 10;
        this.obstacleElm.style.left = this.positionX + "px";
        
    }
}


const game = new Game();
game.start();




