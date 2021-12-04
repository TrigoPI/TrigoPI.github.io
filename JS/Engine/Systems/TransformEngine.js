class TransformEngine extends System {
    constructor() {
        super();
    }

    systemUpdate(entity) {
        let transform = entity.getComponent(Transform);

        if (entity.parent != null) {
            let parentTransform = entity.parent.getComponent(Transform);
            
            transform.position.x = parentTransform.position.x + transform.localPosition.x;
            transform.position.y = parentTransform.position.y + transform.localPosition.y;
        } else {
            transform.localPosition.set(transform.position.x, transform.position.y);
        }
    } 
}