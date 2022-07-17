import Vector from "./vector.js";

interface Props {
  x: number;
  y: number;
  radius: number;
  speed: {
    x: number;
    y: number;
  };
}

export default class Ball {
  private pos: Vector;
  private speed: Vector;
  private radius: number;

  constructor({ x, y, radius, speed }: Props) {
    this.pos = new Vector(x, y);
    this.speed = Vector.random(speed.x, speed.y);
    this.radius = radius;
  }

  drawBall(context: CanvasRenderingContext2D, deltaTime: number): void {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");

    // 델타 타임 적용한 스피드를 현재 좌표에 더해주면서 공 이동 구현
    const velocity = new Vector(this.speed.x * deltaTime, this.speed.y * deltaTime);
    this.pos.x += velocity.x;
    this.pos.y += velocity.y;

    // 벽에 충돌 시, 좌표에 -1을 곱하면서 반사각 구현
    if (this.pos.y + velocity.y < this.radius || this.pos.y + velocity.y > canvas.height - this.radius) {
      this.speed.y *= -1;
    } else if (this.pos.x + velocity.x < this.radius || this.pos.x + velocity.x > canvas.width - this.radius) {
      this.speed.x *= -1;
    }

    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = "black";
    context.fill();
    context.closePath();
  }

  checkCollision(ball: Ball): void {
    let subtractedVector = Vector.sub(this.pos, ball.pos);
    let distance = subtractedVector.mag();

    // 공끼리 충돌 시, 실행되는 코드
    if (distance <= this.radius + ball.radius) {
      const unitNormal = Vector.div(subtractedVector, subtractedVector.mag());
      const unitTangent = unitNormal.getTangent();

      // 공끼리 붙는 오류 방지 코드
      const correction = Vector.mult(unitNormal, this.radius + ball.radius);
      const newV = Vector.add(new Vector(ball.pos.x, ball.pos.y), correction);
      this.pos.x = newV.x;
      this.pos.y = newV.y;

      // 충돌 벡터 계산을 위한 충돌된 두 개의 공 복사
      const a = new Vector(this.speed.x, this.speed.y);
      const b = new Vector(ball.speed.x, ball.speed.y);

      // 충돌 후, 반사되는 방향의 스칼라를 구하는 코드
      const a_normal_scalar = a.dot(unitNormal);
      const b_normal_scalar = b.dot(unitNormal);
      const a_tangent_scalar = a.dot(unitTangent);
      const b_tangent_scalar = b.dot(unitTangent);

      // 충돌 후, 반사되는 방향의 속도를 구하는 코드
      const a_normal_velocity: number =
        (a_normal_scalar * (this.radius - ball.radius) + 2 * ball.radius * b_normal_scalar) /
        (this.radius + ball.radius);
      const b_normal_velocity: number =
        (b_normal_scalar * (ball.radius - this.radius) + 2 * this.radius * a_normal_scalar) /
        (this.radius + ball.radius);

      // 위에서 구한 스칼라와 속도를 유닛 벡터에 결합하는 코드
      const a_n_vector = Vector.mult(unitNormal, a_normal_velocity);
      const b_n_vector = Vector.mult(unitNormal, b_normal_velocity);
      const a_t_vector = Vector.mult(unitTangent, a_tangent_scalar);
      const b_t_vector = Vector.mult(unitTangent, b_tangent_scalar);

      // 위에서 계산한 normal, tangent 벡터들을 더해서 최종적으로 이동하게 될 벡터 생성
      const a_after_vector = Vector.add(a_n_vector, a_t_vector);
      const b_after_vector = Vector.add(b_n_vector, b_t_vector);

      // 계산된 최종 벡터를 할당
      this.speed = a_after_vector;
      ball.speed = b_after_vector;
    }
  }
}
