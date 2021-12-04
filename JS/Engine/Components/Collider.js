class Collider {
    constructor(width, height, tag) {
        this.width = width;
        this.height = height;
        this.tag = tag;

        this.collisionMask = "default";
    }

    getCollisionMask() {
        return this.collisionMask;
    }

    setCollisionMask(name) {
        this.collisionMask = name;
    }
}