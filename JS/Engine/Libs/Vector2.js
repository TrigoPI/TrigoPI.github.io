class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    static lerp(a, b, t) {
        return this.mult(this.sub(a, b), t);
    }

    static add(a, b) {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    static sub(a, b) {
        return new Vector2(b.x - a.x, b.y - a.y);
    }

    static mult(a, k) {
        return new Vector2(a.x * k, a.y * k);
    }

    static normalize(a) {
        let length = a.length();
        return new Vector2(a.x / length, a.y / length);
    }

    static dot(a, b) {
        return a.x * b.x + a.y * a.y
    }

    copy() {
        return new Vector2(this.x, this.y);
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    add(a) {
        this.x += a.x;
        this.y += a.y;
    }

    sub(a) {
        this.x -= a.x;
        this.y -= a.y;
    }

    normalize() {
        let length = this.length();
        this.x /= length;
        this.y /= length;
    }

    setMag(value) {
        this.normalize();
        this.x *= value;
        this.y *= value;
    }

    mult(k) {
        this.x *= k;
        this.y *= k;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}