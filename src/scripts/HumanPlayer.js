import Gameboard from "./Gameboard.js";

function HumanPlayer() {
    const board = Gameboard();

    function getBoard() {
        return board;
    }

    function fullReset() {
        board.resetBoard();
    }

    return {
        fullReset,
        getBoard
    }
}

export default HumanPlayer;