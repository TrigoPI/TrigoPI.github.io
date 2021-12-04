class Transform {
    constructor(x, y) {
        this.position = new Vector2(x, y);
        this.localPosition = new Vector2();
    }
    
    setLocalPosition(x, y) {
        this.localPosition.set(x, y);
    }
}