class AudioSource {
    constructor() {
        this.sounds = {};
    }

    randomPlay(audioList, probabilities) {
        let index = Settings.RANDOM_INDEX(probabilities);

        this.play(audioList[index]);

        return audioList[index];
    }

    isFinish(name) {
        return this.sounds[name].audio.ended;
    }

    isStarted(name) {
        return this.sounds[name].audio.currentTime == 0;
    }

    addAudio(sound, name) {
        this.sounds[name] = sound;    
    }

    stop(name) {
        console.assert(this.sounds[name] != undefined, `No audio with name : ${name}`);

        this.sounds[name].stop();
    }

    play(name) {
        console.assert(this.sounds[name] != undefined, `No audio with name : ${name}`);

        this.sounds[name].play();
    }
}