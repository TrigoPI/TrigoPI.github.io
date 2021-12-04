class State {
    constructor(states, window, interfaces) {
        this.states = states;
        this.window = window
        this.interfaces = interfaces;
    } 

    kill() {
        if (this.states.length > 1) {
            this.states[this.states.length - 2].onBack();
        }

        this.states.pop();
    }

    onBack() {
        
    }

    update() {
        
    }

    draw(window) {

    }
}