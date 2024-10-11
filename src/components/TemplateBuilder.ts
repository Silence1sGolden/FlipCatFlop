import { main } from "../types/main";
import { MenuElement } from "./ViewMenu";

interface ICard {
    src: string;
    alt: string;
}

export abstract class TemplateBuilder {
    constructor() {}

    static createMenuElement(src: string, alt: string,): HTMLElement {
        const d = document.createElement('div');
        d.classList.add('menu__item');
        const img = document.createElement('img');
        img.classList.add('menu__img');
        img.src = src;
        img.alt = alt;
        d.append(img);
        return d;
    }

    static createMenuItem(src: string, name: string, children: MenuElement[]): MenuElement {
        return {
            element: this.createMenuElement(src, name),
            name: name,
            children: children
        };
    }

    static createCard(front: ICard, back: ICard): string {
        return `
            <div class="card">
                <div class="card__side card__side_front">
                    <img class="card__img" src="" alt="">
                </div>
                <div class="card__side card__side_back">
                     <img class="card__img card__img_backside" src="" alt="">
                </div>
            </div>
        `;
    }

    static createHeader(title: string): string {
        return `
            <header class="header">
                <h1 class="header__title">${title}</header>
            </header>
        `;
    }

    static createFooter(version: string, description: string): string {
        return `
            <div class="footer">
                <p class="footer__text">${version}</p>
                <p class="footer__text">${description}</p>
            </div>
        `;
    }

    static createEntryForm(): string {
        return `
            <form class="form" name="start-form">
            <p class="form__title">Select the difficulty</p>
            <ul class="form__level-difficult-list">
                <li class="form__item">
                    <label class="form__label">
                        <img class="form__img" src="" alt="easy" draggable="false">
                        <input class="form__radio visually-hidden" name="place" type="radio" value="6" checked/>
                        Easy
                    </label>
                </li>
                <li class="form__item">
                    <label class="form__label">
                        <img class="form__img" src="" alt="medium" draggable="false">
                        <input class="form__radio visually-hidden" name="place" type="radio" value="10"/>
                        Medium
                    </label>
                </li>
                <li class="form__item">
                    <label class="form__label" for="hard">
                        <img class="form__img" src="" alt="hard" draggable="false">
                        <input class="form__radio visually-hidden" name="place" type="radio" value="15" id="hard"/>
                        Hard
                    </label>
                </li>
            </ul>
            <input class="button form__submit-button" type="submit" value="Play!" />
        </form>
        `;
    }
}