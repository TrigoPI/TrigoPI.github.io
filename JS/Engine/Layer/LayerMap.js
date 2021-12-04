class LayerMap {
    constructor(layers) {
        this.layers = [];

        this.#init(layers)
    }

    #init(layers) {
        for (let i = 0; i < layers; i++) {
            this.addLayer();
        }
    }

    addLayer(name = "") {
        let value = this.layers.length;

        this.layers.push(new Layer(value, name));
    }

    addEntity(entity) {
        this.layers[entity.layer].addEntity(entity);
    }

    update(entity) {
        this.addEntity(entity);
    }

    draw(window) {
        for (let layer of this.layers) {
            layer.draw(window);
        }
    }
}