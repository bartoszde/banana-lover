const board = document.getElementById("game-board")

class Game {
    constructor(){
        this.player = null;
        this.obstaclesArr = [];  //will store instances of the class Obstacle
        this.bonusArr = [];
        this.bulletArr = [];
        this.score = 0;
        this.berry = 0;
    }

    start(){
        this.player = new Player();
        this.attachEventListeners();


//create obstacles
        setInterval( () => {  
            const myObstacle = new Obstacle();
            this.obstaclesArr.push(myObstacle);
        }, 1000);
        
//move all obstacles
        setInterval( () => {   
            this.obstaclesArr.forEach( (obstacleInstance) => {
                obstacleInstance.moveLeft();
                this.detectCollision(obstacleInstance);
                this.removeObstacleIfOutside(obstacleInstance);
            });
        }, 16);
       
// move bullets
        setInterval( () => {
            this.bulletArr.forEach( (bulletInstance) => {
                bulletInstance.shootMove();
                this.detectBulletCollision(bulletInstance);
                this.removeBulletIfOutside(bulletInstance);
            });
        }, 20);

//create bonus
        setInterval( () => {
            const myBonus = new Bonus();
            this.bonusArr.push(myBonus);
        }, 2000);

//move all bonuses
        setInterval( () => {
            this.bonusArr.forEach( (bonusInstance) => {
                bonusInstance.moveBonusLeft();
               this.detectBonusCollision(bonusInstance);
               this.removeBonusIfOutside(bonusInstance);
            });
        }, 30);
    };


    attachEventListeners(){
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowUp":
                    this.player.moveUp();
                    break;
                case "ArrowDown":
                    this.player.moveDown();
                    break;
                case " ":
                    const myBullet = new Bullet(this.player.positionX, this.player.positionY);
                    this.bulletArr.push(myBullet);
                    break;
            }
        }); 
    };


//obstacle
    detectCollision(obstacleInstance){
        if (
            this.player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
            this.player.positionX + this.player.width > obstacleInstance.positionX &&
            this.player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
            this.player.height + this.player.positionY > obstacleInstance.positionY
          ){
            window.location.href = "./gameover.html";
          }
    };
    removeObstacleIfOutside(obstacleInstance){
        if(obstacleInstance.positionX < 0){
            obstacleInstance.obstacleElm.remove(); //remove from the dom
            this.obstaclesArr.shift(); // remove from the array
        } 
    };


//bonus
    detectBonusCollision(bonusInstance){
        if (this.player.positionX < bonusInstance.positionX + bonusInstance.width &&
            this.player.positionX + this.player.width > bonusInstance.positionX &&
            this.player.positionY < bonusInstance.positionY + bonusInstance.height &&
            this.player.height + this.player.positionY > bonusInstance.positionY 
          ){
            bonusInstance.bonusElm.remove(); //remove from the bonus dom
            this.bonusArr.shift();
            this.incrementScore();
            if (this.score >= 5) {
                window.location.href = "./winner.html";
            }
          }
    };

    removeBonusIfOutside(bonusInstance){
        if(bonusInstance.positionX < 0){
            bonusInstance.bonusElm.remove(); //remove from the bonus dom
            this.bonusArr.shift(); // remove from the bonus array
        }
    };


//score
    incrementScore(){
        this.score++;
        const scoreElement = document.getElementById("score");
        scoreElement.textContent = "Bananas collected: " + this.score;
    }



//bullets
    detectBulletCollision(bulletInstance) {
        this.obstaclesArr.forEach((obstacleInstance, index) => {
            if (bulletInstance.positionY > obstacleInstance.positionY &&
                bulletInstance.positionY < obstacleInstance.positionY + obstacleInstance.height &&
                bulletInstance.positionX + bulletInstance.width > obstacleInstance.positionX &&
                bulletInstance.positionX < obstacleInstance.positionX + obstacleInstance.width
            ){               

                obstacleInstance.obstacleElm.remove();
                bulletInstance.bulletElm.remove();
                this.obstaclesArr.splice(index, 1);   // keep this, otherwise is killing you detroyed invisible obstacle
                this.bulletArr.splice(index, 1);
                this.shootBerries();
               
            }
        });
    } 

    removeBulletIfOutside(bulletInstance){
        if (bulletInstance.positionX > 980){
            bulletInstance.bulletElm.remove();
            this.bulletArr.shift();
        }
    }

//counting berries
    shootBerries(){
        this.berry++;
        const berryElement = document.getElementById("berry");
        berryElement.textContent = "Destroyed berries: " + this.berry;
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
        this.positionX = 1000 - (this.width);
        this.obstaclePositnion = [0, 70, 140, 210, 280, 350, 420];
        this.positionY = this.obstaclePositnion[Math.floor(Math.random() * this.obstaclePositnion.length)];
        this.obstacleElm = null;
        this.createDomElement();
    }

    createDomElement(){
        this.obstacleElm = document.createElement("div"); 
        this.obstacleElm.className = "obstacle";
        this.obstacleElm.style.width = this.width  + "px";
        this.obstacleElm.style.height = this.height  + "px";
        this.obstacleElm.style.top = this.positionY + "px";

        const boardElm = document.getElementById("game-board");
        boardElm.appendChild(this.obstacleElm);
    };

    moveLeft(){
        this.positionX = this.positionX - 5;
        this.obstacleElm.style.left = this.positionX + "px";
    }
}

class Bonus {
    constructor (){
        this.width = 70;
        this.height = 70;
        this.positionX = 1000 - (this.width);
        this.bonusPosition = [0, 70, 140, 210, 280, 350, 420];
        this.positionY = this.bonusPosition[Math.floor(Math.random() * this.bonusPosition.length)];
        this.bonusElm = null;
        this.createBonusElement();
        
    }

    createBonusElement(){
        this.bonusElm = document.createElement("div");
        this.bonusElm.className = "bonus";
        this.bonusElm.style.width = this.width + "px";
        this.bonusElm.style.height = this.height + "px";
        this.bonusElm.style.top = this.positionY + "px";

        const boardElm = document.getElementById("game-board");
        boardElm.appendChild(this.bonusElm);
    };

    moveBonusLeft(){
        this.positionX = this.positionX - 5;
        this.bonusElm.style.left = this.positionX + "px";
    }

}

class Bullet {
    constructor(playerPosX, playerPosY){
        this.width = 55;
        this.height = 25;
        this.positionX = playerPosX + 70;
        this.positionY = playerPosY + 35;
        this.bulletElm = null;
        this.createBulletElement();
    }

    createBulletElement(){
        this.bulletElm = document.createElement("div");
        this.bulletElm.className = "bullet";
        this.bulletElm.style.width = this.width + "px";
        this.bulletElm.style.height = this.height + "px";
        this.bulletElm.style.top = this.positionY + "px";

        const boardElm = document.getElementById("game-board");
        boardElm.appendChild(this.bulletElm);  
    }

    shootMove(){
        this.positionX = this.positionX + 40;
        this.bulletElm.style.left = this.positionX + "px";
    }
}

const game = new Game();
game.start();