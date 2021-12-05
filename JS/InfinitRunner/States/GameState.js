class GameState extends State {
    constructor(states, window, interfaces) {
        super(states, window, interfaces);
        
        this.interfaces.displayInterface("framerate_ui");

        this.inPause = false;

        this.mouseHoverSound = new Sound(GameSettings.PATHS.audios.test);
        this.sliderSound = new Sound(GameSettings.PATHS.audios.slider);

        this.ECS = new ECS();
        this.clock = new Clock();

        this.musicManager = new MusicsManager();
        this.mainCamera = new MainCamera(0, 0, this.window);
        this.player = new Player(0, -1000, this.musicManager);

        this.backgroundGenerator = new BackgroundGenerator(this.mainCamera);

        this.mainCamera.setPosition(0, -135);
        this.mainCamera.setTarget(this.player);

        this.#initCollisionMask();
        this.#initEntity();
        this.#sliderEndEvent();
    }

    #initCollisionMask() {
        this.ECS.getSystem(CollisionEngine).addCollisionMask("player");
        this.ECS.getSystem(CollisionEngine).addCollisionMask("pnj");
        this.ECS.getSystem(CollisionEngine).addCollisionMask("bullet");

        this.ECS.getSystem(CollisionEngine).ignoreCollision("player", "pnj");
        this.ECS.getSystem(CollisionEngine).ignoreAll("bullet");
    }

    #initEntity() {
        this.ECS.addEntity(this.mainCamera);
        this.ECS.addEntity(this.musicManager);
        this.ECS.addEntity(this.player);

        this.ECS.addEntity(new PNJManager(this.mainCamera));
        this.ECS.addEntity(new Platform(0, -50, 500000, 20));
    }

    #sliderEndEvent() {
        this.interfaces.displayInterface("slider_switch_l");

        this.interfaces.getInterface("slider_switch_l").onanimationend = event => {
            this.interfaces.removeInterface("slider_switch_l");
        }
    }

    #updateFrameRateUI() {
        if (this.clock.getTime() > 0.5) {
            this.interfaces.getInterface("framerate_ui").children[0].innerText = Math.floor(1 / Settings.DT);
        
            this.clock.restart();
        }
    }

    #updateQuit() {
        if (Settings.KEYS.KeyQ.onPress) {
            this.inPause = !this.inPause;
            
            if (this.inPause) {
                this.musicManager.setVolume(10);

                this.interfaces.displayInterface("pause_widget");

                document.getElementById("quit_game_button").onmouseenter = () => { GameSettings.AUDIOS.mouseHover.clone().play() };

                document.getElementById("quit_game_button").onclick = event => {
                    this.musicManager.stop();
                    this.sliderSound.play();

                    this.interfaces.displayInterface("slider_switch_r");

                    this.interfaces.getInterface("slider_switch_r").onanimationend = event => {
                        this.interfaces.removeInterface("slider_switch_r");
                        this.interfaces.removeInterface("pause_widget");
                        this.interfaces.removeInterface("framerate_ui");

                        this.kill();
                    }
                };
            } else {
                this.musicManager.setVolume(40);

                document.getElementById("quit_game_button").onmouseenter = () => {};
                document.getElementById("quit_game_button").onclick = event => {};
            
                this.interfaces.removeInterface("pause_widget");
            }
        }
    }

    #updateCameraAnchor() {
        let y = Settings.WINDOWSIZE.height - 135;

        this.mainCamera.setAnchor(300, y);
    }

    #updateECS() {
        if (!this.inPause) {
            this.ECS.getSystem(TransformEngine).update();
            this.ECS.getSystem(PhysicsEngine).update();
            this.ECS.getSystem(CollisionEngine).update();
            this.ECS.getSystem(AnimatorEngine).update();
            this.ECS.getSystem(ParticleSystemEngine).update();
        }
        
        this.ECS.getSystem(RenderingEngine).update();
    }

    #updateGenerator() {
        this.backgroundGenerator.update();
    }

    update() {
        this.#updateQuit();
        this.#updateECS();
        this.#updateCameraAnchor();
        this.#updateGenerator();
        this.#updateFrameRateUI();
    }

    draw(window) {
        this.mainCamera.begin();
        this.backgroundGenerator.draw(window);
        this.ECS.getSystem(ParticleSystemEngine).draw(window);
        this.ECS.getSystem(RenderingEngine).draw(window);
        this.mainCamera.end();
    }
}