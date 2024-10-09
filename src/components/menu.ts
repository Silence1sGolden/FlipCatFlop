import { EventEmitter } from "./EventEmitter";

type MenuElement = {
    element: HTMLElement,
    name: string,
    children?: MenuElement[]
}

export class Menu {
    private flattenMenu: MenuElement[];
    private menu: MenuElement[];

    constructor(
        private element: HTMLElement,
        private emitter: EventEmitter,
        private backButtonElement: HTMLElement,
        menu: MenuElement[]
    ) {
        this.menu = menu;
        this.flattenMenu = this.flatMenu(menu);
    }

    init(): void {
        this.menu.forEach(elem => elem.element.onclick = () => this.emitter.emit(`menu:${elem.name}`));
        this.appendChildren(this.menu);
    }

    private appendChildren(data: MenuElement[]): void {
        this.element.replaceChildren(...data.map(elem => {
            elem.element.onclick = () => this.emitter.emit(`menu:${elem.name}`)
            return elem.element;
        }));
    }

    private addBackButton(name: string): void {
        this.backButtonElement.onclick = () => this.emitter.emit('menu:back', {name: name});
        this.element.prepend(this.backButtonElement);
    }

    private flatMenu(data: MenuElement[]): MenuElement[] {
        const a: any = [];
        data.forEach(elem => {
            if (elem.children) {
                a.push(elem, ...this.flatMenu(elem.children));
            } else {
                a.push(elem);
            }
        })
        return a;
    }

    findElement(data: string): MenuElement | undefined {
        return this.flattenMenu.find(elem => elem.name === data);
    }

    findPreviw(data: string): MenuElement | undefined {
        const e = this.flattenMenu.find(elem => elem.name === data);
        
        if (e) {
            const i = this.flattenMenu.indexOf(e);
            if (i === 0) return {
                element: this.element,
                name: 'menu',
                children: this.menu
            };
            return this.flattenMenu[i - 1];
        }

        return undefined;
    }

    next(name: string): void {
        this.findElement(name);
        if (name === 'menu') {

            this.appendChildren(this.menu);
        } else {
            const next = this.findElement(name);

            if (next) {
                if (next.children) this.appendChildren(next.children);
                this.addBackButton(name);
            }
        }
    }

}