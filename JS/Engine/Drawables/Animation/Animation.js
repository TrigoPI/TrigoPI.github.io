class Animation extends Drawable {
    constructor(spriteSheet, name, duration) {
        super(spriteSheet.position.x, spriteSheet.position.y);
        this.name = name;

        this.ended = false;

        this.currentFrame = 0;
        this.indexCol = 0;
        this.indexRow = 0;

        this.spriteSheet = spriteSheet;

        this.duration = duration;

        this.colDuration = duration / spriteSheet.frames;
        this.rowDuration = spriteSheet.col * this.colDuration;

        this.clock = new Clock();
    }

    #updateFrameCount() {
        this.currentFrame = Math.ceil(this.clock.getTime() *  this.spriteSheet.frames / this.duration);
    }

    #updateIndex() {        
        this.indexCol = Math.floor(this.clock.getTime() / this.colDuration) % this.spriteSheet.col;
        this.indexRow = Math.floor(this.clock.getTime() / this.rowDuration) % this.spriteSheet.row;    
    }

    #updateEndOfAnimation() {
        if (this.currentFrame >= this.spriteSheet.frames) {
            this.ended = true;
    
            this.reset();
        } else {
            this.ended = false;
        }
    }

    #updateSpriteSheetPosition() {
        this.spriteSheet.position.x = this.position.x;
        this.spriteSheet.position.y = this.position.y;
    }

    #updateAnimation() {
        this.#updateIndex();
        this.#updateFrameCount();
        this.#updateEndOfAnimation();
    }

    isFinish() {
        return this.ended;
    }

    reset() {
        this.indexCol = 0;
        this.indexRow = 0;

        this.clock.restart();
    }

    update() {
        this.#updateSpriteSheetPosition();
        this.#updateAnimation();
    }
}