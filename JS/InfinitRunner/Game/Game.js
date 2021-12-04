class Game {
    constructor() {
        this.window = new Window(Settings.WINDOWSIZE.width, Settings.WINDOWSIZE.height);
        this.interfaces = new Interfaces();
        this.states = [];

        this.clock = new Clock();

        this.states.push(new LoadRessourcesState(this.states, this.window, this.interfaces));
    }

    updateDT() {
        Settings.DT = this.clock.restart();
    }

    input() {
        Settings.INPUT();
    }

    update() {
        this.updateDT();

        this.states[this.states.length - 1].update();
    }

    draw() {
        this.window.clearWindow(Settings.DARK_BLUE);
        
        this.states[this.states.length - 1].draw(this.window);
    }

    loop() {
        if (this.states.length != 0) {
            this.input();
            this.update();
            this.draw();
        }
    }
}