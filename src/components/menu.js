import { icons } from './icons.js';

function hideMenu(target, list) {
    list.forEach((element) => {
        if (element != target) {
            console.log(element != target);
            element.classList.add('menu__item_hide');
        }
    });
}

function openNextMenu(target) {
    const item = target.closest('.menu__item');
    console.log(target);
    item.querySelector('.menu__img').setAttribute('src', icons['arrow-dark']);
    item.nextElementSibling.classList.remove('menu__item_hide');
}

function enebleMenu(list) {
    list.forEach((elem) => {
        if (!elem.classList.contains('menu__item_hide')) {
            elem.addEventListener('click', (evt) => {
                hideMenu(evt.target.closest('.menu__item'), list);
                openNextMenu(evt.target);
            });
        }
    })
}

export {
    enebleMenu
}