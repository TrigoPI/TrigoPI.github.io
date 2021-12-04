class Drone extends Entity {
    constructor(x, y) {
        super(x, y);

        this.time = new Clock();

        this.transform = this.getComponent(Transform);
        this.animator  = this.addComponent(new Animator(AnimationsConf.drone));

        this.droneSpriteSheet = GameSettings.TEXTURES.spriteSheets.drone.copy();
        this.droneAnimation  = new Animation(this.droneSpriteSheet, "fly", 0.7);

        this.droneSpriteSheet.scale(0.1)

        this.animator.addAnimation(this.droneAnimation);

        this.addComponent(new Renderable(new AnimationRenderer()));    

        this.setLayer(2);
    }

    update() {
        this.transform.localPosition.y += Math.sin(4 * this.time.getTime());
    }
}