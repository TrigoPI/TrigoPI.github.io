class PNJ extends Entity {
    constructor(x, y, spriteSheet, camera) {
        super(x, y)
        
        this.alive = true;

        this.deathTimer = new Clock();
        this.opacity = 1;

        this.speed = 70;
        this.width = 20;
        this.height = 160;

        this.spriteSheets = spriteSheet;
        this.camera = camera.getComponent(Camera);
        
        this.direction = Settings.RANDOM_NUMBER(-1, 1);

        this.transform   = this.getComponent(Transform);
        this.rigidBody   = this.addComponent(new RigidBody()); 
        this.collider    = this.addComponent(new Collider(this.width, this.height, "PNJ"));
        this.animator    = this.addComponent(new Animator(AnimationsConf.pnj));
        this.audioSource = this.addComponent(new AudioSource());

        this.deathAudio = GameSettings.AUDIOS.kyaa.clone();

        this.offset = Settings.RANDOM_INT(-100, 10);

        this.transform.position.y += this.offset;

        this.deathAudio.setVolume(100);
        this.collider.setCollisionMask("pnj");

        this.rigidBody.setGravityScale(0);

        this.audioSource.addAudio(this.deathAudio, "kyaa");

        this.addComponent(new Renderable(new AnimationRenderer()));        
        
        this.initSpirteSheet();
        this.initLayer();
    }

    initSpirteSheet() {
        for (let name in this.spriteSheets) {
            let spriteSheet = this.spriteSheets[name].spriteSheet.copy();
            let animation = new Animation(spriteSheet, name, this.spriteSheets[name].duration, this.spriteSheets[name].loop);

            spriteSheet.scale(2.5);

            this.animator.addAnimation(animation);
        }

        this.animator.flipAnimation(this.direction);
    }

    initLayer() {
        if (this.transform.position.y > -100) {
            this.setLayer(3);
        } else {
            this.setLayer(0);
        }
    }

    onCollision(collider) {
        if (collider.tag == "PLAYER_BULLET" || collider.tag == "BOSS_BULLET") {
            if (this.alive) {
                // this.audioSource.play("kyaa");

                this.alive = false;

                this.animator.setBool("isDead", true);
                this.deathTimer.restart();
            }
        }
    }

    update() {
        this.rigidBody.velocity.x = this.speed * this.direction;

        if (this.animator.getCurrentAnimationName() == "hurt") {
            this.opacity -= this.deathTimer.getTime() * 0.1;

            if (this.opacity <= 0) {
                this.opacity = 0;

                this.kill();
            }

            this.animator.setOpacity(this.opacity);
        }

        if (this.transform.position.x - this.collider.width / 2 < this.camera.position.x - this.camera.anchor.x) {
            this.kill();
        }
    }
}