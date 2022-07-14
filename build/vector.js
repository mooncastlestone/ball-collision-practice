import Utils from "./utils.js";
export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static add(vector1, vector2) {
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
    }
    static sub(vector1, vector2) {
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    }
    static mult(vector, scalar) {
        return new Vector(vector.x * scalar, vector.y * scalar);
    }
    static div(vector, scalar) {
        return new Vector(vector.x / scalar, vector.y / scalar);
    }
    static random(x, y) {
        if (Utils.getRandomNumber(1, 10) % 2 !== 0)
            x = -x;
        if (Utils.getRandomNumber(1, 10) % 2 !== 0)
            y = -y;
        return new Vector(x, y);
    }
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    getTangent() {
        return new Vector(-this.y, this.x);
    }
    mag() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
}
