import Gameboard from "./Gameboard";
import { getRandomInt, randomIndex } from "./helpers";

function ComputerPlayer() {
    const board = Gameboard();
    const memory = {
        attacking: false,
        lastHit: [],
        axis: null,
        queue: []
    };

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

    // Tired, do all of this later

    function attack(target) {
        if (memory["attacking"]) {
            if (memory["axis"] !== null) {

            } else {
                const index = randomIndex(memory["queue"]);
                const element = memory["queue"][index];
                memory["queue"].splice(index, 1);
                attackAt(target, element);
            }
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
        attackAt(target, [randX, randY]);

    }

    function attackAt(target, [x, y]) {
        const targetBoard = target.getBoard();
        targetBoard.receiveAttack([randX, randY]);
        const hitCell = targetBoard.getCoordinates([randX, randY]);
        if (hitCell["ship"] && !hitCell["ship"].isSunk()) {
            memory["attacking"] = true;
            memory["lastHit"] = [randX, randY];
            [
                [randX + 1, randY], [randX - 1, randY], 
                [randX, randY + 1], [randX, randY - 1]
            ].forEach((coordinate) => {
                if (targetBoard.checkCoordinateValidity(coordinate) &&
                    !targetBoard.getCoordinates(coordinate)["isHit"]) {
                        memory["queue"].push(coordinate);
                }
            });
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