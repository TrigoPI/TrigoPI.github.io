class BulletSunAttack extends Attack {
    constructor(x, y, direction) {
        super(x, y);

        this.transform = this.getComponent(Transform);
        this.direction = direction;
    }

    start() {
        this.instantiate(new BulletSun(this.transform.position.x, this.transform.position.y, "BOSS_BULLET")).setDirection(this.direction);

        this.finished = true;
        this.kill();
    }
}