class LoadRessourcesState extends State {
    constructor(states, window, interfaces) {
        super(states, window, interfaces);

        this.textures = [];

        this.interfaces.displayInterface("load_interface");
        this.loadTextures();
    }

    loadTextures() {
        for (let textureType in GameSettings.TEXTURES) {
            for (let texture in GameSettings.TEXTURES[textureType]) {
                this.textures.push(false);

                let index = this.textures.length - 1;
    
                GameSettings.TEXTURES[textureType][texture].load(() => {
                    console.log(`Texture : ${texture} loaded`);
                    this.textures[index] = true;                     
                });
            }
        }
    }

    canPlay() {
        let index = 0;
        let valid = true;

        while (valid && index < this.textures.length) {
            valid = this.textures[index];
            index++;
        }

        return valid;
    }

    update() {
        if (this.canPlay()) {
            this.interfaces.removeInterface("load_interface");

            this.states.push(new StartGameState(this.states, this.window, this.interfaces));
        }
    }
}