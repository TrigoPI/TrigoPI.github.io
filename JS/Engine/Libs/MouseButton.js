class MouseButton {
    constructor() {
        this.pressed = false;
        this.onPress = false;

        this.counter = 0;
    }

    setPressed(value) {
        this.pressed = value;
    }

    update() {
        if (this.pressed) {
            if (this.counter == 0) {
                this.onPress = true;
                this.counter++;
            } else {
                this.onPress = false;
            }
        } else {
            this.onPress = false;
            this.counter = 0;
        }
    }
}