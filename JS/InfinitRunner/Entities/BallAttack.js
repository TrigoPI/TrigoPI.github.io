class BallAttack extends Attack {
    constructor(x, y) {
        super(x, y);

        this.transform = this.getComponent(Transform);
    }

    start() {
        for (let i = 0; i < 360; i += 360 / 50) {
            let angle = Settings.DEGTORAD(i);

            let x = Math.cos(angle);
            let y = Math.sin(angle);
            let direction = new Vector2(x, y);

            this.instantiate(new Bullet(this.transform.position.x, this.transform.position.y, "BOSS_BULLET")).setDirection(direction);            
        }
        
        this.finished = true;
        this.kill();
    }
}