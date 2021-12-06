class Smoke extends Entity {
    constructor(x, y) {
        super(x, y);

        this.smokeSpriteSheet = GameSettings.TEXTURES.spriteSheets.smoke.copy();
        this.smokeAnimation = new Animation(this.smokeSpriteSheet, "smoke", 1, false);

        this.transform = this.getComponent(Transform);
        this.animator = this.addComponent(new Animator(AnimationsConf.smoke));
        
        this.animator.addAnimation(this.smokeAnimation);

        this.smokeSpriteSheet.scale(3);

        this.addComponent(new Renderable(new AnimationRenderer()));
    }

    update() {
        if (this.animator.isFinish()) {
            this.kill();   
        }
    }
}