class Shield extends Entity {
    constructor(x, y) {
        super(x, y);
        
        this.opacity = 0;

        this.width = 20;
        this.height = 150;

        this.shieldSpriteSheet = GameSettings.TEXTURES.spriteSheets.shield.copy();
        this.shieldAnimation = new Animation(this.shieldSpriteSheet, "shield", 1);

        this.transform = this.getComponent(Transform);
        this.rigidBody = this.addComponent(new RigidBody());
        this.collider = this.addComponent(new Collider(x, y, "PLAYER_SHIELD"));
        this.animator = this.addComponent(new Animator(AnimationsConf.shield));

        this.addComponent(new Renderable(new AnimationRenderer()));

        this.animator.addAnimation(this.shieldAnimation);

        this.shieldSpriteSheet.setOpacity(0.5);
        this.shieldSpriteSheet.scale(2);
        this.rigidBody.setGravityScale(0);
        
        this.collider.setCollisionMask("shield");
    }

    update() {
        this.transform.localPosition.set(100, 0);
        this.shieldSpriteSheet.setOpacity(this.opacity);

        if (Settings.MOUSE.buttons.right.pressed) {
            this.collider.width = this.width;
            this.collider.height = this.height;

            if (this.opacity < 0.5) {
                this.opacity += 0.05;
            } else {
                this.opacity = 0.5;
            }
        } else {
            this.collider.width = 0;
            this.collider.height = 0;

            if (this.opacity > 0) {
                this.opacity -= 0.05;
            } else {
                this.opacity = 0;
            }
        }
    }
}