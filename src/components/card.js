import flopImg from '../img/flop.png';
const flop = flopImg;

function openCard(evt) {
    const card = evt.target.closest('.card');
    card.classList.add('card-flip');
    counterCard();
}

function counterCard() {
    const cards = document.querySelectorAll('.card-flip');
    if (cards.length === 2) {
        document.querySelector('.playground').classList.add('disabled');
        setTimeout(() => {
            if (cards[0].querySelector('.backside').getAttribute('alt') === cards[1].querySelector('.backside').getAttribute('alt')) {
                thisCardsSame(cards, true);
            } else {
                thisCardsSame(cards, false);
            }
            document.querySelector('.playground').classList.remove('disabled');
        }, 1500)
    }
}

function thisCardsSame(cards, status) {
    if (status) {
        cards.forEach((item) => {
            item.classList.remove('card-flip');
            item.classList.add('card_complete');
        })
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