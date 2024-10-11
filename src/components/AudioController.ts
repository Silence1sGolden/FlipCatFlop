export interface Settings {
    music: {
        status: boolean,
        volume: number
    },
    sounds: {
        status: boolean,
        volume: number
    }
}

type MainAudio = {
    music: Record<string, any>,
    sounds: Record<string, any>
}

type AudioType = 'music' | 'sounds';

export class AudioController {
    private audio: MainAudio = {
        music: {},
        sounds: {}
    };
    private settings: Settings = {
        music: {
            status: false,
            volume: 0
        },
        sounds: {
            status: false,
            volume: 0
        }
    }

    constructor(
        musicLinks: MainAudio,
    ) {
        for (const key in musicLinks.music) {
            this.audio.music[key] = new Audio(musicLinks.music[key]);
            this.audio.music[key].volume = this.settings.music.volume;
        }
        for (const key in musicLinks.sounds) {
            this.audio.sounds[key] = new Audio(musicLinks.sounds[key]);
            this.audio.sounds[key].volume = this.settings.sounds.volume;
        }
    }

    getSettings(): Settings {
        return this.settings;
    }

    play(category: AudioType, name: string): void {
        if (this.audio[category][name]) {
            this.audio[category][name].play();
        }
    }

    pause(category: AudioType, name: string): void {
        if (this.audio[category][name]) {
            this.audio[category][name].pause();
        }
    }

    repeatOn(category: AudioType, name: string): void {
        if (this.audio[category][name]) {
            this.audio[category][name].loop = true;
        }
    }

    repeatOff(category: AudioType, name: string): void {
        if (this.audio[category][name]) {
            this.audio[category][name].loop = false;
        }
    }

    toggle(category: AudioType): void {
        if (this.settings[category].status) {
            this.settings[category].status = false;
            this.setVolume(category, 0);
        } else {
            this.settings[category].status = true;
        }
    }

    setVolume(category: AudioType, volume: number): void {
        if (volume > 1) volume = 1;
        if (volume < 0) volume = 0;
        for (const key in this.audio[category]) {
            this.audio[category][key].volume = volume;
        }
        this.settings[category].volume = volume;
    }
}