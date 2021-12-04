class Animation extends Drawable {
    constructor(spriteSheet, name, duration, loop = true) {
        super(spriteSheet.position.x, spriteSheet.position.y);        
        this.name = name;

        this.loop = loop;

        this.ended = false;
        this.canPlay = true;

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
        this.currentFrame = this.indexRow * this.spriteSheet.col + this.indexCol;
    }

    #updateIndex() {        
        this.indexCol = Math.floor(this.clock.getTime() / this.colDuration) % this.spriteSheet.col;
        this.indexRow = Math.floor(this.clock.getTime() / this.rowDuration) % this.spriteSheet.row;    
    }

    #updateEndOfAnimation() {
        this.ended = false;

        if (this.currentFrame >= this.spriteSheet.frames - 1) {
            if (this.clock.getTime() >= this.duration) {
                this.ended = true;
                this.reset();
            }
        }
    }

    #updateSpriteSheetPosition() {
        this.spriteSheet.position.x = this.position.x;
        this.spriteSheet.position.y = this.position.y;
    }

    #updateAnimation() {
        if (this.canPlay) {
            this.#updateFrameCount();
            this.#updateIndex();
            this.#updateEndOfAnimation();
        }
    }

    isFinish() {
        return this.ended;
    }

    restart() {
        this.canPlay = true;

        this.indexCol = 0;
        this.indexRow = 0;

        this.clock.restart();
    }

    reset() {
        if (this.loop) {
            this.indexCol = 0;
            this.indexRow = 0;

            this.clock.restart();
        } else {
            this.canPlay = false;
            
            this.indexCol = this.spriteSheet.col - 1;
            this.indexRow = this.spriteSheet.row - 1;
        }
    }

    update() {
        this.#updateSpriteSheetPosition();
        this.#updateAnimation();
    }
}