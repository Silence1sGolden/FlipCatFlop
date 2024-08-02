import flopImg from '../img/flop.png';
const flop = flopImg;
import { areYouWinnig, soundsSetting } from '../index.js';
import { playCardFlipSound } from './audio.js';

function openCard(evt) {
    const card = evt.target.closest('.card');
    card.classList.add('card-flip');
    counterCard();
}

function counterCard() {
    playCardFlipSound(soundsSetting);
    const cards = document.querySelectorAll('.card-flip');
    if (cards.length === 2) {
        document.querySelector('.playground').classList.add('disabled');
        setTimeout(() => {
            if (cards[0].querySelector('.backside').getAttribute('alt') === cards[1].querySelector('.backside').getAttribute('alt')) {
                areCardsSame(cards, true);
            } else {
                areCardsSame(cards, false);
            }
            document.querySelector('.playground').classList.remove('disabled');
        }, 1500)
    }
}

function areCardsSame(cards, status) {
    if (status) {
        const counter = document.querySelector('#cards');
        counter.textContent -= 1;
        cards.forEach((item) => {
            item.classList.remove('card-flip');
            item.classList.add('card_complete');
        })
        areYouWinnig(counter.textContent);
    } else {
        cards.forEach((item) => {
            item.classList.remove('card-flip');
            item.querySelector('.backside').setAttribute('src', flop);
            item.querySelector('.backside').setAttribute('alt', 'flip');
        })
    }
}

export {
    openCard
}