import SingleplayerDomFunctions from "./scripts/domFunctions.js";
import HumanPlayer from "./scripts/HumanPlayer.js";
import ComputerPlayer from "./scripts/ComputerPlayer.js";

const player = HumanPlayer();
const enemy = ComputerPlayer();

const dom = SingleplayerDomFunctions(enemy, player);

/*
  
TODO:
- Animations;
- More responsive webpage;
- Readme file;

DONE:
- Make sure that permanent and non-permanent enemy memories don't carry over rounds (they may right now);
- Ships dissapear when trying to place them above upper bounds;
- Change "Click" to "Right Click" in description;
- Add message after sinking ship (with name and length);
- Proper win/lose message;
- Reveal enemy ship locations after losing;
- Show enemy ship shape after sinking;
- AI stops working when queue is empty but last hit cell was unsunk ship (thus resulting in neighboring cells not being enqueued);

BUGS:
- None detected for now;

*/