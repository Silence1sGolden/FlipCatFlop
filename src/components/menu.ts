type Language = 'ru' | 'en';

interface ISettings {
    music: boolean;
    sounds: boolean;
    musicValue: number;
    soundsValue: number;
    language: Language;
}

export class App {
    private settings: ISettings;
    private modal: Modal;
    private game: Game;

    constructor(settings?: ISettings) {
        if (settings) {
            this.settings = settings;
        } else {
            this.settings = {
                music: false,
                sounds: false,
                musicValue: 0,
                soundsValue: 0,
                language: 'ru'
            }
        }
    }
}