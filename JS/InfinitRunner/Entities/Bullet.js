class Bullet extends Entity {
    constructor(x, y) {
        super(x, y);

        this.size = 10;

        this.transform = this.getComponent(Transform);
        this.rigidBody = this.addComponent(new RigidBody());
        this.collider  = this.addComponent(new Collider(this.size, this.size, "BULLET"));

        this.rigidBody.setGravityScale(0);

        this.addComponent(new Renderable(new RectangleShape(x, y, this.size, this.size, Settings.RED, Settings.TRANSPARENT)));
    }

    update() {
        
    }
}