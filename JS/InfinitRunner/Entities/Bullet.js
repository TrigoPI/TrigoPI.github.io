class Bullet extends Entity {
    constructor(x, y) {
        super(x, y);

        this.size = 10;
        this.timeToLive = 10;

        this.clock = new Clock();
        this.direction = new Vector2();

        this.transform = this.getComponent(Transform);
        this.rigidBody = this.addComponent(new RigidBody());
        this.collider  = this.addComponent(new Collider(this.size, this.size, "BULLET"));

        this.rigidBody.setGravityScale(0);
        this.collider.setCollisionMask("bullet");

        this.addComponent(new Renderable(new RectangleShape(x, y, this.size, this.size, Settings.RED, Settings.TRANSPARENT)));
    }

    setDirection(direction) {
        direction.setMag(1000);

        this.direction = direction;
    }

    onCollision(collider) {
        if (collider.tag == "PLATFORM" || collider.tag == "PNJ") {
            this.instantiate(new BulletExplosion(this.transform.position.x, this.transform.position.y));

            this.kill();
        }
    }

    update() {
        this.rigidBody.velocity = this.direction;

        if (this.clock.getTime() > this.timeToLive) {
            this.kill();
        }
    }
}