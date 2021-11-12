'use strict';
import * as sound from './sound.js';
export const ItemType = Object.freeze({
    carrot: 'carrot',
    bug: 'bug'
});
const CARROT_SIZE = 80;
export class Field {
    constructor(carrotCount, bugCount) {
        //this={}
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = this.fieldRect.width - CARROT_SIZE;
        this.y2 = this.fieldRect.height - CARROT_SIZE;
        //콜백함수 : 함수로써 다른함수의 인자로 들어간 후 어떠한 로직이 실행되고 호출된다.
        //함수를 어딘가의 인자로 전달할 경우 클래스정보는 함께 전달되지 않는다.
        //즉 this.onclick() 이라는 ★함수만★ 전달된다.
        //클래스정보를 무시하고 싶지 않을 때는 함수를 클래스에 바인딩을 시켜줘야한다. this 바인딩
        //or arrow function 을 사용해주어야한다.
        // this.onClick = this.onClick.bind(this);
        this.field.addEventListener('click', this.onClick);
        //return this;
    }
    init() {
        this.field.innerHTML = ``;
        this._addItem(ItemType.carrot, this.carrotCount, './carrot/image/carrot.png');
        this._addItem(ItemType.bug, this.bugCount, './carrot/image/bug.png');
    }

    _addItem(className, count, imgPath) {
        for (let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const randomWidth = randomNumber(this.x1, this.x2);
            const randomHeight = randomNumber(this.y1, this.y2);
            item.style.top = `${randomHeight}px`;
            item.style.left = `${randomWidth}px`;
            this.field.appendChild(item);
        }
    }
    onClick = event => {
        const target = event.target;
        if (target.matches('.carrot')) {
            sound.playCarrot();
            target.remove();
            this.onItemClick && this.onItemClick(ItemType.carrot);
        }
        else if (target.matches('.bug')) {
            this.onItemClick && this.onItemClick(ItemType.bug);
        }
    }
    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }


}
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
