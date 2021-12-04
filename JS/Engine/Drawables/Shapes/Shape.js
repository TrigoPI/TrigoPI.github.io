class Shape extends Drawable {
    constructor(x, y, fillColor = Settings.TRANSPARENT, boderColor = Settings.BLACK) {
        super(x, y);

        this.fillColor = fillColor;
        this.boderColor = boderColor;        
    }
}