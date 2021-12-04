class Player extends Entity {
    constructor(x, y, musicsManager) {
        super(x, y);

        this.drone;

        this.musicsManager = musicsManager;

        this.canRun = false;
        this.canRunClock = new Clock();

        this.speed = 0;
        this.scale = 2;

        this.width = 20;
        this.height = 160;

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

        this.idleSpriteSheet    = GameSettings.TEXTURES.spriteSheets.playerIdle.copy();
        this.effect1SpriteSheet = GameSettings.TEXTURES.spriteSheets.playerRun.copy();

        this.effect1Animation   = new Animation(this.effect1SpriteSheet, "run", 0.5);
        this.idleAnimation      = new Animation(this.idleSpriteSheet, "idle", 1);

        this.idleSpriteSheet.scale(this.scale);
        this.effect1SpriteSheet.scale(this.scale);

        this.animator.addAnimation(this.idleAnimation);
        this.animator.addAnimation(this.effect1Animation);

        this.addComponent(new Renderable(new AnimationRenderer()));  
        
        this.setLayer(1);

        this.#initSound();
    }

    #initSound() {
        for (let sound of this.runSounds) {
            sound.sound.setVolume(60);
            this.audioSource.addAudio(sound.sound, sound.name);
        }
    }

    onCollision(collider) {
        if (collider.tag == "PLATFORM") {
            if (!this.canRun) {
                this.canRun = true;   

                this.canRunClock.restart();
                this.musicsManager.play();

                this.instantiate(new PlayerExplosion(0, -200));
            }

            if (this.speed > 0) {
                if (this.audioSource.isFinish(this.runningSound) || this.audioSource.isStarted(this.runningSound)) {
                    this.runningSound = this.audioSource.randomPlay(["run1", "run2", "run3", "run4", "run5", "run6"], [0.25, 0.05, 0.2, 0.25, 0.05, 0.2]);
                }
            }
        }
    }

    start() {
        this.drone = this.addChild(new Drone(this.transform.position.x - 50, this.transform.position.y - 40));
    }

    update() {
        this.rigidBody.velocity.x = this.speed;

        this.animator.setNumber("speed", Math.abs(this.rigidBody.velocity.x));

        if (this.canRun) {
            if (this.canRunClock.getTime() > 0.7) {
                this.speed = 400;
            }
        }

        if (Settings.KEYS.Space.onPress) {
            this.rigidBody.velocity.add(new Vector2(0, -200));
        }
    }
}