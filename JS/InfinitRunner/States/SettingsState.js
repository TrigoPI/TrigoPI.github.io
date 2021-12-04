class SettingsState extends State {
    constructor(states, window, interfaces) {
        super(states, window, interfaces);

        this.interfaces.displayInterface("settings_menu");

        this.buttons = {
            back : document.getElementById("back_button"),
        }

        this.checkboxs = {
            fullscreen : document.getElementById("fullscreen_checkbox")
        }

        this.sliderEndEvent();
        this.buttonsEvent();
        this.buttonsEventHover();
        this.checkboxsEventClick();
    }

    buttonsEventHover() {
        for (let button in this.buttons) {
            this.buttons[button].onmouseenter = () => { GameSettings.AUDIOS.mouseHover.clone().play() };
        }
    }

    sliderEndEvent() {
        this.interfaces.displayInterface("slider_switch_l");

        this.interfaces.getInterface("slider_switch_l").onanimationend = event => {
            this.interfaces.removeInterface("slider_switch_l");
        }
    }

    checkboxsEventClick() {
        if (this.window.inFullScreen()) {
            this.checkboxs.fullscreen.checked = true;
        } else {
            this.checkboxs.fullscreen.checked = false;
        }

        this.checkboxs.fullscreen.onclick = event => {
            if (this.checkboxs.fullscreen.checked) {
                this.window.setFullScreen();
            } else {
                this.window.exitFullScreen();
            }
        }
    }

    buttonsEvent() {
        this.buttons.back.onclick = event => {
            GameSettings.AUDIOS.slider.clone().play();
            
            this.interfaces.displayInterface("slider_switch_r");

            this.interfaces.getInterface("slider_switch_r").onanimationend = event => {
                this.interfaces.removeInterface("settings_menu");
                this.interfaces.removeInterface("slider_switch_r");

                this.kill();
            }
        };
    }
}