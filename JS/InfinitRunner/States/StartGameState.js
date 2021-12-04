class StartGameState extends State {
    constructor(states, window, interfaces) {
        super(states, window, interfaces);

        this.start = false;

        this.interfaces.displayInterface("press_enter");
    }

    update() {
        if (!this.start) {
            if (Settings.KEYS.Enter.onPress) {
                this.interfaces.displayInterface("slider_switch_r");
                GameSettings.AUDIOS.slider.clone().play();

                this.start = true;

                this.interfaces.getInterface("slider_switch_r").onanimationend = event => {
                    this.start = false;

                    this.interfaces.removeInterface("slider_switch_r");
                    this.interfaces.removeInterface("press_enter");

                    this.states.push(new MenuState(this.states, this.window, this.interfaces));
                }
            }
        }
    }
}