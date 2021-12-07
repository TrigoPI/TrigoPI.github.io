class RenderingEngine extends System {
    constructor() {
        super();

        this.layerMap = new LayerMap(10);
    }

    updateDrawalbePosition(entity) {
        let renderable = entity.getComponent(Renderable);
        let transform = entity.getComponent(Transform);

        if (renderable != null) {
            let drawable = renderable.drawable;

            drawable.position.x = transform.position.x;
            drawable.position.y = transform.position.y;
            drawable.rotation = transform.rotation;
        }
    }

    updateEntity(entity) {
        entity.update();
    }

    systemUpdate(entity) {
        this.updateDrawalbePosition(entity);
        this.updateEntity(entity);

        this.layerMap.update(entity);
    }

    draw(window) {
        this.layerMap.draw(window);
    }
}