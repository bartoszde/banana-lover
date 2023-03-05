const board = document.getElementById("game-board")

class Player {
    constructor (){
        this.positionX = 0;
        this.positionY = 0;
        this.playerElm = document.getElementById("player");
    }

    moveUp(){
        if (this.positionY > 0) {
            this.positionY -= 70;                            //player is moving by block of 70px
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


        const boardElm = document.getElementById("game-board");
        boardElm.appendChild(this.obstacleElm);
    };

    moveLeft(){
        this.positionX = this.positionX - 15;
        this.obstacleElm.style.left = this.positionX + "px";
        this.obstacleElm.style.top = this.positionY + "px";
    }
}

const myPlayer = new Player();
const myObstacle = new Obstacle();


setInterval(function(){
    myObstacle.moveLeft();
}, 1000);


document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp"){
        myPlayer.moveUp();
    } else if (event.key === "ArrowDown") {
        myPlayer.moveDown();
    }
});
