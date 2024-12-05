import Gameboard from "./Gameboard.js";

function HumanPlayer() {
    const board = Gameboard();

    function getBoard() {
        return board;
    }

    return {
        getBoard
    }
}

export default HumanPlayer;