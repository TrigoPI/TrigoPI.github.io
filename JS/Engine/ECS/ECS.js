class ECS {
    constructor() {
        this.systemManager = new SystemManager();

        this.#init();
    }

    #init() {
        this.addSystem(new TransformEngine());
        this.addSystem(new PhysicsEngine());
        this.addSystem(new CollisionEngine());
        this.addSystem(new AnimatorEngine());
        this.addSystem(new RenderingEngine());
        this.addSystem(new ParticleSystemEngine());

        this.setSystemSignature(TransformEngine, [Transform]);
        this.setSystemSignature(PhysicsEngine, [RigidBody, Transform]);
        this.setSystemSignature(CollisionEngine, [RigidBody, Collider, Transform]);
        this.setSystemSignature(AnimatorEngine, [Animator, Renderable, Transform]);
        this.setSystemSignature(ParticleSystemEngine, [ParticleSystem, Transform]);
        this.setSystemSignature(RenderingEngine, [Transform]);
    }

    getSystem(system) {
        return this.systemManager.getSystem(system);
    }

    setSystemSignature(system, signature) {
        this.systemManager.setSignature(system, signature);
    }

    addEntity(entity) {     
        entity.setECS(this);
        entity.start();

        this.systemManager.addEntity(entity);
    }

    addSystem(system) {
        this.systemManager.addSystem(system);
    }
}