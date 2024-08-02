const card_flip = new Audio('https://assets.mixkit.co/active_storage/sfx/2073/2073-preview.mp3');
const bg_music = new Audio('https://cdn1.suno.ai/54eebe42-a356-423c-ae5f-976fedf7363c.mp3');
const victory = new Audio('https://cdn.freesound.org/previews/404/404025_4146089-lq.mp3');
victory.volume = 0.4;
card_flip.volume = 0.4;
bg_music.volume = 0.4;
bg_music.loop = true;

function playVictorySound(status) {
    if (status) {
        bg_music.pause();
        victory.play();
    }
}

function playBGMusic(status) {
    if (status == 2) {
        bg_music.play();
    }
}

function playCardFlipSound(status) {
    if (status) {
        card_flip.play();
    }
}

export {
    playVictorySound,
    playBGMusic,
    playCardFlipSound
}