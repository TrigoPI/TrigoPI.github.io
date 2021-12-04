class Entity {
    constructor(x, y) {
        this.id = Settings.GENERATE_ID();
        this.components = {};

        this.dead = false;
        this.parent = null;

        this.ECS = null;
        this.childs = [];

        this.layer = 0;

        this.addComponent(new Transform(x, y));
    }

    getChilds() {
        return this.childs;
    }

    instantiate(entity) {
        this.ECS.addEntity(entity);

        return entity;
    }

    addComponent(component) {
        let componentName = component.constructor.name;

        if (this.components[componentName]) {
            console.error(`Component ${componentName} already use for this entity`);        
            
            return null;
        } else {
            this.components[componentName] = component;
            
            return component;
        }
    }

    getComponent(component) {
        let componentName = component.name;

        if (this.components[componentName]) {
            return this.components[componentName];
        } else {
            return null;
        }
    }

    isDead() {
        return this.dead;
    }

    addChild(entity) {
        let transformA = entity.getComponent(Transform);
        let transformB = this.getComponent(Transform);
        let localPosition = Vector2.sub(transformB.position, transformA.position);

        transformA.setLocalPosition(localPosition.x, localPosition.y);
        entity.setParent(this);
        this.childs.push(entity);
    
        this.ECS.addEntity(entity);

        return entity;
    }

    setLayer(layer) {
        this.layer = layer;
    }

    setECS(ECS) {
        this.ECS = ECS;
    }

    setParent(entity) {
        this.parent = entity;
    }

    removeComponent(component) {
        let componentName = component.name;

        if (this.components[componentName]) {
            delete this.components[componentName];
        } else {
            console.error(`There is no Component ${componentName} for this entity`);
        }
    }

    kill() {
        this.dead = true;
    }

    start() {
        
    }

    onCollision(collider) {
        
    }

    update() {
        
    }
}