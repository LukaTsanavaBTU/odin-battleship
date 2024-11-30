function SingleplayerDomFunctions(enemy, player) {
    let gameStarted = false;
    let gameEnded = false;

    // FOR TESTING
    const playerBoard = player.getBoard();
    playerBoard.placeShip([1, 4], 1, 5);
    playerBoard.placeShip([2, 5], 1, 4);
    playerBoard.placeShip([3, 6], 1, 3);
    playerBoard.placeShip([4, 6], 1, 3);
    playerBoard.placeShip([5, 7], 1, 2);

    function init() {
        const playerBoard = player.getBoard();
        playerBoard.placeShip([1, 4], 1, 5);
        playerBoard.placeShip([2, 5], 1, 4);
        playerBoard.placeShip([3, 6], 1, 3);
        playerBoard.placeShip([4, 6], 1, 3);
        playerBoard.placeShip([5, 7], 1, 2);

        enemy.placeShips();
    }
    // FOR TESTING

    (() => {
        const infoDiv = document.querySelector(".info");
        const startButton = infoDiv.querySelector("button");
        startButton.addEventListener("click", () => {
            init();                  // TESTING LINE
            drawGridEnemy();         // TESTING LINE
            drawGridPlayer();        // TESTING LINE
            // if (gameEnded) {
            //     drawGridEnemy();
            //     drawGridPlayer();
            // }
            gameStarted = true;
            gameEnded = false;
            infoDiv.classList.add("hidden");
        });
    })();

    function drawGridPlayer() {
        const grid = document.querySelector(".grid.player");
        grid.textContent = "";
        const board = player.getBoard();
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                const cell =  board.getCoordinates([x, y]);
                const gridCell = document.createElement("div");
                gridCell.classList.add("grid-cell");
                gridCell.classList.add(cell["direction"]);
                if (cell["ship"]) {
                    gridCell.classList.add("ship");
                    gridCell.addEventListener("contextmenu", (e) => {
                        e.preventDefault();
                        if (board.checkShipValidityRotation(...board.rotatedShipInfo([x, y]))) {
                            board.rotateShip([x, y]);
                            drawGridPlayer();
                        }    
                    });
                }
                if (cell["isHit"] && cell["ship"]) {
                    gridCell.classList.add("hit-strike");
                    const strikeImg = document.createElement("img");
                    strikeImg.setAttribute("src", "./media/hit-strike.png");
                    const hitMarker = document.createElement("div");
                    hitMarker.classList.add("strike-marker");
                    hitMarker.appendChild(strikeImg);
                    gridCell.appendChild(hitMarker);
                } else if (cell["isHit"] && !cell["ship"]) {
                    gridCell.classList.add("hit-miss");
                    const hitMarker = document.createElement("div");
                    hitMarker.classList.add("miss-marker");                
                    gridCell.appendChild(hitMarker);
                }
                gridCell.dataset.x = x;
                gridCell.dataset.y = y;
                grid.appendChild(gridCell);
            }
        }   
        
    }
    
    function drawGridEnemy() {
        const grid = document.querySelector(".grid.enemy");
        grid.textContent = "";
        const board = enemy.getBoard();
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                const cell =  board.getCoordinates([x, y]);
                const gridCell = document.createElement("div");
                gridCell.classList.add("grid-cell");
                if (cell["isHit"] && cell["ship"]) {
                    gridCell.classList.add("ship")
                    gridCell.classList.add("hit-strike");
                    const strikeImg = document.createElement("img");
                    strikeImg.setAttribute("src", "./media/hit-strike.png");
                    const hitMarker = document.createElement("div");
                    hitMarker.classList.add("strike-marker");
                    hitMarker.appendChild(strikeImg);
                    gridCell.appendChild(hitMarker);
                } else if (cell["isHit"] && !cell["ship"]) {
                    gridCell.classList.add("hit-miss");
                    const hitMarker = document.createElement("div");
                    hitMarker.classList.add("miss-marker");                
                    gridCell.appendChild(hitMarker);
                }
                gridCell.dataset.x = x;
                gridCell.dataset.y = y;
                gridCell.addEventListener("click", attackEnemyEventHandler.bind(this, x, y));
                grid.appendChild(gridCell);
            }
        }   
    }
    
    function attackEnemyEventHandler(x, y) {
        if (!gameEnded && gameStarted) {
            const board = enemy.getBoard();
            if (!board.getCoordinates([x, y])["isHit"]) {
                board.receiveAttack([x, y]);
                drawGridEnemy();
                if (board.allSunk()) {
                    setTimeout(() => {
                        alert("Player Won!");
                    }, 0);
                    gameEndHandler();
                    return;
                }
                enemy.attack(player);
                drawGridPlayer();
                if (player.getBoard().allSunk()) {
                    setTimeout(() => {
                        alert("Player Lost!");
                    }, 0);
                    gameEndHandler();
                    return;
                }
            }
        }
    }

    function shipRotateEventHandler() {

    }

    function gameEndHandler() {
        player.getBoard().resetBoard();
        enemy.getBoard().resetBoard();
        gameEnded = true;
        const infoDiv = document.querySelector(".info");
        infoDiv.classList.remove("hidden");
    }

    return {drawGridEnemy, drawGridPlayer};
}


export default SingleplayerDomFunctions;