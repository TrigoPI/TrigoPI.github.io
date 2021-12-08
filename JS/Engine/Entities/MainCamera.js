class MainCamera extends Entity {
    constructor(x, y, window) {
        super(x, y);

        this.transform = this.getComponent(Transform);

        this.camera = this.addComponent(new Camera(window.getScreenContext()));
        this.traget = null;
    }

    #updateCameraPosition() {
        this.camera.setPosition(
            this.transform.position.x, 
            this.transform.position.y
        );
    }

    getAnchor() {
        return this.camera.anchor;
    }

    #updateFollow() {
        if (this.traget != null) {
            this.smoothFollow(0.5);
        }
    }

    setPosition(x, y) {
        this.transform.position.set(x, y);
    }

    setTarget(entity) {
        this.traget = entity.getComponent(Transform);
    }

    setAnchor(x, y) {
        this.camera.setAnchor(x, y);
    }

    smoothFollow(k) {
        let position = Vector2.lerp(this.transform.position, this.traget.position, k);

        this.transform.position.x += position.x;
    }

    follow() {
        this.transform.position.x = this.traget.position.x;
        this.transform.position.y = this.traget.position.y;
    }

    update() {
        this.#updateFollow();
        this.#updateCameraPosition();
    }

    begin() {
        this.camera.begin();
    }

    end() {
        this.camera.end();
    }
}