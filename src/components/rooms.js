function enterGameRoom() {
    const form = document.querySelector('.form');
    form.remove();
}

function createGameRoom(playgroundSize, cardsList, openCard) {
    const playGround = document.createElement('div');
    playGround.classList.add('play-ground');
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card');
    const cards = [];

    for(let i = 0; i < playgroundSize; i++) {
        const firstCard = cardElement.cloneNode(true);
        const secondCard = cardElement.cloneNode(true);
        firstCard.querySelector('.card__img').setAttribute('src', cardsList[i].link);
        firstCard.querySelector('.card__img').setAttribute('alt', cardsList[i].name);
        firstCard.addEventListener('click', openCard);
        secondCard.querySelector('.card__img').setAttribute('src', cardsList[i].link);
        secondCard.querySelector('.card__img').setAttribute('alt', cardsList[i].name);
        secondCard.addEventListener('click', openCard);
        cards.push(firstCard, secondCard);
    }

    const randomCards = makeCardsRandom(cards, Math.round(Math.random() * (5 - 2) + 2));
    randomCards.forEach((item) => playGround.append(item));
    document.querySelector('.content').append(playGround);
}

function makeCardsRandom(cards, times) {
    const firstCards = cards.slice(0, cards.length / 2);
    const secondCards = cards.slice(cards.length / 2)

    for (let i = 0; i < (cards.length / 2); i++) {
        firstCards.splice(Math.round(Math.random()), 0, secondCards[i]);
    }

    if (times) {
        return makeCardsRandom(firstCards, times - 1);
    } else {
        return firstCards;
    }
}

export {
    enterGameRoom,
    createGameRoom
}