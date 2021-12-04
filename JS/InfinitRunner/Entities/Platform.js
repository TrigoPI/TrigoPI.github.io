class Platform extends Entity {
    constructor(x, y, width, height) {
        super(x, y);

        this.width = width;
        this.height = height;

        this.addComponent(new RigidBody(RigidBody.STATIC));
        this.addComponent(new Collider(width, height, "PLATFORM"));
        this.addComponent(new Renderable(new RectangleShape(x, y, width, height, Settings.TRANSPARENT, Settings.TRANSPARENT)));
    }
}