class PNJManager extends Entity {
    constructor(camera) {
        super(0, -300);
        
        this.pnjSpriteSheets = [
            {
                walk : {
                    spriteSheet : GameSettings.TEXTURES.spriteSheets.pnj1Walk,
                    duration : 1,
                    loop : true,
                },
                hurt : {
                    spriteSheet : GameSettings.TEXTURES.spriteSheets.pnj1Hurt,
                    duration : 2,
                    loop : false
                }
            }
        ]

        this.camera = camera;
        this.transform = this.getComponent(Transform);
        
        this.clock = new Clock();
    }

    update() {
        this.transform.position.x = this.camera.getComponent(Camera).position.x + 2 * Settings.WINDOWSIZE.width;

        if (this.clock.getTime() > 3) {
            this.instantiate(new PNJ(this.transform.position.x, -100, this.pnjSpriteSheets[0], this.camera));

            this.clock.restart();
        }
    }
}