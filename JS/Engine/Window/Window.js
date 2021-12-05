class Window {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        
        this.canvas = this.#createCanvas(width, height);
        this.context = this.#getContext(this.canvas);
    }

    #fullScreenEvent = event => {
        let container = document.getElementById("window_container");

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        Settings.WINDOWSIZE.width = this.width;
        Settings.WINDOWSIZE.height = this.height;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        container.style.width = `${this.width}px`;
        container.style.height = `${this.height}px`;
    }

    #screenSizeChange = event => {
        let container = document.getElementById("window_container");

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        Settings.WINDOWSIZE.width = this.width;
        Settings.WINDOWSIZE.height = this.height;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        container.style.width = `${this.width}px`;
        container.style.height = `${this.height}px`;
    }

    #createCanvas(width, height) {
        let container = document.createElement("div");
        let canvas = document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        container.style.width = `${width}px`;
        container.style.height = `${height}px`;
        container.id = "window_container";
        container.style.position = "relative";

        window.addEventListener("fullscreenchange", this.#fullScreenEvent);
        window.addEventListener("resize", this.#screenSizeChange);

        document.body.appendChild(container);
        container.appendChild(canvas);

        return canvas;
    }

    #getContext(canvas) {
        return canvas.getContext("2d");
    }

    #drawRectangleShape(rectangleShape) {
        this.context.save();
        this.context.beginPath();
        this.context.translate(rectangleShape.position.x,  rectangleShape.position.y);
        
        this.context.fillStyle = `rgba(
            ${rectangleShape.fillColor.r},
            ${rectangleShape.fillColor.g},
            ${rectangleShape.fillColor.b},
            ${rectangleShape.fillColor.a}
        )`;

        this.context.strokeStyle = `rgba(
            ${rectangleShape.boderColor.r},
            ${rectangleShape.boderColor.g},
            ${rectangleShape.boderColor.b},
            ${rectangleShape.boderColor.a}
        )`;
        
        this.context.rect(-rectangleShape.width / 2, -rectangleShape.height / 2, rectangleShape.width, rectangleShape.height);

        this.context.fill();
        this.context.stroke();
        this.context.closePath();
        this.context.restore();
    }

    #drawParticle(particle) {
        this.context.save();
        this.context.beginPath();
        this.context.translate(particle.position.x, particle.position.y);
        
        this.context.fillStyle = `rgba(
            ${particle.color.r},
            ${particle.color.g},
            ${particle.color.b},
            ${particle.color.a}
        )`;

        this.context.ellipse(0, 0, particle.currentSize, particle.currentSize, 0, 0, Math.PI * 2);
        this.context.fill();
        this.context.closePath();
        this.context.restore();
    }

    #drawSprite(sprite) {
        this.context.imageSmoothingEnabled = false;

        this.context.save();
        this.context.globalAlpha = sprite.opacity;
        this.context.translate(sprite.position.x, sprite.position.y);
        this.context.scale(sprite.flip, 1);
        this.context.drawImage(sprite.image, -sprite.width / 2, -sprite.height / 2, sprite.width, sprite.height);
        this.context.restore();
    }

    #drawAnimation(animation) {
        let spriteSheet = animation.spriteSheet;
        let sx = animation.indexCol * spriteSheet.cellWidth; 
        let sy = animation.indexRow * spriteSheet.cellHeight; 

        this.context.imageSmoothingEnabled = false;

        this.context.save();
        this.context.globalAlpha = animation.spriteSheet.opacity;
        this.context.translate(spriteSheet.position.x,  spriteSheet.position.y);
        this.context.scale(spriteSheet.flip, 1);
        this.context.drawImage(spriteSheet.image, sx, sy, spriteSheet.cellWidth, spriteSheet.cellHeight, -spriteSheet.cellWidthRender / 2, -spriteSheet.cellHeightRender / 2, spriteSheet.cellWidthRender, spriteSheet.cellHeightRender);
        this.context.restore();
    }

    #drawAnimationRenderer(animationRenderer) {
        if (animationRenderer.animation != null) {
            this.#drawAnimation(animationRenderer.animation);
        }
    }

    inFullScreen() {
        return screen.width == window.innerWidth  && screen.height == window.innerHeight;
    }

    getScreenContext() {
        return this.context;
    }
    
    setFullScreen() {
        document.getElementById("window_container").requestFullscreen();
    }

    exitFullScreen() {
        document.exitFullscreen();
    }

    clearWindow(color = {r : 255, g : 255, b : 255, a : 255}) {
        this.context.save();
        this.context.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.restore();
    }

    draw(drawable) {
        switch (drawable.constructor.name) {
            case "RectangleShape" : 
                this.#drawRectangleShape(drawable);
                break;
            case "Sprite" : 
                this.#drawSprite(drawable);
                break;
            case "Animation" :
                this.#drawAnimation(drawable);
                break;
            case "AnimationRenderer" :
                this.#drawAnimationRenderer(drawable);
                break;
            case "Particle" : 
                this.#drawParticle(drawable);
                break;
        }
    }
}