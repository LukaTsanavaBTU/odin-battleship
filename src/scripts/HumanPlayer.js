import Gameboard from "./Gameboard";

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