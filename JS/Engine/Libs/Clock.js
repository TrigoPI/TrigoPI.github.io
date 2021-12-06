class Clock {
    constructor() {
        this.startTime = Date.now();
    }

    getTime() {
        return (Date.now() - this.startTime) / 1000;
    }

    clock(value) {
        if (this.getTime() > value) {
            this.restart();
            return true;
        } else {
            return false;
        }
    }

    restart() {
        let elapsedTime = this.getTime();
        this.startTime = Date.now();

        return elapsedTime;
    }
}