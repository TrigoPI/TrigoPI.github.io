class ComponentArray extends Array {
    constructor() {
        super();

        this.entityToIndex = {}
    }

    mapEntityToIndex(entity) {
        this.entityToIndex[entity.id] = this.length;
    }

    removeEntity(entity) {
        let index = this.entityToIndex[entity.id];
        let last  = this[this.length - 1];

        this[index] = last;
        this.entityToIndex[last.id] = index;

        delete this.entityToIndex[entity.id];
        this.pop();
    }

    addEntity(entity) {
        this.mapEntityToIndex(entity);
        this.push(entity);
    }
}