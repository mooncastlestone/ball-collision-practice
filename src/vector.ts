export default class Vector {
  constructor(public x: number, public y: number) { }

  static add(vector1: Vector, vector2: Vector): Vector {
    return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
  }

  static sub(vector1: Vector, vector2: Vector): Vector {
    return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
  }

  static mult(vector: Vector, scalar: number): Vector {
    return new Vector(vector.x * scalar, vector.y * scalar);
  }

  static div(vector: Vector, scalar: number): Vector {
    return new Vector(vector.x / scalar, vector.y / scalar);
  }

  dot(vector: Vector): number {
    return this.x * vector.x + this.y * vector.y;
  }

  getTangent(): Vector {
    return new Vector(-this.y, this.x);
  }

  mag(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
}
