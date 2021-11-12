'use strict';
export default class PopUp {
    constructor() {
        this.gamePopUp = document.querySelector('.game__pop-up');
        this.gamePopUpMessage = document.querySelector('.game__pop-up__message');
        this.gamePopUpRefreshBtn = document.querySelector('.game__pop-up__refresh');
        this.gamePopUpRefreshBtn.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
        });
    }
    setClickListener(onClick) {
        this.onClick = onClick;
    }
    showWithText(text) {
        this.gamePopUpMessage.textContent = `${text}`;
        this.gamePopUp.classList.remove('--hide');
    }
    hide() {
        this.gamePopUp.classList.add('--hide');
    }
}








