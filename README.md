# Ball Collision Practice

## 1) 데모 영상

<img src="https://res.cloudinary.com/dr4ka7tze/image/upload/v1657829505/%EB%B8%94%EB%A1%9C%EA%B7%B8/Canvas_%EA%B3%B5_%EC%B6%A9%EB%8F%8C_%EC%8B%9C%EB%AE%AC%EB%A0%88%EC%9D%B4%EC%85%98_%EC%A0%95%EB%A6%AC%EA%B8%80/preview.gif" width="700px"/>

## 2) 배포 링크

[https://ball-collision-practice.vercel.app/](https://ball-collision-practice.vercel.app/)

## 3) 프로젝트 목표

- 생성된 캔버스에 10 ~ 20개의 공이 랜덤한 위치에 생성
- 0 ~ 360 사이의 랜덤한 각도로 공 이동
- 공의 크기는 10 ~ 20px의 랜덤한 반지름
- 공의 속도는 200 ~ 400px/s의 랜덤한 속도
- 벽과 부딪힐경우 반사각으로 튕김
- 공과 공이 부딪힐경우 반사각으로 튕김

## 4) 프로젝트 구조

```

    src
    ├── app.ts          # 캔버스 생성 및 렌더링
    ├── ball.ts         # 공 생성 클래스
    ├── vector.ts       # 벡터 생성 클래스
    └── utils.ts        # 공통 함수

```

## 5) 사용한 기술 스택

Typescript

### [프로젝트 과정 정리](https://github.com/mooon3356/ball-collision-practice/blob/master/README_2.md)
