class BulletExplosion extends Entity {
    constructor(x, y) {
        super(x, y)

        this.clock = new Clock();
        this.opacity = 1;

        this.bulletExplosionSpriteSheet = GameSettings.TEXTURES.spriteSheets.bulletExplosion.copy();
        this.bulletExplosionAnimation = new Animation(this.bulletExplosionSpriteSheet, "bulletExplosion", 0.5, false);

        this.animator    = this.addComponent(new Animator(AnimationsConf.bulletExplosion));
        this.audioSource = this.addComponent(new AudioSource());

        this.audioSource.addAudio(GameSettings.AUDIOS.bulletExplosion.clone(), "bulletExplosion");
        this.animator.addAnimation(this.bulletExplosionAnimation);
        
        this.addComponent(new Renderable(new AnimationRenderer()));
        
        this.setLayer(9);

        this.audioSource.play("bulletExplosion");
    }

    update() {
        this.opacity -= this.clock.getTime() * 0.1;

        if (this.opacity <= 0) {
            this.opacity = 0;
            this.kill();
        }

        this.bulletExplosionSpriteSheet.setOpacity(this.opacity);
    }
}