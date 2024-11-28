function drawGridPlayer(player) {
    const grid = document.querySelector(".grid.player");
    const board = player.getBoard();
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell =  board.getCoordinates([x, y]);
            const gridCell = document.createElement("div");
            gridCell.classList.add("grid-cell");
            gridCell.classList.add(cell["direction"]);
            if (cell["ship"]) {
                gridCell.classList.add("ship")
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

function drawGridEnemy(enemy) {
    const grid = document.querySelector(".grid.enemy");
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
            grid.appendChild(gridCell);
        }
    }   
}

export {drawGridPlayer, drawGridEnemy};