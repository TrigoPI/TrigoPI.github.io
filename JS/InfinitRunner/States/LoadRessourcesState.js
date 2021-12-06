class LoadRessourcesState extends State {
    constructor(states, window, interfaces) {
        super(states, window, interfaces);

        this.ressouces = [];

        this.interfaces.displayInterface("load_interface");

        this.loadTextures();
    }

    loadTextures() {
        for (let textureType in GameSettings.TEXTURES) {
            for (let texture in GameSettings.TEXTURES[textureType]) {
                this.ressouces.push(false);

                let index = this.ressouces.length - 1;
    
                GameSettings.TEXTURES[textureType][texture].load(() => {
                    console.log(`Texture : ${texture} loaded`);
                    this.ressouces[index] = true;                     
                });
            }
        }
    }
    
    canPlay() {
        let index = 0;
        let valid = true;

        while (valid && index < this.ressouces.length) {
            valid = this.ressouces[index];
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