class PhysicsEngine extends System {
    constructor() {
        super();        
    }

    addPhysics(entity) {
        let transform = entity.getComponent(Transform)
        let rigidBody = entity.getComponent(RigidBody);
        let gravity = Settings.GRAVITY.copy();

        let acceleration = rigidBody.acceleration.copy();
        let velocity = rigidBody.velocity.copy();
        let position = transform.position.copy();

        acceleration.mult(100);
        gravity.mult(rigidBody.gravityScale);

        velocity.x += acceleration.x * Settings.DT;
        velocity.y += acceleration.y * Settings.DT;

        position.x += velocity.x * Settings.DT;
        position.y += velocity.y * Settings.DT;

        rigidBody.acceleration = gravity;
        rigidBody.velocity = velocity;
        transform.position = position;
    }

    systemUpdate(entity) {
        if (entity.getComponent(RigidBody).type == RigidBody.DYNAMIC) {
            this.addPhysics(entity);
        }
    }
}