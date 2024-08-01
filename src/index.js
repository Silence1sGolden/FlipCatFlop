import './index.css';
import { cardsList } from './components/cardsList.js';
import { openCard } from './components/card.js';
import { audio } from './components/audio.js';

const content = document.querySelector('.content');
const headerTemplate = document.querySelector('#header').content;
const footerTemplate = document.querySelector('#footer').content;
const entryFormTemplate = document.querySelector('#entry-form').content;
const playgroundTemplate = document.querySelector('#playground').content;
const menuTemplate = document.querySelector('#menu').content;
const cardTemplate = document.querySelector('#card').content;
const winTemplate = document.querySelector('#win').content;
const bgMusic = new Audio(audio.find((item) => {
    if (item.name == 'bg_music') {
        return true;
    } else {
        return false;
    }
}).src)
const victory = new Audio(audio.find((item) => {
    if (item.name == 'victory') {
        return true;
    } else {
        return false;
    }
}).src)
const playWith = document.querySelector('#playWith');
const dontPlay = document.querySelector('#dontPlay');
const playMusicQuestionModal = document.querySelector('.play-music-question');

playWith.addEventListener('click', () => {
    playMusicQuestionModal.classList.add('play-music-question_hide');
    playBGMusic(true);
})
dontPlay.addEventListener('click', () => {
    playMusicQuestionModal.classList.add('play-music-question_hide');
    playBGMusic(false);
})

function areYouWinnig(counter) {
    if (counter == 0) {
        playVictorySound();
        const win = winTemplate.cloneNode(true);
        const place = document.querySelector('.playground__place');
        place.classList.add('disabled');
        place.append(win);
    }
}

function playVictorySound() {
    playBGMusic(false);
    victory.volume = 0.4;
    victory.play();
}

function playBGMusic(status) {
    if (status) {
        bgMusic.loop = true;
        bgMusic.volume = 0.5;
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
}

function createEntryForm() {
    // Клонируем формы
    const header = headerTemplate.cloneNode(true);
    const footer = footerTemplate.cloneNode(true);
    const entryForm = entryFormTemplate.cloneNode(true);
    // Добавляем слушатель на форму
    entryForm.querySelector('.form').addEventListener('submit', startGame);
    // Заливаем всё в документ
    document.querySelector('.content').append(header, entryForm, footer);
}

function startGame(evt) {
    // Отключаем дефолтное поведение формы
    evt.preventDefault();
    // Получаем размер игрового поля из формы
    const playGroundSize = document.forms['start-form'].place.value;
    // Очищаем документ
    clearContent(isMobile());
    // Создаём игровую комнату
    createGameRoom(playGroundSize);
    // Заполняем игровое поле карточками
    fillPlayground(playGroundSize, getRandomCards(playGroundSize));
}

function createGameRoom(playGroundSize) {
    // Создаём клоны нового ИГРОВОГО ПОЛЯ и МЕНЮ
    const playGround = playgroundTemplate.cloneNode(true);
    const playGroundMenu = menuTemplate.cloneNode(true);
    // Получаем HEADER и PLACE
    const playGroundHeader = playGround.querySelector('.playground__header');
    const playGroundPlace = playGround.querySelector('.playground__place');
    // Находим счётчик карточек и присваиваем ему кол-во карточек
    const counter = playGroundHeader.querySelector('#cards');
    counter.textContent = playGroundSize;
    // Получаем массив кнопок МЕНЮ
    const buttonsArr = Array.from(playGroundMenu.querySelectorAll('.menu__button'));
    // Присваиваем класс в зависимости от выбранного размера
    playGroundPlace.classList.add(getPlaceSize(playGroundSize));
    // Добавляем кнопкам МЕНЮ слушатели
    buttonsArr[0].addEventListener('click', () => {
        clearContent(true);
        createEntryForm();
    })
    buttonsArr[1].addEventListener('click', () => {
        resetPlayGround(playGroundSize);
    })
    // Добавляем меню в игровое поле в зависимости от устройства
    // Заливаем игровое поле в документ в зависимости от устройства
    if (isMobile()) {
        playGround.querySelector('.playground').append(playGroundMenu);
        content.append(playGround);
    } else {
        playGroundHeader.querySelector('.playground__header-item').after(playGroundMenu);
        document.querySelector('.header').after(playGround);
    }
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

function resetPlayGround(playGroundSize) {
    playBGMusic(true);
    document.querySelector('#cards').textContent = playGroundSize;
    document.querySelector('.playground__place').classList.remove('disabled');
    Array.from(document.querySelector('.playground__place').children).forEach((item) => {
        item.remove();
    })
    fillPlayground(playGroundSize, getRandomCards(playGroundSize));
}

function fillPlayground(playGroundSize, gameCards) {
    const playGroundPlace = document.querySelector('.playground__place');
    const status = isMobile();
    for (let i = 0; i < playGroundSize * 2; i++) {
        const newCard = cardTemplate.cloneNode(true);
        if (status) {
            newCard.querySelector('.card').classList.add(getCardSize(playGroundSize));
        }
        newCard.querySelector('.card').addEventListener('click', (evt) => {
            openCard(evt);
            giveCardInformation(evt, gameCards);
        });
        playGroundPlace.append(newCard);
    }
}

function getCardSize(playGroundSize) {
    if (playGroundSize == 6) return 'card_large';
    if (playGroundSize == 10) return 'card_medium';
    if (playGroundSize == 15) return 'card_small';
}

function getPlaceSize(playGroundSize) {
    if (playGroundSize == 6) return 'playground__place-s';
    if (playGroundSize == 10) return 'playground__place-m';
    if (playGroundSize == 15) return 'playground__place-l';
}

function getRandomCards(playGroundSize) {
    const arr = JSON.parse(JSON.stringify(cardsList));
    const result = [];

    for (let i = 0; i < playGroundSize; i++) {
        const num = getRandomNum(arr.length - 1);
        const card = arr[num];
        result.push(card, card);
        arr.splice(num, 1);
    }

    return makeCardsRandom(result, Math.round(Math.random() * (5 - 2) + 2));
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

function clearContent(all) {
    if (all) {
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

function getRandomNum(max) {
    return Math.round(Math.random() * (max - 0) + 0)
}

function isMobile() {
    return (window.innerWidth <= 375) ? true : false;
}

createEntryForm();

export {
    areYouWinnig
}