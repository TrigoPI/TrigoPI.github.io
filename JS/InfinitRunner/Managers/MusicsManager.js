class MusicsManager extends Entity {
    constructor() {
        super(0, 0);

        this.audioSource = this.addComponent(new AudioSource());
        this.mainMusic = GameSettings.AUDIOS.mainMusic.clone();

        this.mainMusic.setVolume(40);
        this.audioSource.addAudio(this.mainMusic, "mainMusic");
    }

    setVolume(volume) {
        this.mainMusic.setVolume(volume);
    }

    play() {
        if (this.audioSource.isStarted("mainMusic")) {
            this.audioSource.play("mainMusic");
        }
    }

    stop() {
        this.audioSource.stop("mainMusic");
    }

    update() {
        if (this.audioSource.isFinish("mainMusic")) {
            this.audioSource.play("mainMusic");
        }
    }
}