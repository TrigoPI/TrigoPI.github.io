class Sprite extends Drawable {
    constructor(x = 0, y = 0, path = "") {
        super(x, y);

        this.flip = 1;

        this.width = 0;
        this.height = 0;

        this.path = path;
        this.image = new Image();
    }

    setSprite(sprite) {
        this.path   = sprite.path; 
        this.width  = sprite.width;
        this.height = sprite.height;
        this.image  = sprite.image;
    }

    copy() {
        let sprite = new Sprite(0, 0, "");

        sprite.path  = this.path; 
        sprite.image = this.image;

        sprite.width  = this.width;
        sprite.height = this.height;

        return sprite;
    }

    setSize(width, height) {
        this.width  = width;
        this.height = height;
    }

    scale(k) {
        this.width  *= k;
        this.height *= k;
    }

    flipSprite(value) {
        this.flip = value;
    }

    load(callback = () => {}) {
        this.image.src = this.path;

        this.image.onload = () => {
            this.setSize(this.image.width, this.image.height);
            
            callback();
        };
    }
}