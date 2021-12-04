class RigidBody {
    static DYNAMIC   = "DYNAMIC";
    static KINEMATIC = "KYNEMATIC"
    static STATIC    = "STATIC";

    constructor(type = RigidBody.DYNAMIC) {
        this.type = type;
        this.gravityScale = 1;

        this.acceleration = new Vector2();
        this.velocity = new Vector2();
        this.material = new Material();
    }

    setGravityScale(k) {
        this.gravityScale = k;
    }

    addForce(force) {
        this.acceleration.add(force);
    }

    setMaterial(material) {
        this.material = material;
    }
}