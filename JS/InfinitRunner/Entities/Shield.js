class Shield extends Entity {
    constructor(x, y) {
        super(x, y);
    
        this.shieldTimer = new Clock();
        this.coolDownTimer = new Clock();

        this.opacity = 0;
        this.coolDown = 0.1;
        this.shieldDuration = 0.3;

        this.activate = false;

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

    increaseOpacity() {
        if (this.opacity < 0.5) {
            this.opacity += 0.05;
        
            if (this.opacity > 1) {
                this.opacity = 1;
            }
        } 
    }

    decreaseOpacity() {
        if (this.opacity > 0) {
            this.opacity -= 0.05;

            if (this.opacity < 0) {
                this.opacity = 0;
            }
        }
    }

    update() {
        this.transform.localPosition.set(100, 0);

        if (!this.activate) {            
            if (Settings.MOUSE.buttons.right.onPress) {
                if (this.coolDownTimer.getTime() > this.coolDown) {
                    this.activate = true;

                    this.shieldTimer.restart();
                }
            }

            this.collider.width = 0;
            this.collider.height = 0;

            this.decreaseOpacity();

        } else {
            if (this.shieldTimer.getTime() > this.shieldDuration) {
                this.activate = false;

                this.coolDownTimer.restart();
            }

            this.collider.width = this.width;
            this.collider.height = this.height;

            this.increaseOpacity();
        }

        this.shieldSpriteSheet.setOpacity(this.opacity);
    }
}