import {drawGridEnemy, drawGridPlayer} from "./scripts/domFunctions.js";
import HumanPlayer from "./scripts/HumanPlayer.js";
import ComputerPlayer from "./scripts/ComputerPlayer.js";

const player = HumanPlayer();
const playerBoard = player.getBoard();
playerBoard.placeShip([2, 2], 0, 3);
playerBoard.placeShip([7, 4], 1, 4);
playerBoard.placeShip([1, 6], 0, 2);
playerBoard.getCoordinates([1, 6])["isHit"] = true;
playerBoard.getCoordinates([3, 8])["isHit"] = true;

const enemy = ComputerPlayer();
const enemyBoard = enemy.getBoard();
enemyBoard.placeShip([5, 3], 1, 3);
enemyBoard.placeShip([2, 4], 1, 4);
enemyBoard.placeShip([7, 2], 0, 2);

drawGridEnemy(enemy);
drawGridPlayer(player);