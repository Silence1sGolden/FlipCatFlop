import './index.css';
import { App } from './components/App';
import { ViewMenu } from './components/ViewMenu';
import { EventEmitter } from './components/EventEmitter';
import { TemplateBuilder } from './components/TemplateBuilder';
import { ICONS } from './types/icons';
import { View } from './components/View';
import { AudioController } from './components/AudioController';

const content = document.querySelector('.content') as HTMLElement;

const b = document.createElement('div');
b.classList.add('list');
document.body.append(b);

const BB = document.createElement('div');
BB.classList.add('menu__item');
const img = document.createElement('img');
img.classList.add('menu__img');
img.src = 'https://i.pinimg.com/564x/63/d9/a0/63d9a0f0ca26a6a3da699c91132aa03d.jpg';
img.alt = 'back';
BB.append(img);

const emitter = new EventEmitter();

emitter.on('menu:easy', () => alert('игра началась на уровне сложности: легко'));
emitter.on('menu:medium', () => alert('игра началась на уровне сложности: средне'));
emitter.on('menu:hard', () => alert('игра началась на уровне сложности: сложно'));

const app = new App();
const view = new View(content, new ViewMenu(b, emitter, BB, [
    TemplateBuilder.createMenuItem(ICONS.play, 'play', [
        TemplateBuilder.createMenuItem(ICONS.easy, 'easy', []),
        TemplateBuilder.createMenuItem(ICONS.medium, 'medium', []),
        TemplateBuilder.createMenuItem(ICONS.hard, 'hard', []),
    ]),
    TemplateBuilder.createMenuItem(ICONS.settings, 'settings', [
        TemplateBuilder.createMenuItem(ICONS.music, 'music', []),
        TemplateBuilder.createMenuItem(ICONS.sounds, 'sounds', []),
    ]),
    TemplateBuilder.createMenuItem(ICONS.info, 'info', [

    ])
]))

view.init();

const data = {
    music: {
        background: 'https://cdn1.suno.ai/54eebe42-a356-423c-ae5f-976fedf7363c.mp3'
    },
    sounds: {
        card_flip: 'https://assets.mixkit.co/active_storage/sfx/2073/2073-preview.mp3',
        victory: 'https://cdn.freesound.org/previews/404/404025_4146089-lq.mp3'
    }
}

const audio = new AudioController(data);
const w = document.querySelector('#range') as HTMLInputElement;

audio.play('music', 'background');
audio.repeatOn('music', 'background');

emitter.on('menu:music', () => {
    audio.setVolume('music', +w?.value)
    audio.toggle('music');
})

emitter.on('menu:sounds', () => {
    audio.setVolume('sounds', 1);
    audio.toggle('sounds');
})

emitter.on('menu:next', () => {
    audio.play('sounds', 'card_flip');
});


w?.addEventListener('change', () => {
    if (audio.getSettings().music.status) {
        audio.setVolume('music', +w.value)
    }
})