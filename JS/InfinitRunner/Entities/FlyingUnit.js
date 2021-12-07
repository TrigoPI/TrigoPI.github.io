class FlyingUnit extends Entity {
    constructor(x, y, camera, player, interfaces) {
        super(x, y);

        this.lifeBarUI;
        this.attack;

        this.randomTime = 0;

        this.totalLife = 100000
        this.life = this.totalLife;

        this.attackList = [
            "normalFire",
            "ballFire",
            "spiralFire"
        ]

        this.timer = new Clock();
        this.footTimer = new Clock();
        this.attackTimer = new Clock();
        this.interfaces = interfaces;
        
        this.ready = false;

        this.offset = -100;

        this.width = 400;
        this.height = 300;

        this.camera = camera;
        this.player = player;

        this.fluingUnitSpriteSheet = GameSettings.TEXTURES.spriteSheets.flyingUnit.copy();
        this.fluingUnitAnimation = new Animation(this.fluingUnitSpriteSheet, "walk", 1.5);

        this.transform = this.getComponent(Transform);
        this.rigidBody = this.addComponent(new RigidBody());
        this.collider = this.addComponent(new Collider(this.width, this.height, "BOSS"));
        this.animator = this.addComponent(new Animator(AnimationsConf.bipedal));

        this.rigidBody.setGravityScale(0);
        this.fluingUnitSpriteSheet.scale(5);

        this.collider.setCollisionMask("bipedal");
        this.animator.addAnimation(this.fluingUnitAnimation);

        this.setLayer(8);

        this.addComponent(new Renderable(new AnimationRenderer()));
    }

    spiralFire() {
        return this.addChild(new SpiralAttack(this.transform.position.x - 160, this.transform.position.y + 80));
    }

    ballFire() {
        return this.addChild(new BallAttack(this.transform.position.x - 160, this.transform.position.y + 80));
    }

    normalFire() {
        let direction = Vector2.sub(this.transform.position, this.player.getComponent(Transform).position);

        return this.addChild(new NormalAttack(this.transform.position.x - 160, this.transform.position.y + 80, direction));
    }

    move() {
        this.animator.flipAnimation(-1);

        if (!this.ready) {
            if (this.timer.getTime() > 5) {
                if (this.offset < 500) {
                    this.offset += 5;
                } else {
                    this.ready = true;
                    this.randomTime = Settings.RANDOM_INT(1, 5);

                    this.attackTimer.restart();
                    this.interfaces.displayInterface("boss_life_ui");

                    this.lifeBarUI = document.getElementById("life");
                    this.attack = this.normalFire();
                }
            }
        }
    }

    fire() {
        if (this.ready) {
            if (this.attack.isFinish()) {
                if (this.attackTimer.clock(this.randomTime)) {
                    this.randomTime = Settings.RANDOM_INT(1, 5);
        
                    let nextAttack = this.attackList[Settings.RANDOM_INT(0, this.attackList.length - 1)];
                
                    if (nextAttack == "normalFire") {
                        this.attack = this.normalFire();
                    }
            
                    if (nextAttack == "ballFire") {
                        this.attack = this.ballFire();
                    }
        
                    if (nextAttack == "spiralFire") {
                        this.attack = this.spiralFire();
                    }
                }
            }
        }
    }

    smokeEffect() {
        if (this.footTimer.clock(0.55)) {
            this.instantiate(new Smoke(this.transform.position.x + 80, this.transform.position.y + 250));
        }
    }

    updatePosition() {
        this.transform.position.x = this.camera.getComponent(Transform).position.x + Settings.WINDOWSIZE.width - this.offset;
    }

    updateLifeBar() {
        if (this.lifeBarUI != undefined) {
            this.lifeBarUI.style.width = `${100 * this.life / this.totalLife}%`; 
        }
    }

    onCollision(collider) {
        if (collider.tag == "PLAYER_BULLET") {
            this.life -= 100;
        }
    }

    update() {
        this.fire();
        this.updateLifeBar();
        this.move();
        this.smokeEffect();
        this.updatePosition();
    }
}