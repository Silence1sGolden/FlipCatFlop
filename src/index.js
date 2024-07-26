import './index.css';

import { enterGameRoom, createGameRoom, fillPlayingCards } from "./components/rooms.js";
import { cardsList } from "./components/cardsList.js";
import { openCard } from "./components/card.js";

const enterForm = document.forms['start-form'];
let gameCards;

enterForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    enterGameRoom();
    gameCards = fillPlayingCards(cardsList, enterForm.place.value);
    createGameRoom(enterForm.place.value, openCard, gameCards);
})