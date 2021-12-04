class AnimationRenderer extends Drawable {
    constructor(x = 0, y = 0) {
        super(x, y);

        this.animation = null;
    }

    #updateAnimationPosition() {
        this.animation.position.x = this.position.x;
        this.animation.position.y = this.position.y;

        this.animation.update();
    }

    setAnimation(animation) {
        this.animation = animation;
    }

    update() {
        if (this.animation != null) {
            this.#updateAnimationPosition();
        }
    }
}