class PNJ extends Entity {
    constructor(x, y, spriteSheet, camera) {
        super(x, y)
        
        this.speed = 70;
        this.width = 20;
        this.height = 160;

        this.camera = camera.getComponent(Camera);
        
        this.direction = Settings.RANDOM_NUMBER(-1, 1);

        this.spriteSheet   = spriteSheet.copy();
        this.walkAnimation = new Animation(this.spriteSheet, "walk", 1);

        this.transform = this.getComponent(Transform);
        this.rigidBody = this.addComponent(new RigidBody()); 
        this.collider  = this.addComponent(new Collider(this.width, this.height + Settings.RANDOM_INT(-100, 100)));
        this.animator  = this.addComponent(new Animator(AnimationsConf.pnj));

        this.collider.setCollisionMask("pnj");

        this.animator.addAnimation(this.walkAnimation);

        this.spriteSheet.scale(2.5);

        this.animator.flipAnimation(this.direction);

        this.addComponent(new Renderable(new AnimationRenderer()));        
    
        this.#initLayer();
    }

    #initLayer() {
        if (this.collider.height < this.height) {
            this.setLayer(3);
        } else {
            this.setLayer(0);
        }
    }

    update() {
        this.rigidBody.velocity.x = this.speed * this.direction;

        if (this.transform.position.x - this.collider.width / 2 < this.camera.position.x - this.camera.anchor.x) {
            this.kill();
        }
    }
}