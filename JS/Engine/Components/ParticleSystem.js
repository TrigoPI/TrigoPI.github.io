class ParticleSystem {
    constructor(particleConfig) {
        this.position = new Vector2();
        this.gravity  = new Vector2(0, particleConfig.gravity);

        this.particleConfig = particleConfig;
        this.particles = [];

        this.emissionTimer = new Clock();
        this.duration = new Clock();

        this.start = false;
    }

    isPlaying() {
        return this.duration.getTime() < this.particleConfig.duration
    }

    #addPhysics(particle) {
        particle.velocity.add(this.gravity);
        particle.position.add(particle.velocity);
    }

    #configureParticle(particle) {
        let velocity = Settings.RANDOM_VECTOR_RANGE(this.particleConfig.velocityRange.min, this.particleConfig.velocityRange.max);
        let size = Settings.RANDOM_RANGE(this.particleConfig.particleSize.min, this.particleConfig.particleSize.max); 
        let color = this.particleConfig.colors[Settings.RANDOM_INT(0, this.particleConfig.colors.length - 1)];
        let lifeTime = this.particleConfig.particleLifeTime;
        let decreaseFactor = -size / lifeTime; 

        particle.setVelocity(velocity);
        particle.setTimeToLive(lifeTime);
        particle.setSize(size);
        particle.setDecreaseFactor(decreaseFactor);
        particle.setColor(color);
    }

    #generateParticles() {
        if (this.isPlaying()) {
            let n = Math.floor(this.emissionTimer.getTime() * this.particleConfig.rateOverTime);

            for (let i = 0; i < n; i++) {
                let particle = new Particle(
                    this.position.x, 
                    this.position.y, 
                    this.particleConfig.particleLifeTime)

                this.#configureParticle(particle);
                this.particles.push(particle);
                this.emissionTimer.restart();
            }
        }
    }

    #decreaseOverTime(particle) {
        if (this.particleConfig.decreaseOverTime) {
            particle.currentSize = particle.decreaseFactor * particle.time.getTime() + particle.size;

            if (particle.currentSize < 0) {
                particle.currentSize = 0;
            }
        }
    }

    #updateParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            if (this.particles[i].isDead()) {
                this.particles.splice(i, 1);
            } else {
                this.#addPhysics(this.particles[i]);
                this.#decreaseOverTime(this.particles[i]);
            }
        }
    }

    #updateLoop() {
        if (this.particleConfig.loop) {
            if (this.isPlaying) {
                this.restart();
            }
        }
    }

    #updateParticleSystem() {
        if (this.start) {
            this.#updateLoop();
            this.#generateParticles();
            this.#updateParticles();
        }
    }

    #drawParticles(window) {
        for (let particle of this.particles) {
            window.draw(particle);
        }
    }

    restart() {
        this.duration.restart();
    }

    play() {
        if (!this.start) {
            this.start = true;

            this.duration.restart();
        }
    }

    stop() {
        if (this.start) {
            this.start = false;
        }
    }

    update() {
        this.#updateParticleSystem();
    }

    draw(window) {
        this.#drawParticles(window);
    }
}