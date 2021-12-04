class Camera {
    constructor(context) {
        this.position = new Vector2();
        this.anchor   = new Vector2();

        this.context = context;
    }

    #applyTranslation() {
        this.context.translate(
            this.anchor.x - this.position.x, 
            this.anchor.y - this.position.y
        );
    }

    #updateMousePosition() {
        Settings.MOUSE.worldX = Settings.MOUSE.x - this.anchor.x + this.position.x;
        Settings.MOUSE.worldY = Settings.MOUSE.y - this.anchor.y + this.position.y;
    }

    setAnchor(x, y) {
        this.anchor.set(x, y);
    }

    setPosition(x, y) {
        this.position.set(x, y);
    }
    
    begin() {
        this.context.save();
        this.#updateMousePosition();
        this.#applyTranslation();
    }

    end() {
        this.context.restore();
    } 
}