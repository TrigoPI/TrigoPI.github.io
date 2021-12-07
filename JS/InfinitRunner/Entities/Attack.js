class Attack extends Entity {
    constructor(x, y) {
        super(x, y)

        this.finished = false;
    }

    isFinish() {
        return this.finished;
    }
}