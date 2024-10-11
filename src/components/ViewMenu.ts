import { EventEmitter } from "./EventEmitter";

export interface MenuElement {
    element: HTMLElement,
    name: string,
    children: MenuElement[]
}

export class ViewMenu {
    private flattenMenu: MenuElement[];
    private menu: MenuElement;

    constructor(
        private element: HTMLElement,
        private emitter: EventEmitter,
        private backButtonElement: HTMLElement,
        menu: MenuElement[]
    ) {
        this.menu = {
            element: element,
            name: 'menu',
            children: menu
        };
        this.flattenMenu = this.flatMenu(this.menu);
        this.appendChildren(this.menu);
        this.addClickEventToChildren(this.menu);
    }

    private appendChildren(data: MenuElement): void {
        this.element.replaceChildren(...data.children.map(elem => {
            return elem.element;
        }));
        this.addClickEventToChildren(data);
    }

    private addClickEventToChildren(data: MenuElement): void {
        data.children?.forEach(elem => elem.element.onclick = () => {
            this.next(elem.name);
        });
    }

    private addBackButton(name: string): void {
        this.element.prepend(this.backButtonElement);
        this.backButtonElement.onclick = () => {
            this.back(name);
        };
    }

    private flatMenu(data: MenuElement): MenuElement[] {
        const a: MenuElement[] = [];
        data.children.forEach(elem => {
            (elem.children.length !== 0) ? a.push(elem, ...this.flatMenu(elem)) : a.push(elem);
        })
        return a;
    }

    private findElement(data: string): MenuElement | undefined {
        return this.flattenMenu.find(elem => elem.name === data);
    }

    private findPreviw(data: string): MenuElement | undefined {
        const e = this.findElement(data);

        if (e) {
            const i = this.flattenMenu.indexOf(e);
            if (this.flattenMenu[i - 1]?.children.includes(e)) return this.flattenMenu[i - 1];
            return this.menu;
        }

        return undefined;
    }

    private back(name: string): void {
        const prev = this.findPreviw(name);

        if (prev) {
            this.appendChildren(prev);
            if (prev.name !== 'menu') {
                this.addBackButton(name);
            }
    
            this.emitter.emit(`menu:back`, { name: prev.name} );
        }
    }

    private next(name: string): void {
        const next = this.findElement(name);

        if (next) {
            if (next.children.length !== 0) {
                this.appendChildren(next);
                this.addBackButton(name);
            }
            this.emitter.emit('menu:next');
            this.emitter.emit(`menu:${name}`);
        }
    }

    render(): HTMLElement {
        return this.element;
    }
}