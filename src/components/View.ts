import { App } from "./App";
import { TemplateBuilder } from "./TemplateBuilder";
import { ViewMenu } from "./ViewMenu";

export class View {

    constructor(
        private element: HTMLElement,
        private menu: ViewMenu
    ) {}

    init(): void {
        if (window.innerWidth > 675) {
            this.element.append(this.menu.render());
            this.element.insertAdjacentHTML('afterbegin', TemplateBuilder.createHeader('FilpCatflop'));
            this.element.insertAdjacentHTML('beforeend', TemplateBuilder.createFooter('v2', 'created by mute'));
        }

        if (window.innerWidth <= 675) {
            this.element.append(
                this.menu.render()
            );
        }
    }

    
}