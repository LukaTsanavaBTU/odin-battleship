import Gameboard from "./Gameboard";
import { getRandomInt } from "./helpers";

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

    return {
        getBoard,
        placeShips
    }
}

export default ComputerPlayer;