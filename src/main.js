'use strict';
import PopUp from './popup.js';
import * as sound from './sound.js';
import { GameBuilder, Reason } from './game.js';
const gameFinishBanner = new PopUp();
gameFinishBanner.hide();
const game = new GameBuilder()
    .withGameDuration(5)
    .withCarrotCount(5)
    .withBugCount(5)
    .build();

game.setGameStopListener(reason => {
    let message;
    switch (reason) {
        case Reason.cancel:
            sound.playAlert();
            message = 'REPLAY ❓';
            break;
        case Reason.win:
            sound.playWin();
            message = `YOU WON ⭕`;
            break;
        case Reason.lose:
            sound.playBug();
            message = `YOU LOST 💥`;
            break;
        default: throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(game.startGame);
