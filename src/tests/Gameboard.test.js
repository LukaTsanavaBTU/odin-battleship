/*
Things to test:
- Place ships on board;
- Attack logic:
  - Ships take damage;
  - Missed shots get recorded;
  - Report when all ships are sunk.
*/

import Gameboard from "../scripts/Gameboard.js";

// Place ships on board

test("Ship gets placed on the board - length 2, X axis", () => {
    const board = Gameboard();
    board.placeShip([5, 6], 0, 2); // Place ship of length 2 at (5; 6) coordinates at X axis
    expect(board.getCoordinates([5, 6])["ship"]).toBeTruthy();
    expect(board.getCoordinates([5, 7])["ship"]).toBeTruthy();
});

test("Ship gets placed on the board - length 2, Y axis", () => {
    const board = Gameboard();
    board.placeShip([5, 6], 1, 2); // Place ship of length 2 at (5; 6) coordinates at Y axis
    expect(board.getCoordinates([5, 6])["ship"]).toBeTruthy();
    expect(board.getCoordinates([6, 6])["ship"]).toBeTruthy();
});

test("Ship gets placed on the board - length 3, X axis", () => {
    const board = Gameboard();
    board.placeShip([5, 6], 0, 3); // Place ship of length 3 at (5; 6) coordinates at X axis
    expect(board.getCoordinates([5, 6])["ship"]).toBeTruthy();
    expect(board.getCoordinates([5, 7])["ship"]).toBeTruthy();
    expect(board.getCoordinates([5, 8])["ship"]).toBeTruthy();
});

// Attack logic

test("Missed shots get recorded", () => {
    const board = Gameboard();
    board.receiveAttack([5, 6]);
    expect(board.getCoordinates([5, 6])["isHit"]).toBe(true);
});

test("Ships take damage after being attacked", () => {
    const board = Gameboard();
    board.placeShip([5, 6], 0, 1); // Place ship of length 1 at (5; 6) coordinates at X axis
    board.receiveAttack([5, 6]);
    expect(board.getCoordinates([5, 6])["ship"].isSunk()).toBe(true);
});

test("Report when all ships are sunk", () => {
    const board = Gameboard();
    board.placeShip([5, 6], 0, 1); // Place ship of length 1 at (5; 6) coordinates at X axis
    board.receiveAttack([5, 6]);
    expect(board.allSunk()).toBe(true);
});