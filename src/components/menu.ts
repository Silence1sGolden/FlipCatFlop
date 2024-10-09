import { EventEmitter } from "./EventEmitter";

type MenuElement = {
    element: HTMLElement,
    name: string,
    children?: MenuElement[]
}

export class Menu {
    private current: string;

    constructor(
        private element: HTMLElement,
        private emitter: EventEmitter,
        private backButtonElement: HTMLElement,
        private menu: MenuElement[]
    ) {
        this.current = 'menu';
    }

    init(): void {
        this.menu.forEach(elem => elem.element.onclick = () => this.emitter.emit(`menu:${elem.name}`));
        this.appendChildren(this.menu);
    }

    private setCurrent(data: string): void {
        this.current = data;
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

    findDeep(data: string): number | undefined {
        for (let i = 1; i < 20; i++) {
            if (this.menu.flat(i).map(elem => elem.name).includes(data)) {
                return i;
            }
        }
    }

    findElement(data: string): MenuElement | undefined {
        return this.menu.flat(this.findDeep(data)).find(elem => elem.name === data);
    }

    findPreviw(data: string): MenuElement {
        const result = this.menu.flat(this.findDeep(data)).find(elem => elem.children?.find(item => item.name === data));
        if (result) return result;
        return {
            element: this.element,
            name: 'menu',
            children: this.menu
        };
    }

    next(name: string): void {
        if (name === 'menu') {
            this.setCurrent(name);

            this.appendChildren(this.menu);
        } else {
            const next = this.menu.find((elem) => elem.name === name);

            if (next) {
                this.setCurrent(next.name);
                if (next.children) this.appendChildren(next.children);
                this.addBackButton(name);
            }
        }
    }

}