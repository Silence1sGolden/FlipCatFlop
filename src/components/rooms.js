function enterGameRoom() {
    const form = document.querySelector('.form');
    form.remove();
}

function createGameRoom(playGroundSize, openCard, gameCards) {
    const playGround = document.createElement('div');
    playGround.classList.add('play-ground');
    if (playGroundSize === '8') {
        playGround.classList.add('play-ground_size-small');
    } else {
        playGround.classList.add('play-ground_size-big');
    }
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card');
    const cards = [];

    for(let i = 0; i < playGroundSize * 2; i++) {
        const card = cardElement.cloneNode(true);
        card.querySelector('.card__img').setAttribute('src', '../src/img/cheater.png');
        card.querySelector('.card__img').setAttribute('alt', 'cheater');
        card.addEventListener('click', (evt) => {
            openCard(evt);
            giveCardInformation(evt, gameCards);
        });
        cards.push(card);
    }

    cards.forEach((item) => {
        playGround.append(item);
    })
    document.querySelector('.content').append(playGround);
}

function giveCardInformation(evt, gameCards) {
    evt.target.closest('.card').classList.toggle('this');
    const cardsArray = Array.from(document.querySelectorAll('.card'));
    const b = cardsArray.findIndex((item) => {
        if (item.classList.contains('this')) {
            evt.target.closest('.card').classList.toggle('this');
            return true;
        }
        return false;
    });
    if (b != -1) {
        const img = evt.target.closest('.card').querySelector('.card__img');
        img.setAttribute('src', gameCards[b].src);
        img.setAttribute('alt', gameCards[b].name);
    }
}

function makeCardsRandom(cards, times) {
    const firstCards = cards.slice(0, cards.length / 2);
    const secondCards = cards.slice(cards.length / 2)

    for (let i = 0; i < (cards.length / 2); i++) {
        firstCards.splice(Math.round(Math.random() * (12 - 0) + 0), 0, secondCards[i]);
    }

    if (times) {
        return makeCardsRandom(firstCards, times - 1);
    } else {
        return firstCards;
    }
}

function fillPlayingCards(cardList, playGroundSize) {
    const arr = [];
    const a = new Set();
    for (let i = 0; i < playGroundSize; i++) {
        const card = getRandomCard(cardList);
        if (a.has(card.name)) {
            --i;
            continue;
        } else {
            a.add(card.name);
            arr.push(card, card);
        }
    }
    
    return makeCardsRandom(arr, Math.round(Math.random() * (5 - 2) + 2));;
}

function getRandomCard(cardList) {
    return cardList[Math.round(Math.random() * (12 - 0) + 0)];
}

export {
    enterGameRoom,
    createGameRoom,
    makeCardsRandom,
    fillPlayingCards
}