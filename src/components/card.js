function openCard(evt) {
    const card = evt.target.closest('.card');
    card.classList.toggle('card-flip');
    card.classList.toggle('disabled');
    counterCard();
}

function counterCard() {
    const cards = document.querySelectorAll('.card-flip');
    if (cards.length === 2) {
        document.querySelector('.play-ground').classList.toggle('disabled');
        setTimeout(() => {
            if (cards[0].querySelector('.card__img').getAttribute('alt') === cards[1].querySelector('.card__img').getAttribute('alt')) {
                thisCardsSame(true);
            } else {
                thisCardsSame(false);
            }
        }, 2000)
    }
}

function thisCardsSame(status) {
    const cards = document.querySelectorAll('.card-flip');
    if (status) {
        cards.forEach((item) => {
            item.classList.toggle('card-flip');
            item.classList.toggle('disabled');
            item.classList.toggle('card_complete');
        })
    } else {
        cards.forEach((item) => {
            item.classList.toggle('card-flip');
            item.classList.toggle('disabled');
        })
    }
    document.querySelector('.play-ground').classList.toggle('disabled');
}

export {
    openCard
}