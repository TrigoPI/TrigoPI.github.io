class Animator {
    constructor(animationConf) {
        this.animationGraph = new AnimationGraph(animationConf);
        this.animations = {}

        this.#init(animationConf);
    } 

    #init(animationConf) {
        for (let name of animationConf.nodes) {
            this.animations[name] = null;
        }
    }

    restartAnimation(name) {
        this.animations[name].restart();
    }

    isFinish() {
        return this.getCurrentAnimation().isFinish();
    }

    getCurrentAnimation() {
        return this.animations[
            this.animationGraph.getCurrentNodeName()
        ];   
    }

    flipAnimation(value) {
        this.getCurrentAnimation().spriteSheet.flipSprite(value);
    }
    
    setBool(varName, value) {
        this.animationGraph.setBool(varName, value);
    }

    setNumber(varName, value) {
        this.animationGraph.setNumber(varName, value);
    }

    addAnimation(animation) {
        console.assert(this.animations[animation.name] == undefined, `No animation with name : ${animation.name}`)
        
        this.animations[animation.name] = animation;
    } 

    update() {
        this.animationGraph.update();
    }
}