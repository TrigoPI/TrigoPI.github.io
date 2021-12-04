class SystemManager {
    constructor() {
        this.systems = {};
    }

    getSystem(system) {
        return this.systems[system.name];
    }

    addEntity(entity) {
        for (let systemName in this.systems) {
            this.systems[systemName].addEntity(entity);
        }
    }

    setSignature(system, signature) {
        this.systems[system.name].setSignature(signature);
    }

    addSystem(system) {
        this.systems[system.constructor.name] = system;    
    }
}