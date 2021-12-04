class MenuState extends State {
    constructor(states, window, interfaces) {
        super(states, window, interfaces);
        
        this.interfaces.displayInterface("main_menu");

        this.menuSpriteSheet = GameSettings.TEXTURES.spriteSheets.menuBackground.copy();
        this.menuAnimation = new Animation(this.menuSpriteSheet, "", 7);
        
        this.buttons = {
            start : document.getElementById("start_button"),
            settings : document.getElementById("settings_button")
        }
        
        this.sliderEndEvent();
        this.buttonsEventClick();
        this.buttonsEventHover();
    }

    sliderEndEvent() {
        this.interfaces.displayInterface("slider_switch_l");

        this.interfaces.getInterface("slider_switch_l").onanimationend = event => {
            this.interfaces.removeInterface("slider_switch_l");
        }
    }

    buttonsEventClick() {
        this.buttons.start.onclick = event => {
            GameSettings.AUDIOS.gameStart.clone().play();

            this.interfaces.displayInterface("slider_switch_r");

            this.interfaces.getInterface("slider_switch_r").onanimationend = event => {
                this.interfaces.removeInterface("slider_switch_r");
                this.interfaces.removeInterface("main_menu");            
                
                this.states.push(new GameState(this.states, this.window, this.interfaces));   
            }
        };

        this.buttons.settings.onclick = event => {
            GameSettings.AUDIOS.slider.clone().play();

            this.interfaces.displayInterface("slider_switch_r");

            this.interfaces.getInterface("slider_switch_r").onanimationend = event => {
                this.interfaces.removeInterface("slider_switch_r");
                this.interfaces.removeInterface("main_menu");

                this.states.push(new SettingsState(this.states, this.window, this.interfaces));
            }
        };
    }

    buttonsEventHover() {
        for (let button in this.buttons) {
            this.buttons[button].onmouseenter = () => { GameSettings.AUDIOS.mouseHover.clone().play() };
        }
    }

    onBack() {
        this.menuAnimation.reset();

        this.interfaces.displayInterface("main_menu");
        this.interfaces.displayInterface("slider_switch_l");

        this.interfaces.getInterface("slider_switch_l").onanimationend = event => {
            this.interfaces.removeInterface("slider_switch_l");
        }
    }

    update() {
        this.menuSpriteSheet.setCellSizeRender(Settings.WINDOWSIZE.width, Settings.WINDOWSIZE.height);

        this.menuAnimation.position.x = Settings.WINDOWSIZE.width  / 2;
        this.menuAnimation.position.y = Settings.WINDOWSIZE.height / 2;

        this.menuAnimation.update();
    }

    draw(window) {
        window.draw(this.menuAnimation);
    }
}