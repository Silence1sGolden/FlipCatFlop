import { enterGameRoom, createGameRoom } from "./components/rooms.js";
import { cardsList } from "./components/cardsList.js";
import { openCard } from "./components/card.js";

const enterForm = document.forms['start-form'];

enterForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    enterGameRoom();
    createGameRoom(enterForm.place.value, cardsList, openCard);
})