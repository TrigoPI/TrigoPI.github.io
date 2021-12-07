class ParticleSystemEngine extends System {
    constructor() {
        super();
    }

    updatePosition(entity, particleSystem) {
        let transform = entity.getComponent(Transform);

        particleSystem.position.x = transform.position.x;
        particleSystem.position.y = transform.position.y;
    }

    updateParticleSystem(particleSystem) {
        particleSystem.update();
    }

    systemUpdate(entity) {
        let particleSystem = entity.getComponent(ParticleSystem);

        this.updatePosition(entity, particleSystem);
        this.updateParticleSystem(particleSystem);
    }

    draw(window) {
        for (let entity of this.entities) {
            entity.getComponent(ParticleSystem).draw(window);
        }
    } 
}