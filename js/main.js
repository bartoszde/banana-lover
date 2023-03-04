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
            this.playerElm.style.top = this.positionY + "px" 
        }
    };
    
    moveDown(){
        if (this.positionY < 420) {
            this.positionY += 70;
            this.playerElm.style.top = this.positionY + "px"
        }
    };
}

const myPlayer = new Player();

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp"){
        myPlayer.moveUp();
    } else if (event.key === "ArrowDown") {
        myPlayer.moveDown();
    }
});
