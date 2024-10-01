import { icons } from './icons.js';

function showDiff(target) {
    target.insertAdjacentHTML('beforeend', `
        <ul>
            <li class="menu__button">
                <img class="menu__img" src="#easy" alt="easy">
                <p class="menu__text">Easy</p>
            </li>
            <li class="menu__button">
                <img class="menu__img" src="#medium" alt="medium">
                <p class="menu__text">Medium</p>
            </li>
            <li class="menu__button">
                <img class="menu__img" src="#hard" alt="hard">
                <p class="menu__text">Hard</p>
            </li>
        </ul>
    `);
}

export {
    showDiff
}