class System {
    constructor() {
        this.entities = new ComponentArray();
        this.signature = [];
    }

    isEntityValid(entity) {
        let valid = 0;

        for (let componentName of this.signature) {
            if (entity.components[componentName]) {
                valid++;
            }
        }

        return valid == this.signature.length;
    }

    addEntity(entity) {
        if (this.isEntityValid(entity)) {
            this.entities.addEntity(entity);
        }
    }

    setSignature(signature) {
        for (let s of signature) {
            this.signature.push(s.name);
        }
    }

    update() {
        for (let entity of this.entities) {
            if (entity.isDead()) {
                this.entities.removeEntity(entity);
            } else {
                this.systemUpdate(entity);
            }
        }
    }

    systemUpdate(entity) {
    
    }
}