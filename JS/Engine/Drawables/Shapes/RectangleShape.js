class RectangleShape extends Shape {
    constructor(x, y, width, height, fillColor = Settings.TRANSPARENT, boderColor = Settings.BLACK) {
        super(x, y, fillColor, boderColor);

        this.width = width;
        this.height = height;
    }
}