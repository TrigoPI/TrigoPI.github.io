class Clock {
    constructor() {
        this.startTime = Date.now();
    }

    getTime() {
        return (Date.now() - this.startTime) / 1000;
    }

    restart() {
        let elapsedTime = this.getTime();
        this.startTime = Date.now();

        return elapsedTime;
    }
}