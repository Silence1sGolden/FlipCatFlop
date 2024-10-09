import { TemplateBuilder } from "./builder";

interface Settings {
    music: boolean,
    sounds: boolean,
    musicVolume: number,
    soundsVolume: number
}

export class App {

    constructor(private element: HTMLElement, private settings: Settings = {
        music: false,
        sounds: false,
        musicVolume: 100,
        soundsVolume: 100
    }) {}

    init() {
        if (window.innerWidth <= 675) {
            this.element.insertAdjacentHTML('afterbegin', TemplateBuilder.createEntryForm());
        } else {
            this.element.insertAdjacentHTML('afterbegin', TemplateBuilder.createHeader('FlipCatFlop') + TemplateBuilder.createEntryForm() + TemplateBuilder.createFooter('v2', 'created by mute'))
        }
    }

    toggleMusic() {
        this.settings.music = !this.settings.music;
    }

    toggleSounds() {
        this.settings.sounds = !this.settings.sounds;
    }

    setMusicVolume(vol: number) {
        this.settings.musicVolume = vol;
    }

    setSoundsVolume(vol: number) {
        this.settings.soundsVolume = vol;
    }

    render() {
        return this.element;
    }
}