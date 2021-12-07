class Player extends Entity {
    constructor(x, y, musicsManager) {
        super(x, y);

        this.drone;
        this.shield;

        this.musicsManager = musicsManager;

        this.isJumping = true;
        this.canRun = false;

        this.canRunClock = new Clock();

        this.speed = 0;
        this.scale = 2;

        this.width = 50;
        this.height = 70;

        this.runSounds = [
            {sound : GameSettings.AUDIOS.footStep1.clone(), name : "run1"},
            {sound : GameSettings.AUDIOS.footStep2.clone(), name : "run2"},
            {sound : GameSettings.AUDIOS.footStep3.clone(), name : "run3"},
            {sound : GameSettings.AUDIOS.footStep4.clone(), name : "run4"},
            {sound : GameSettings.AUDIOS.footStep5.clone(), name : "run5"},
            {sound : GameSettings.AUDIOS.footStep6.clone(), name : "run6"},
        ];

        this.runningSound = "run1";

        this.transform   = this.getComponent(Transform);
        this.rigidBody   = this.addComponent(new RigidBody());
        this.collider    = this.addComponent(new Collider(this.width, this.height, "PLAYER"));
        this.animator    = this.addComponent(new Animator(AnimationsConf.player));
        this.audioSource = this.addComponent(new AudioSource());

        this.rigidBody.addForce(new Vector2(0, 500));

        this.collider.setCollisionMask("player");

        this.rigidBody.setMaterial(new Material(0.1));

        this.idleSpriteSheet = GameSettings.TEXTURES.spriteSheets.playerIdle.copy();
        this.runSpriteSheet  = GameSettings.TEXTURES.spriteSheets.playerRun.copy();
        this.jumpSpriteSheet = GameSettings.TEXTURES.spriteSheets.playerJump.copy();

        this.runAnimation   = new Animation(this.runSpriteSheet, "run", 0.5);
        this.idleAnimation  = new Animation(this.idleSpriteSheet, "idle", 1);
        this.jumpAnimation  = new Animation(this.jumpSpriteSheet, "jump", 0.5, false);

        this.idleSpriteSheet.scale(this.scale);
        this.runSpriteSheet.scale(this.scale);
        this.jumpSpriteSheet.scale(this.scale);

        this.animator.addAnimation(this.idleAnimation);
        this.animator.addAnimation(this.runAnimation);
        this.animator.addAnimation(this.jumpAnimation);

        this.addComponent(new Renderable(new AnimationRenderer()));  
        
        this.setLayer(1);

        this.initSound();
    }

    initSound() {
        for (let sound of this.runSounds) {
            sound.sound.setVolume(70);
            this.audioSource.addAudio(sound.sound, sound.name);
        }
    }

    start() {
        this.drone = this.addChild(new Drone(this.transform.position.x - 50, this.transform.position.y - 40));
        this.shield = this.addChild(new Shield(0, 0));
    }

    onCollision(collider) {
        if (collider.tag == "PLATFORM") {
            this.isJumping = false;

            if (!this.canRun) {
                this.canRun = true;   

                this.canRunClock.restart();
                this.musicsManager.play();

                this.instantiate(new PlayerExplosion(0, -360));
            }

            if (this.speed > 0) {
                if (this.audioSource.isFinish(this.runningSound) || this.audioSource.isStarted(this.runningSound)) {
                    this.runningSound = this.audioSource.randomPlay(["run1", "run2", "run3", "run4", "run5", "run6"], [0.25, 0.05, 0.2, 0.25, 0.05, 0.2]);
                }
            }
        }

        if (collider.tag == "BOSS_BULLET") {
            this.kill();
        }
    }

    move() {
        if (this.canRun) {
            if (this.canRunClock.getTime() > 0.7) {
                this.speed = 400;
            }
        }

        if (Settings.KEYS.Space.onPress) {
            this.isJumping = true;

            this.animator.restartAnimation("jump");

            this.rigidBody.velocity.y = 0;
            this.rigidBody.velocity.add(new Vector2(0, -300));
        }

        if (Settings.KEYS.KeyS.pressed) {
            this.rigidBody.addForce(new Vector2(0, 10));
        }
    }

    updateVelocity() {
        this.rigidBody.velocity.x = this.speed;
    }

    updateAnimationState() {
        this.animator.setBool("isJumping", this.isJumping);
        this.animator.setNumber("speedX", Math.abs(this.rigidBody.velocity.x));
    }

    update() {
        this.updateVelocity();
        this.move();
        this.updateAnimationState();
    }
}