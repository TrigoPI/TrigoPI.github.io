class Bullet extends Entity {
    constructor(x, y, tag) {
        super(x, y);

        this.size = 10;
        this.timeToLive = 3;

        this.clock = new Clock();
        this.direction = new Vector2();

        this.bulletSpriteSheet = GameSettings.TEXTURES.spriteSheets.bullet1.copy();
        this.bulletAnimation = new Animation(this.bulletSpriteSheet, "bullet", 0.5);

        this.transform = this.getComponent(Transform);
        this.rigidBody = this.addComponent(new RigidBody());
        this.collider  = this.addComponent(new Collider(this.size, this.size, tag));
        this.animator  = this.addComponent(new Animator(AnimationsConf.bullet));

        this.animator.addAnimation(this.bulletAnimation)

        this.rigidBody.setGravityScale(0);
        this.collider.setCollisionMask("bullet");

        this.setLayer(7);

        this.addComponent(new Renderable(new AnimationRenderer()));
    }

    setDirection(direction) {
        this.transform.rotation = Math.atan2(direction.y, direction.x);
        
        direction.setMag(1000);
    
        this.direction = direction;
    }

    killBullet() {
        this.instantiate(new BulletExplosion(this.transform.position.x, this.transform.position.y));
        this.kill();
    }

    onCollision(collider) {
        if (collider.tag == "PLATFORM" || collider.tag == "PNJ" || collider.tag == "PLAYER_SHIELD") {
            this.killBullet();
        }

        if (this.collider.tag == "PLAYER_BULLET") {
            if (collider.tag == "BOSS") {
                this.killBullet();
            }
        }

        if (this.collider.tag == "BOSS_BULLET") {
            if (collider.tag == "PLAYER") {
                this.killBullet();
            }
        }
    }

    update() {
        this.rigidBody.velocity = this.direction;

        if (this.clock.getTime() > this.timeToLive) {
            this.kill();
        }
    }
}