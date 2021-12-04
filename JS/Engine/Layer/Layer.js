class Layer {
    constructor(value, name = "") {
        this.value = value;
        this.name = name;

        this.entities = [];
    }
    
    addEntity(entity) {
        this.entities.push(entity);
    }

    setName(name) {
        this.name = name;
    }

    clear() {
        this.entities = [];
    }

    draw(window) {
        for (let entity of this.entities) {
            let renderable = entity.getComponent(Renderable);

            if (renderable != null) {
                window.draw(renderable.drawable);
            }
        }

        this.clear();
    }
}