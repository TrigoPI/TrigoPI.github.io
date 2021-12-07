class GroundAttack extends Attack {
    constructor(x, y) {
        super(x, y);

        this.width = 50;
        this.height = 50;

        this.groundFireSpriteSheet = GameSettings.TEXTURES.spriteSheets.groundFire.copy();
        this.groundFireAnimation = new Animation(this.groundFireSpriteSheet, "groundFire", 1);

        this.transform = this.getComponent(Transform);
        this.rigidBody = this.addComponent(new RigidBody());
        this.collider = this.addComponent(new Collider(this.width, this.height, "GROUND_FIRE"));
        this.animator = this.addComponent(new Animator(AnimationsConf.groundFire));
        
        this.collider.setCollisionMask("groundFire");
        this.groundFireSpriteSheet.scale(1.5);

        this.animator.addAnimation(this.groundFireAnimation);

        this.addComponent(new Renderable(new AnimationRenderer()));

        this.finished = true;
    }
}