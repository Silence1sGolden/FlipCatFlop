import './index.css';
import { App } from "./components/app";
import { Menu } from './components/menu';
import { EventEmitter } from './components/EventEmitter';
import { TemplateBuilder } from './components/builder';

const content = document.querySelector('.content') as HTMLElement;

const app = new App(content);

app.init();

const b = document.createElement('div');
document.body.append(b);
const BB = TemplateBuilder.createMenuElement('https://i.pinimg.com/564x/63/d9/a0/63d9a0f0ca26a6a3da699c91132aa03d.jpg', 'back');
const emitter = new EventEmitter();
emitter.on('menu:play', () => menu.next('play'));
emitter.on('menu:easy', () => menu.next('easy'));
emitter.on('menu:easy2', () => prompt('gay?', 'yes'));
emitter.on('menu:back', (prop) => {
    const a = menu.findPreviw(prop.name);
    if (a) {
        menu.next(a.name);
    }
});

const menu = new Menu(b, emitter, BB, [
    {
        element: TemplateBuilder.createMenuElement('https://i.pinimg.com/564x/4b/17/ea/4b17ea46cbe2c37319158d281d988050.jpg', 'play'),
        name: 'play',
        children: [
            {
                element: TemplateBuilder.createMenuElement('https://i.pinimg.com/736x/48/a8/b8/48a8b8c5b85c3899665307af15efb9f9.jpg', 'easy'),
                name: 'easy',
                children: [
                    {
                        element: TemplateBuilder.createMenuElement('https://i.pinimg.com/736x/60/a5/41/60a541b934c7563aa56a50b494e1d599.jpg', 'easyy'),
                        name: 'easy2',
                    }
                ]
            }
        ]
    }
]);

menu.init();