# 프로젝트 과정 정리

## 1. 공 생성에 필요한 랜덤 숫자 구한 방법

Utils 클래스를 생성하여 공통적으로 사용되는 함수 등록하여 사용.<br>
인자로 최소, 최대 숫자를 받아 사이에 있는 랜덤한 숫자를 반환하게 구현.

```javascript
// utils.ts
export default class Utils {
  static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min; // 최댓값, 최솟값 포함
  }
}
```

## 2. 공 충돌 기능 구현 방법

<img src="https://velog.velcdn.com/images/mooon3356/post/d386d9a1-116e-4828-8931-34310d77e489/image.png" width="300px"/>

1. 두 공의 벡터를 이용하여 un(unit normal)과 ut(unit tangent)를 구한다.

2. 만약 unit normal의 길이가 두 공의 반지름을 더한 값보다 작거나 같아진다면, 충돌로 인식

3. un, ut와 두 공이 충돌하기 전의 속도를 이용하여 반사되는 스칼라 값을 구한다.

4. 아래 공식을 이용하여 충돌 이후, 반사되는 속도를 구한다.
-> 여기서 m은 mass인데 질량 관련된 속성은 없으니 반지름으로 대체한다.


![](https://velog.velcdn.com/images/mooon3356/post/ff260b4c-d0d3-4a49-abf8-69358e339697/image.png)

5. 3번과 4번에서 계산한 충돌 이후 반사되는 스칼라와 속도를 결합하여 벡터를 생성한다.

6. 각각의 공에 새롭게 생성된 벡터를 할당하여 다시 반사된 방향으로 이동한다.


### 참고 링크

[2-Dimensional Elastic Collisions Without Trigonometry](https://imada.sdu.dk/~rolf/Edu/DM815/E10/2dcollisions.pdf)

## 3. 공끼리 붙는 오류 해결한 방법

### 원인
```
공들이 생성되는 시점에, 좌표가 겹쳐버려 충돌했을 때 실행되는 함수가 지속적으로 실행됨.
```

### 해결한 방법

```
1. 겹쳐진 두 공 사이의 Unit Normal 벡터를 구한다.

2. Unit Normal 벡터에 두 공의 반지름을 합한 값을 곱해서 정상적인 Unit Normal 벡터를 생성한다.
   -> 정상적으로 충돌된 두 공의 Unit Normal 길이는 두 공의 반지름을 합한 값과 같다는 것을 이용

3. 2번에서 생성한 벡터와 충돌된 공의 벡터를 더하여 정상적인 위치로 새로 생성
```

### 해결한 코드
```javascript
checkCollision(ball: Ball): void {
  ...
const correction = Vector.mult(unitNormal, this.radius + ball.radius);
const newV = Vector.add(new Vector(ball.pos.x, ball.pos.y), correction);
this.pos.x = newV.x;
this.pos.y = newV.y;
  ...
}
```
