import SingleplayerDomFunctions from "./scripts/domFunctions.js";
import HumanPlayer from "./scripts/HumanPlayer.js";
import ComputerPlayer from "./scripts/ComputerPlayer.js";

const player = HumanPlayer();
const enemy = ComputerPlayer();

const dom = SingleplayerDomFunctions(enemy, player);

/*
  
TODO:
- Change "Click" to "Right Click" in description;
- Add message after sinking ship (with name and length);
- Proper win/lose message;
- Animations;
- More responsive webpage;
- Reveal enemy ship locations after losing;
- Readme file;

BUGS:
- Ships dissapear when trying to place them above upper bounds;

DONE:
- Make sure that permanent and non-permanent enemy memories don't carry over rounds (they may right now);

*/