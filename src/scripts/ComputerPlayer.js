import Gameboard from "./Gameboard.js";
import { getRandomInt, randomIndex } from "./helpers.js";

function ComputerPlayer() {
    const board = Gameboard();

    function getBoard() {
        return board;
    }

    function placeRandomShip(length) {
        let randX, randY, randAxis;
        do {
            randX = getRandomInt(10);
            randY = getRandomInt(10);
            randAxis = getRandomInt(2);
        } while (!board.checkShipValidity([randX, randY], randAxis, length))
        board.placeShip([randX, randY], randAxis, length);
    }

    function placeShips() {
        placeRandomShip(5);
        placeRandomShip(4);
        placeRandomShip(3);
        placeRandomShip(3);
        placeRandomShip(2);
    }

    // Attack Logic
    let memory = {
        attacked: false,
        axis: null,
        queue: [],
    };

    function clearMemory() {
        memory = {
            attacked: false,
            axis: null,
            queue: [],
        };
    }

    function attack(target) {
        if (memory["attacked"]) {
            const index = randomIndex(memory["queue"]);
            const cell = memory["queue"][index];
            memory["queue"].splice(index, 1)
            attackAt(target, cell);
        } else {
            attackRandomly(target);
        }
    }

    function attackRandomly(target) {
        let randX, randY;
        const targetBoard = target.getBoard();
        do {
            randX = getRandomInt(10);
            randY = getRandomInt(10);
        } while (targetBoard.getCoordinates([randX, randY])["isHit"] === true)
        attackAt(target, {x: randX, y: randY, axis: null});

    }

    function attackAt(target, {x, y, axis}) {
        const targetBoard = target.getBoard();
        targetBoard.receiveAttack([x, y]);
        const hitCell = targetBoard.getCoordinates([x, y]);
        if (hitCell["ship"] && !hitCell["ship"].isSunk()) {
            const neighbors = [
                {x: x + 1, y, axis: 0}, 
                {x: x - 1, y, axis: 0}, 
                {x, y: y + 1, axis: 1}, 
                {x, y: y - 1, axis: 1}
            ].filter((cell) => {
                return targetBoard.checkCoordinateValidity([cell["x"], cell["y"]])
                    && !targetBoard.getCoordinates([cell["x"], cell["y"]])["isHit"];
            });
            if ((memory["axis"] === null) && (axis !== null)) {
                // If the axis is unknown and it isn't our first hit, find out the axis
                memory["axis"] = axis;
                memory["queue"] = memory["queue"].filter((cell) => cell["axis"] === axis);
                
            }
            if (!memory["attacked"]) {
                // If it is our first hit and so axis is unknown, add all valid neighboring cells to queue 
                memory["attacked"] = true; 
                neighbors.forEach((cell) => {
                    memory["queue"].push(cell);
                });
            } else {
                // If axis is known, add valid neighboring cells only on that axis 
                neighbors.forEach((cell) => {
                    if (cell["axis"] === memory["axis"]) {
                        memory["queue"].push(cell);
                    }
                });
            }
        } else if ((hitCell["ship"] && hitCell["ship"].isSunk()) || (memory["queue"].length === 0)) {
            // There will be a bug here if there are several ships right next to each other, fix later
            // Keep track of hit ship cells
            // If queue is empty and ship has not been sunk, enqueue all hit ship cells and start attacking on opposite axis 
            clearMemory();
        }
    }

    return {
        getBoard,
        placeShips,
        attack,
        attackAt
    }
}

export default ComputerPlayer;