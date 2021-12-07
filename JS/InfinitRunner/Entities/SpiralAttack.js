class SpiralAttack extends Attack {
    constructor(x, y) {
        super(x, y);

        this.timer = new Clock();
        this.fireClock = new Clock();

        this.angle = 0;
    
        this.transform = this.getComponent(Transform);
    }

    updateFire() {
        this.angle += 10;

        let angleGrad = Settings.DEGTORAD(this.angle);
        
        let x = Math.cos(angleGrad);
        let y = Math.sin(angleGrad);
        let direction = new Vector2(x, y);

        this.instantiate(new Bullet(this.transform.position.x, this.transform.position.y, "BOSS_BULLET")).setDirection(direction); 
    }

    updateKill() {
        if (this.timer.getTime() > 3) {
            this.finished = true;
            this.kill();
        }  
    }

    update() {
        this.updateKill();
        this.updateFire();       
    }
}