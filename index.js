import SingleplayerDomFunctions from "./scripts/domFunctions.js";
import HumanPlayer from "./scripts/HumanPlayer.js";
import ComputerPlayer from "./scripts/ComputerPlayer.js";

const player = HumanPlayer();
const enemy = ComputerPlayer();

const dom = SingleplayerDomFunctions(enemy, player);
