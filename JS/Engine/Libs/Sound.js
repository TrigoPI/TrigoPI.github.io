class Sound {
    constructor(path, volume = 100) {
        this.volume = volume;
        this.path = path;
        this.audio = new Audio(path);
    }

    clone() {
        let sound = new Sound("");

        sound.path  = this.path;
        sound.audio = this.audio.cloneNode(true); 

        return sound;
    }
    
    isFinish() {
        return this.audio.ended;
    }

    setVolume(value) {
        console.assert(value >= 0 && value <= 100, "error value : [0, 100]");

        this.volume = value;
        this.audio.volume = value / 100;
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    play() {
        this.audio.play();
    }
}