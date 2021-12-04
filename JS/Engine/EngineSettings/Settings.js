((global, factory) => {
    factory(global.Settings = {});
})(this, (exports) => {
    const FPS = 60;
    const GRAVITY = new Vector2(0, 3);
    const DT = 1 / FPS;

    const RED               = new Color(255, 0, 0);
    const GREEN             = new Color(0, 255, 0);
    const BLUE              = new Color(0, 0, 255);
    const WHITE             = new Color(255, 255, 255);
    const BLACK             = new Color(0, 0, 0);
    const DRACULA_ORCHID    = new Color(45, 52, 54);
    const SHY_MOMENT        = new Color(162, 155, 254);
    const DARK_BLUE         = new Color(5, 44, 70);
    const AMERICAN_RIVER    = new Color(99, 110, 114);
    const TRANSPARENT       = new Color(0, 0, 0, 0);

    const MOUSE = {
        x : 0,
        y : 0,
        worldX : 0,
        worldY : 0,
        buttons : {
            left  : new MouseButton(),
            right : new MouseButton()
        } 
    };

    const KEYS = {
        Space      : new Key("Space"),
        ArrowUp    : new Key("ArrowUp"),
        ArrowLeft  : new Key("ArrowLeft"),
        ArrowDown  : new Key("ArrowDown"),
        ArrowRight : new Key("ArrowRight"),
        KeyQ       : new Key("KeyQ"),
        KeyA       : new Key("KeyA"),
        KeyD       : new Key("KeyD"),
        Enter      : new Key("Enter")
    };
    
    const WINDOWSIZE = {
        width : window.innerWidth, 
        height : window.innerHeight
    };

    const KEYPRESSED = event => {
        let isPressed = (event.type == "keydown")? true:false;

        if (event.code in Settings.KEYS) {
            KEYS[event.code].setPressed(isPressed);
        }
    }

    const MOUSEMOVE = event => {
        MOUSE.x = event.clientX;
        MOUSE.y = event.clientY;
    }

    const MOUSEPRESSED = event => {
        let type = (event.type == "mousedown")? true:false; 

        switch (event.button) {
            case 0 : 
                MOUSE.buttons.left.setPressed(type);
                break;
            case 2 :
                MOUSE.buttons.right.setPressed(type);
                break;
        }
    }

    const DEGTORAD = angle => {
        return angle * Math.PI / 180;
    };

    const GENERATE_ID = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    const RANDOM = (a) => {
        return Math.random() * a;
    };

    const RANDOM_RANGE = (min, max) => {
        return Math.random() * (max - min) + min;
    };

    const RANDOM_INT = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const RANDOM_NUMBER = (a, b) => {
        return (RANDOM_INT(0, 1) == 0)? a:b;
    };

    const RANDOM_VECTOR_RANGE = (min, max) => {
        let mag = RANDOM_RANGE(min, max);

        let x = RANDOM_RANGE(-1, 1);
        let y = RANDOM_NUMBER(-1, 1) * Math.sqrt(1 - x*x);

        x *= mag;
        y *= mag;

        return new Vector2(x, y);
    };

    const RANDOM_INDEX = (x) => {
        let index = 0;
        let s = 0;
        let value = Math.random();

        for (let i of x) {
            s += i;

            if (value <= s) {
                return index;
            }

            index++;
        }

        return index;
    }

    const WORLDTOSCREEN = (camera, position) => {
        return Vector2.sub(camera, position);
    };

    const INPUT = () => {
        for (let key in KEYS) {
            KEYS[key].update();
        }

        for (let button in MOUSE.buttons) {
            MOUSE.buttons[button].update();
        }
    };

    (() => {
        document.addEventListener("mousemove", MOUSEMOVE);
        document.addEventListener("mousedown", MOUSEPRESSED);
        document.addEventListener("mouseup",   MOUSEPRESSED);
        document.addEventListener("keydown",   KEYPRESSED);
        document.addEventListener("keyup",     KEYPRESSED);
    })();

    exports.FPS                     = FPS;
    exports.GRAVITY                 = GRAVITY;
    exports.DT                      = DT;
    exports.RED                     = RED;
    exports.GREEN                   = GREEN;
    exports.BLUE                    = BLUE;
    exports.WHITE                   = WHITE;
    exports.BLACK                   = BLACK;
    exports.DRACULA_ORCHID          = DRACULA_ORCHID;
    exports.AMERICAN_RIVER          = AMERICAN_RIVER;
    exports.DARK_BLUE               = DARK_BLUE;
    exports.SHY_MOMENT              = SHY_MOMENT;
    exports.TRANSPARENT             = TRANSPARENT;
    exports.KEYS                    = KEYS;
    exports.MOUSE                   = MOUSE;
    exports.WINDOWSIZE              = WINDOWSIZE;
    exports.DEGTORAD                = DEGTORAD;
    exports.GENERATE_ID             = GENERATE_ID;
    exports.RANDOM                  = RANDOM;
    exports.RANDOM_RANGE            = RANDOM_RANGE;
    exports.RANDOM_INT              = RANDOM_INT;
    exports.RANDOM_NUMBER           = RANDOM_NUMBER;
    exports.RANDOM_VECTOR_RANGE     = RANDOM_VECTOR_RANGE;
    exports.RANDOM_INDEX            = RANDOM_INDEX;
    exports.WORLDTOSCREEN           = WORLDTOSCREEN;
    exports.INPUT                   = INPUT;
});