import Ball from "./ball.js";
import Utils from "./utils.js";

class App {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private deltaTime: number;
  private startTime: number;
  private balls: Ball[];

  constructor() {
    this.createCanvas();
    this.makeBalls();
    this.startTime = Date.now();
    window.requestAnimationFrame(this.draw.bind(this));

    // 3초마다 Balls 위치 초기화
    setInterval(() => {
      this.makeBalls();
    }, 3000);
  }

  private createCanvas(): void {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d")!;
    this.canvas.id = "canvas";

    this.canvas.width = 1000;
    this.canvas.height = 500;

    document.body.appendChild(this.canvas);
  }

  private makeBalls(): void {
    let balls = [];

    // 랜덤으로 공 10 ~ 20개 생성
    for (let i = 0; i < Utils.getRandomNumber(10, 20); i++) {
      // 반지름, 좌표 랜덤 생성
      let radius = Utils.getRandomNumber(10, 20);
      let x = Utils.getRandomNumber(radius * 2, this.canvas.width - radius * 2);
      let y = Utils.getRandomNumber(radius * 2, this.canvas.height - radius * 2);

      // 0 ~ 360 각도 랜덤 생성하고 초기 스피드 값에 설정
      let angle = Math.PI * 2 * Math.random();
      let speed = {
        x: Utils.getRandomNumber(200, 400) * Math.cos(angle),
        y: Utils.getRandomNumber(200, 400) * Math.sin(angle),
      };
      balls.push(new Ball({ x, y, radius, speed }));
    }
    this.balls = balls;
  }

  private draw(): void {
    window.requestAnimationFrame(this.draw.bind(this));
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 델타 타임 설정
    const currentTime = Date.now();
    this.deltaTime = (currentTime - this.startTime) * 0.001;
    this.startTime = currentTime;

    this.balls.forEach((ball, idx) => {
      ball.drawBall(this.context, this.deltaTime);

      const currentBall = ball;
      const restBalls = this.balls.slice(idx + 1);

      restBalls.forEach((ball) => {
        ball.checkCollision(currentBall);
      });
    });
  }
}
const app = new App();
