class AnimatorEngine extends System {
    constructor() {
        super();
    }

    systemUpdate(entity) {
        let animator = entity.getComponent(Animator);
        let animationRenderer = entity.getComponent(Renderable).drawable;

        if (animationRenderer.constructor.name == AnimationRenderer.name) {
            animationRenderer.setAnimation(animator.getCurrentAnimation());             
            animator.update();
            animationRenderer.update();
        }
    }
}