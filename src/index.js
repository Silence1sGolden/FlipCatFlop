import './index.css';

import { createGameRoom, fillPlayingCards, createEntryForm } from "./components/rooms.js";
import { cardsList } from "./components/cardsList.js";
import { openCard } from "./components/card.js";
let gameCards;

createEntryForm(submitForm);

function submitForm(evt) {
    evt.preventDefault();
    const playGroundSize = document.forms['start-form'].place.value;
    const gameCards = fillPlayingCards(cardsList, playGroundSize);
    createGameRoom(playGroundSize, openCard, gameCards);
}