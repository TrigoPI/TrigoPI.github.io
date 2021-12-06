class FlyingUnit extends Entity {
    constructor(x, y, camera, player, interfaces) {
        super(x, y);

        this.lifeBarUI;

        this.totalLife = 100000
        this.life = this.totalLife;

        this.attackList = [
            "normalFire",
            "ballFire"
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

    move() {
        this.animator.flipAnimation(-1);

        if (!this.ready) {
            if (this.timer.getTime() > 5) {
                if (this.offset < 500) {
                    this.offset += 5;
                } else {
                    this.ready = true;
                    
                    this.interfaces.displayInterface("boss_life_ui");
                    this.lifeBarUI = document.getElementById("life");
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

    ballFire() {
        for (let i = 0; i < 360; i += 360 / 50) {
            let angle = Settings.DEGTORAD(i);

            let x = Math.cos(angle);
            let y = Math.sin(angle);
            let direction = new Vector2(x, y);

            let bullet = this.instantiate(new Bullet(this.transform.position.x - 160, this.transform.position.y + 80, "BOSS_BULLET"));
            
            bullet.setDirection(direction);
        }
    }

    normalFire() {
        let bullet =  this.instantiate(new Bullet(this.transform.position.x - 160, this.transform.position.y + 80, "BOSS_BULLET"));
        let direction = Vector2.sub(this.transform.position, this.player.getComponent(Transform).position);

        bullet.setDirection(direction);
    }

    fire() {
        if (this.ready) {
            if (this.attackTimer.clock(2)) {
                let nextAttack = this.attackList[Settings.RANDOM_INT(0, this.attackList.length - 1)];
    
                console.log(nextAttack);
    
                if (nextAttack == "normalFire") {
                    this.normalFire();
                }
    
                if (nextAttack == "ballFire") {
                    this.ballFire();
                }
            }
        }
    }

    onCollision(collider) {
        if (collider.tag == "PLAYER_BULLET") {
            this.life -= 500;

            this.lifeBarUI.style.width = `${100 * this.life / this.totalLife}%`; 
        }
    }

    update() {
        this.fire();
        this.move();
        this.smokeEffect();
        this.updatePosition();
    }
}