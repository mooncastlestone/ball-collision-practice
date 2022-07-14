# Ball Collision Practice

## 1) 데모 영상
<img src="https://res.cloudinary.com/dr4ka7tze/image/upload/v1657829505/we-ar-assignment-min_zj2ed3.gif" width="700px"/>


## 2) 배포 링크
[https://ball-collision-practice.netlify.app](https://ball-collision-practice.netlify.app)

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


## 6) 프로젝트 실행 방법
1. vscode 익스텐션 중에 하나인 Live Server 설치
2. index.html 우클릭 후, Open With Live Server 실행

<img src="https://velog.velcdn.com/images/mooon3356/post/0a4f2559-92b5-4935-8209-103633b379a6/image.png" width="500px"/>

<img src="https://velog.velcdn.com/images/mooon3356/post/f1b3a5f5-76a6-404b-a2f4-02176d28ea40/image.png" width="500px"/>

### 현재 오류
```
로컬에서 파일을 열면, CORS 오류 발생
```

### 원인
```
script 태그에 type="module"이 포함된 HTML을 로컬에서 로드할 경우 자바스크립트 모듈 보안 요구사항으로 인해 CORS 오류 발생

-> Typescript 컴파일 과정에서 import 관련 오류가 발생하여 script 태그에 type 속성 추가 
```

### [프로젝트 과정 정리](https://github.com/mooon3356/ball-collision-practice/blob/master/README_2.md)
