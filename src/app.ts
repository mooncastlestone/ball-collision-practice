import Ball from "./ball.js";
import Utils from "./utils.js";
import Vector from './vector.js';

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

    this.canvas.width = 1000;
    this.canvas.height = 500;

    document.body.appendChild(this.canvas);
  }

  private makeBalls(): void {
    let balls = [];

    // 랜덤으로 공 10 ~ 20개 생성
    for (let i = 0; i < Utils.getRandomNumber(10, 20); i++) {
      // 반지름, 좌표 랜덤 생성
      const radius: number = Utils.getRandomNumber(10, 20);
      const x: number = Utils.getRandomNumber(radius * 2, this.canvas.width - radius * 2);
      const y: number = Utils.getRandomNumber(radius * 2, this.canvas.height - radius * 2);

      // 랜덤으로 0 ~ 360 각도를 가진 벡터 생성
      const radian: number = Math.PI * 2 * Math.random()
      const direction: Vector = new Vector(Math.cos(radian), Math.sin(radian))
      balls.push(new Ball({ x, y, radius, direction }));
    }
    
    this.balls = balls;
  }

  private draw(): void {
    // 델타 타임 설정
    const currentTime = Date.now();
    this.deltaTime = (currentTime - this.startTime) * 0.001;
    this.startTime = currentTime;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.balls.forEach((ball, idx) => {
      ball.drawBall(this.canvas, this.deltaTime);
      
      const currentBall = ball;
      const restBalls = this.balls.slice(idx + 1);
      
      restBalls.forEach((ball) => {
        ball.checkCollision(currentBall);
      });
    });

    window.requestAnimationFrame(this.draw.bind(this));
  }
}
const app = new App();
