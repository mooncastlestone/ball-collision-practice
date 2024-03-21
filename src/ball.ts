import Utils from './utils';
import Vector from "./vector";

interface Props {
  x: number;
  y: number;
  radius: number;
  direction: Vector
}

export default class Ball {
  private pos: Vector;
  private velocity: Vector
  private radius: number;

  constructor({ x, y, radius, direction }: Props) {
    this.pos = new Vector(x, y);
    this.velocity = Vector.mult(direction, Utils.getRandomNumber(200, 400))
    this.radius = radius;
  }

  drawBall(canvas: HTMLCanvasElement, deltaTime: number): void {
    const context = canvas.getContext("2d")!;

    // 델타 타임 적용한 스피드를 현재 좌표에 더해주면서 공 이동 구현
    const velocity: Vector = Vector.mult(this.velocity, deltaTime)
    this.pos = Vector.add(this.pos, velocity)

    // 벽에 충돌 시, 좌표에 -1을 곱하면서 반사각 구현
    if (this.pos.y + velocity.y < this.radius || this.pos.y + velocity.y > canvas.height - this.radius) {
      this.velocity.y *= -1;
    } else if (this.pos.x + velocity.x < this.radius || this.pos.x + velocity.x > canvas.width - this.radius) {
      this.velocity.x *= -1;
    }

    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    context.fillStyle = "black";
    context.fill()
    context.closePath();
  }

  checkCollision(ball: Ball): void {
    const subtractedVector = Vector.sub(this.pos, ball.pos);
    const distance = subtractedVector.mag();

    // 공끼리 충돌 시, 실행되는 코드
    if (distance <= this.radius + ball.radius) {
      const unitNormal = Vector.div(subtractedVector, subtractedVector.mag());
      const unitTangent = unitNormal.getTangent();

      // 공끼리 붙는 오류 방지 코드
      const correction = Vector.mult(unitNormal, this.radius + ball.radius);
      const newV = Vector.add(new Vector(ball.pos.x, ball.pos.y), correction);
      this.pos = newV

      // 충돌 벡터 계산을 위한 충돌된 공 두 개의 스피드 벡터를 복사
      const a = new Vector(this.velocity.x, this.velocity.y);
      const b = new Vector(ball.velocity.x, ball.velocity.y);

      // 충돌 후, 반사되는 벡터 생성을 위한 두 벡터들의 dot product(스칼라곱) 계산
      const a_normal_scalar = a.dot(unitNormal);
      const b_normal_scalar = b.dot(unitNormal);
      const a_tangent_scalar = a.dot(unitTangent);
      const b_tangent_scalar = b.dot(unitTangent);

      // 위에서 구한 dot product를 이용하여 새로운 Normal Direction 속력값 계산
      const a_normal_scalar_v2 =
        (a_normal_scalar * (this.radius - ball.radius) + 2 * ball.radius * b_normal_scalar) /
        (this.radius + ball.radius);
      const b_normal_scalar_v2 =
        (b_normal_scalar * (ball.radius - this.radius) + 2 * this.radius * a_normal_scalar) /
        (this.radius + ball.radius);

      // unit normal, unit tangent 벡터들을 활용해서 normal, tangent 벡터 생성
      const a_normal_vector = Vector.mult(unitNormal, a_normal_scalar_v2);
      const b_normal_vector = Vector.mult(unitNormal, b_normal_scalar_v2);
      const a_tangent_vector = Vector.mult(unitTangent, a_tangent_scalar);
      const b_tangent_vector = Vector.mult(unitTangent, b_tangent_scalar);

      // 위에서 계산한 normal, tangent 벡터들을 더해 최종적으로 반사되는 벡터 생성
      const a_after_vector = Vector.add(a_normal_vector, a_tangent_vector);
      const b_after_vector = Vector.add(b_normal_vector, b_tangent_vector);

      // 계산된 최종 벡터를 할당
      this.velocity = a_after_vector;
      ball.velocity = b_after_vector;
    }
  }
}
