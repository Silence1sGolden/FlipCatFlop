import flopImg from '../img/flop.png';
const flop = flopImg;

function createEntryForm(submitForm) {
    const entryForm = document.querySelector('#entry-form').content.cloneNode(true);
    const header = document.querySelector('#header').content.cloneNode(true);
    const footer = document.querySelector('#footer').content.cloneNode(true);

    entryForm.querySelector('.form').addEventListener('submit', submitForm);

    document.querySelector('.content').append(header, entryForm, footer);
}

function isMobile() {
    return (window.innerWidth <= 375) ? true : false;
}

function clearContent() {
    if (isMobile()) {
        Array.from(document.querySelector('.content').children).forEach((item) => {
            if (item.classList.contains('footer')
                || item.classList.contains('header')
                || item.classList.contains('playground')
                || item.classList.contains('form')
            ) {
                item.remove();
            }
        })
    } else {
        Array.from(document.querySelector('.content').children).forEach((item) => {
            if (item.classList.contains('playground') || item.classList.contains('form')) {
                item.remove();
            }
        })
    }
}

function createGameRoom(playGroundSize, openCard, gameCards) {
    clearContent();

    const playGroundElement = document.querySelector('#playground').content.cloneNode(true);
    const playGround = playGroundElement.querySelector('.playground');
    const playGroundHeader = playGround.querySelector('.playground-header');
    const playGroundMenu = document.querySelector('#menu').content.cloneNode(true);
    const playGroundPlace = playGround.querySelector('.playground__place');
    const cardTemplate = document.querySelector('#card').content;

    playGroundPlace.classList.add(getPlaceSize(playGroundSize));

    if (isMobile()) {
        playGround.append(playGroundMenu);
    } else {
        playGroundHeader.querySelector('.playground__header-item').before(playGroundMenu);
    }

    for (let i = 0; i < playGroundSize * 2; i++) {
        const newCard = cardTemplate.cloneNode(true);
        if (isMobile()) {
            newCard.querySelector('.card').classList.add(getCardSize(playGroundSize));
        }
        newCard.querySelector('.card').addEventListener('click', (evt) => {
            openCard(evt);
            giveCardInformation(evt, gameCards);
        });
        playGroundPlace.append(newCard);
    }

    document.querySelector('.content').append(playGround);
}

function getPlaceSize(playGroundSize) {
    if (playGroundSize == 6) return 'playground__place-s';
    if (playGroundSize == 12) return 'playground__place-m';
    if (playGroundSize == 18) return 'playground__place-l';
}

function getCardSize(playGroundSize) {
    if (playGroundSize == 6) return 'card_large';
    if (playGroundSize == 12) return 'card_medium';
    if (playGroundSize == 18) return 'card_small';
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
    const arr = cardList;
    const result = [];

    for (let i = 0; i < playGroundSize; i++) {
        const num = getRandomNum(arr.length - 1);
        const card = arr[num];
        result.push(card, card);
        arr.splice(num, 1);
    }

    return result;
}

function getRandomNum(max) {
    return Math.round(Math.random() * (max - 0) + 0)
}

export {
    createEntryForm,
    createGameRoom,
    makeCardsRandom,
    fillPlayingCards
}