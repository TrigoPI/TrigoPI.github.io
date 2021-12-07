class NormalAttack extends Attack {
    constructor(x, y, direction) {
        super(x, y);

        this.direction = direction;
        this.transform = this.getComponent(Transform);
    }

    start() {
        this.instantiate(new Bullet(this.transform.position.x, this.transform.position.y, "BOSS_BULLET")).setDirection(this.direction);

        this.finished = true;
        this.kill();
    }
}