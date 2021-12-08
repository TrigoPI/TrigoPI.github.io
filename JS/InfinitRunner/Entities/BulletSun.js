class BulletSun extends Entity {
    constructor(x, y) {
        super(x, y);

        this.clock = new Clock();
        this.timeToLive = 15;

        this.direction = new Vector2();

        this.width = 20;
        this.height = 20;

        this.bulletSunSpriteSheet = GameSettings.TEXTURES.spriteSheets.bullet2.copy();
        this.bulletSunAnimation = new Animation(this.bulletSunSpriteSheet, "bullet2", 1);

        this.transform = this.getComponent(Transform);
        this.rigidBody = this.addComponent(new RigidBody());
        this.collider = this.addComponent(new Collider(this.width, this.height, "BULLET_SUN"));
        this.animator = this.addComponent(new Animator(AnimationsConf.bullet2));

        this.rigidBody.setGravityScale(0);

        this.collider.setCollisionMask("bullet");
        this.setLayer(7);

        this.animator.addAnimation(this.bulletSunAnimation);
        
        this.addComponent(new Renderable(new AnimationRenderer()));
    }

    setDirection(direction) {
        this.transform.rotation = Math.atan2(direction.y, direction.x);

        direction.setMag(200);
    
        this.direction = direction;
    }

    onCollision(collider) {
        if (collider.tag == "PLAYER_BULLET") {
            this.instantiate(new BulletExplosion(this.transform.position.x, this.transform.position.y));

            this.kill();
        }
    }

    update() {
        this.rigidBody.velocity = this.direction;

        if (this.clock.getTime() > this.timeToLive) {
            this.kill();
        }
    }
}