import { Field, ItemType } from './field.js';
import * as sound from './sound.js';
export const Reason = Object.freeze({
    win: `win`,
    lose: `lose`,
    cancel: `cancel`,
});
//Builder Pattern
export class GameBuilder {
    withGameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }
    withCarrotCount(carrotCount) {
        this.carrotCount = carrotCount;
        return this;
    }
    withBugCount(bugCount) {
        this.bugCount = bugCount;
        return this;
    }
    build() {
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        );
    }
}

class Game {
    constructor(gameDuration, carroutCount, bugCount) { 
        this.gameDuration = gameDuration;
        this.carroutCount = carroutCount;
        this.bugCount = bugCount;
        this.timer = undefined;
        this.started = false;
        this.score = 0;
        this.gameBtn = document.querySelector('.game__header__button');
        this.gameTimer = document.querySelector('.game__header__timer');
        this.gameScore = document.querySelector('.game__header__score');
        this.gameField = new Field(this.carroutCount, this.bugCount);
        this.gameField.setClickListener(this.onItemClick);
        this.gameBtn.addEventListener('click', () => {
            if (this.started) {
                this.stopGame(Reason.cancel);
            }
            else {
                this.startGame();
            }
        })
    }
    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }
    startGame = () => { 
        this.started = true;
        sound.playBackground();
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
    }
    stopGame(reason) {
        this.started = false;
        sound.stopBackground();
        this.stopGameTimer();
        this.hideGameBtn();
        this.onGameStop && this.onGameStop(reason);
    }


    initGame() {
        this.gameField.init();
        this.score = 0;
        this.gameScore.textContent = `${this.carroutCount}`;
    }

    showStopButton() {
        const icon = document.querySelector('.fas');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-stop');
        this.gameBtn.style.visibility = 'visible';
    }
    showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    updateTimerText(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        this.gameTimer.textContent = `${minutes}:${seconds}`;
    }

    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec); //5
        this.timer = setInterval(() => {
            if (remainingTimeSec <= 0) {
                this.stopGame(this.carroutCount === this.score ? Reason.win : Reason.lose);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }
    stopGameTimer() {
        clearInterval(this.timer);
    }
    hideGameBtn() {
        this.gameBtn.style.visibility = 'hidden';
    }
    updateScoreBoard() {
        this.gameScore.textContent = this.carroutCount - this.score;
    }


    onItemClick = item => {
        if (!this.started) { 
            return;
        }
        if (item === ItemType.carrot) {
            this.score++;
            this.updateScoreBoard();
            if (this.score === this.carroutCount) {
                this.stopGame(Reason.win);
            }
        }
        else if (item === ItemType.bug) {
            this.stopGame(Reason.lose);
        }
    };

}