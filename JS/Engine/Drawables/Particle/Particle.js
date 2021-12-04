class Particle extends Drawable {
    constructor(x, y) {
        super(x, y);

        this.acceleration = new Vector2();
        this.velocity     = new Vector2();

        this.time = new Clock();

        this.timeToLive = 0;

        this.size = 0;
        this.currentSize = 0;

        this.decreaseFactor = 0;
        this.color = new Color();
    }

    setColor(color) {
        this.color = color;
    }

    setDecreaseFactor(value) {
        this.decreaseFactor = value;
    }

    setSize(size) {
        this.size = size;
        this.currentSize = size;
    }

    setTimeToLive(timeToLive) {
        this.timeToLive = timeToLive;
    }

    setVelocity(velocity) {
        this.velocity = velocity;
    }

    isDead() {
        return this.time.getTime() > this.timeToLive || this.size <= 0;
    }
}