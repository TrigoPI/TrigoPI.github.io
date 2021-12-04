class BackgroundGenerator {
    constructor(camera) {
        this.camera = camera;

        this.skyBackgroundSprite = GameSettings.TEXTURES.sprites.farBuildings.copy();
        this.buildingsBgSprite   = GameSettings.TEXTURES.sprites.backbuildings.copy();
        this.nearBuildingSprite  = GameSettings.TEXTURES.sprites.foreground.copy();

        this.skyBackgrounds = [];
        this.buildingsBg    = [];
        this.nearBuildings  = [];

        this.#init();
    }   

    #initBackground(array, scale, sprite, offsetY = 0) {
        let maxSprite = Math.ceil(Settings.WINDOWSIZE.width / (sprite.width * scale)) + 1;
        
        for (let i = 0; i < maxSprite; i++) {
            array.push({
                position : new Vector2(0, 0),
                sprite   : new Sprite(0, 0)
            });
            
            array[i].sprite.setSprite(sprite);
            array[i].sprite.scale(scale);

            array[i].sprite.position.x =  array[i].sprite.width  * i;
            array[i].sprite.position.y = -array[i].sprite.height / 2 + offsetY;

            array[i].position.y = array[i].sprite.position.y;
            array[i].position.x = array[i].sprite.position.x;
        }
    }

    #init() {
        this.#initBackground(this.skyBackgrounds, 4.5, this.skyBackgroundSprite);
        this.#initBackground(this.buildingsBg, 4, this.buildingsBgSprite, -150);
        this.#initBackground(this.nearBuildings, 4, this.nearBuildingSprite);
    }

    #generate(array, sprite) {
        let cameraTransform = this.camera.getComponent(Transform);
        let position = array[0].sprite.position.x + array[0].sprite.width / 2;
        let screenLeftPosition = cameraTransform.position.x - this.camera.getAnchor().x 
        
        if (position < screenLeftPosition) {
            let lastImg = array[array.length - 1];
            let screenPosition = Settings.WORLDTOSCREEN(cameraTransform.position, lastImg.sprite.position);
            let screenDiff = Settings.WINDOWSIZE.width - screenPosition.x;
            let maxToGenerate = Math.ceil(screenDiff / lastImg.sprite.width) + 1;
            
            for (let i = 0; i < maxToGenerate; i++) {
                let image = {
                    position : new Vector2(0, 0),
                    sprite   : new Sprite(0, 0)
                }

                lastImg = array[array.length - 1];

                image.sprite.setSprite(sprite);

                image.sprite.setSize(lastImg.sprite.width, lastImg.sprite.height);

                image.sprite.position.x = lastImg.position.x + lastImg.sprite.width;
                image.sprite.position.y = lastImg.position.y;

                image.position = image.sprite.position.copy();

                array.push(image);
            }

            array.shift();
        }
    }

    #updateBackground(array, k) {
        let cameraTransform = this.camera.getComponent(Transform);

        for (let image of array) {
            image.sprite.position.x = image.position.x + cameraTransform.position.x * (1 - k);
            image.sprite.position.y = image.position.y;
        }
    }

    #updateBackgrounds() {
        this.#updateBackground(this.skyBackgrounds, 0.1);
        this.#updateBackground(this.buildingsBg, 0.4);
        this.#updateBackground(this.nearBuildings, 1);
    }

    #drawBackground(window, array) {
        for (let image of array) {
            window.draw(image.sprite);
        }
    }

    #drawBackgrounds(window) {
        this.#drawBackground(window, this.skyBackgrounds);
        this.#drawBackground(window, this.buildingsBg);
        this.#drawBackground(window, this.nearBuildings);
    }

    update() {  
        this.#generate(this.skyBackgrounds, this.skyBackgroundSprite);
        this.#generate(this.buildingsBg, this.buildingsBgSprite);
        this.#generate(this.nearBuildings, this.nearBuildingSprite);

        this.#updateBackgrounds();      
    }

    draw(window) {
        this.#drawBackgrounds(window);
    }
}