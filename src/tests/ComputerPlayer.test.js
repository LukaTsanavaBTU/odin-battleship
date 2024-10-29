import ComputerPlayer from "../scripts/ComputerPlayer.js";

test("Randomly places all ships in valid locations", () => {
    const cp = ComputerPlayer();
    cp.placeShips();
    const board = cp.getBoard();
    let shipsNum = 0;
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            if (board.getCoordinates([x, y])["ship"]) {
                shipsNum += 1;
            }
        }
    }
    
    expect(shipsNum).toBe(17);
});