import BoardCell from "./BoardCell.js";
import Ship from "./Ship.js";

function Gameboard() {
    let shipsAlive = 0;
    const board = [];
    for (let y = 0; y < 10; y++) {
        board[y] = [];
        for (let x = 0; x < 10; x++) {
            board[y][x] = BoardCell();
        }
    }

    function getCoordinates([x, y]) {
        return board[y][x];
    }

    function checkShipValidity([x, y], axis, length) {
        if (axis === 0) {
            // Check if out of bounds
            if (x + length - 1 > 9) {
                return false;
            }
            // Check if collides with another ship
            for (let i = 0; i < length; i++) {
                console.log([x, y + i])
                if(getCoordinates([x + i, y])["ship"]) {
                    return false;
                }
            }
        } else {
            // Check if out of bounds
            if (y + length - 1 > 9) {
                return false;
            }
            // Check if collides with another ship
            for (let i = 0; i < length; i++) {
                console.log([x + i, y])
                if(getCoordinates([x, y + i])["ship"]) {
                    return false;
                }
            }
        }
        return true;
    }

    function placeShip([x, y], axis, length) {
        const newShip = Ship(length);
        if (axis === 0) {
            for (let i = 0; i < length; i++) {
                getCoordinates([x + i, y])["ship"] = newShip;
            }
        } else {
            for (let i = 0; i < length; i++) {
                getCoordinates([x, y + i])["ship"] = newShip;
            }
        }
        shipsAlive += 1;
    }

    function receiveAttack([x, y]) {
        const currentCell = getCoordinates([x, y])
        currentCell["isHit"] = true;
        if (currentCell["ship"]) {
            currentCell["ship"].hit();
            if (currentCell["ship"].isSunk()) {
                shipsAlive -= 1;
            }
        }
    }

    function allSunk() {
        if (shipsAlive <= 0) {
            return true;
        }
        return false;
    }

    return {
        getCoordinates,
        checkShipValidity,
        placeShip,
        receiveAttack,
        allSunk
    }
}

export default Gameboard;