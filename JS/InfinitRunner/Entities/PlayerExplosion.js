class PlayerExplosion extends Entity {
    constructor(x, y) {
        super(x, y);

        this.explosionAudio = GameSettings.AUDIOS.explosionStart.clone();
        this.explosionSpriteSheet = GameSettings.TEXTURES.spriteSheets.explosion1.copy();
        this.explosionAnimation   = new Animation(this.explosionSpriteSheet, "explosion1", 1);

        this.audioSource = this.addComponent(new AudioSource()); 
        this.animator = this.addComponent(new Animator(AnimationsConf.explosion1));

        this.explosionSpriteSheet.scale(6);
        this.explosionAudio.setVolume(40);

        this.animator.addAnimation(this.explosionAnimation);
        this.audioSource.addAudio(GameSettings.AUDIOS.explosionStart.clone(), "explosionStart");

        this.addComponent(new Renderable(new AnimationRenderer()));
        this.setLayer(7);

        this.audioSource.play("explosionStart");
    }

    update() {
        if (this.animator.isFinish()) {
            this.kill();
        }
    }
}