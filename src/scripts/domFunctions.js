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
    drawGridEnemy();
    drawGridPlayer();
    startSetupPhase();

    function init() {
        const playerBoard = player.getBoard();
        playerBoard.placeShip([1, 4], 1, 5);
        playerBoard.placeShip([2, 5], 1, 4);
        playerBoard.placeShip([3, 6], 1, 3);
        playerBoard.placeShip([4, 6], 1, 3);
        playerBoard.placeShip([5, 7], 1, 2);

        enemy.placeShips();

        endSetupPhase();
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
                            startSetupPhase();
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

    function gameEndHandler() {
        player.getBoard().resetBoard();
        enemy.getBoard().resetBoard();
        gameEnded = true;
        const infoDiv = document.querySelector(".info");
        infoDiv.classList.remove("hidden");
        startSetupPhase();
    }

    function startSetupPhase() {
        const board = player.getBoard();
        const grid = document.querySelector(".grid.player");
        const allCells = grid.querySelectorAll(".grid-cell");
        const allShipCells = grid.querySelectorAll(".ship");
        const dragInvis = document.querySelector(".drag-invis");

        let relativeShipPositions = [];
        let valid;

        allShipCells.forEach((cell) => {
            cell.setAttribute("draggable", "true");
            cell.addEventListener("dragstart", (e) => {
                e.dataTransfer.setDragImage(dragInvis, 0, 0);
                cell.classList.add("dragging");
                relativeShipPositions = board.getShipCellsRelative([cell.dataset.x, cell.dataset.y]);
                const shipGridCells = [];
                relativeShipPositions.forEach(([x, y]) => {
                    shipGridCells.push(grid.querySelector(`[data-x="${Number(cell.dataset.x) + x}"][data-y="${Number(cell.dataset.y) + y}"]`));
                });
                shipGridCells.forEach((gridCell) => {
                    gridCell.classList.add("dragged-along");
                });
            });
            cell.addEventListener("dragend", () => {
                cell.classList.remove("dragging");
                grid.querySelectorAll(".dragged-along").forEach((element) => {
                    element.classList.remove("dragged-along");
                });
                grid.querySelectorAll(".preview").forEach((previewCell) => {
                    previewCell.classList.remove("preview");
                    previewCell.classList.remove("valid");
                    previewCell.classList.remove("invalid");
                });
                relativeShipPositions = [];
            });
        });

        grid.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        allCells.forEach((cell) => {
            cell.addEventListener("dragover", (e) => {
                e.preventDefault();
            });
            cell.addEventListener("dragenter", () => {
                const draggedElement = grid.querySelector(".dragging");
                const [oldX, oldY] = [Number(draggedElement.dataset.x), Number(draggedElement.dataset.y)];
                const [oldStartX, oldStartY] = board.getCoordinates([oldX, oldY])["shipStart"];
                const oldAxis = board.getCoordinates([oldStartX, oldStartY])["direction"] == "up" ? 1 : 0;

                const [x, y] = [Number(cell.dataset.x), Number(cell.dataset.y)]
                const startDeltaX = oldStartX - oldX;
                const startDeltaY = oldStartY - oldY;
                
                const previewCells = [];
                const absolutePositions = [];

                relativeShipPositions.forEach(([relX, relY]) => {
                    const absolutePos = [x + relX, y + relY];
                    absolutePositions.push(absolutePos);
                });
                absolutePositions.forEach(([absX, absY]) => {
                    const previewCell = grid.querySelector(`[data-x="${absX}"][data-y="${absY}"]`);
                    valid = true;
                    console.log(startDeltaX, startDeltaY);
                    if (!board.checkShipValidityMoving([oldX, oldY], [x + startDeltaX, y + startDeltaY], oldAxis, absolutePositions.length)) {
                        valid = false;
                    }
                    if (previewCell) {
                        previewCells.push(previewCell);
                    }
                });
                previewCells.forEach((previewCell) => {
                    if (valid) {
                        previewCell.classList.add("preview");
                        previewCell.classList.add("valid");
                    } else {
                        previewCell.classList.add("preview");
                        previewCell.classList.add("invalid");
                    }
                    
                });
            });
            cell.addEventListener("dragleave", () => {
                grid.querySelectorAll(".preview").forEach((previewCell) => {
                    previewCell.classList.remove("preview");
                    previewCell.classList.remove("valid");
                    previewCell.classList.remove("invalid");
                });
            });
            cell.addEventListener("drop", () => {
                if (valid) {

                }
            });
        });
    }

    function endSetupPhase() {
        const shipCells = document.querySelectorAll(".player .ship");
        shipCells.forEach((cell) => {
            cell.removeAttribute("draggable");
        });
    }

    return {drawGridEnemy, drawGridPlayer};
}


export default SingleplayerDomFunctions;