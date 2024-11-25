# P 프로젝트 - 수화 학습 웹 제작
React를 이용하여 프론트 구성

## 제작 기한
2024.11 ~ 2024.12.20

## 사용 기술
<img src="https://img.shields.io/badge/html5-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/css3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white" /> <img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=black" /> <img src="https://img.shields.io/badge/react-%2361DAFB.svg?&style=for-the-badge&logo=react&logoColor=black" />

## 구성
1. 메인 페이지
- 학습, 퀴즈 페이지로 연결
- 로그인, 로그아웃 상태에 따라 화면 구성 변경(?)
- 모든 페이지에 홈으로 연결되는 아이콘 등의 상단바 적용(반응형 상단바)

2. 회원 페이지
- 학습 현황 표시
- 로그인, 회원가입 화면
- 개인정보 표시, 클릭시 기본정보 페이지
- 오답노트 페이지 연결

3. 기본정보 페이지
- 회원의 사진, 이름, 회원번호, 이메일 등

4. 카테고리
- 단어 학습 및 퀴즈 카테고리 상단바(드롭 다운)

5. 학습 화면
- 영상 자료 + 설명
- 수강 사이드 바를 띄워 세부카테고리로 이동
- 이전, 다음 구현

6. 퀴즈 화면 페이지
- 회원 카메라를 통해 모션 인식(AI와 연결)
- 랜덤 퀴즈를 띄우고 이전 다음 페이지 구현

7. 오답 노트
- 위의 퀴즈 화면에서 틀린 문제들을 오답노트로
- 퀴즈 화면과 비슷한 디자인

## 구조
수화교육/  
├── public/  
│   └── index.html  
├── src/  
│   ├──assets/  
│   │   └──  
│   ├── components/  
│   │   ├── Navbar.js         // 상단바  
│   │   ├── Sidebar.js        // 수강 사이드바  
│   │   ├── Quiz.js           // 퀴즈 화면  
│   │   ├── Learning.js       // 학습 화면  
│   │   ├── UserProfile.js    // 기본정보 페이지  
│   │   └── WrongNote.js      // 오답노트 페이지  
│   ├── pages/  
│   │   ├── Home.js           // 메인 페이지  
│   │   ├── Signup.js         // 회원가입 페이지  
│   │   ├── Login.js          // 로그인 페이지  
│   │   ├── MyPage.js         // 회원 페이지  
│   │   ├── Category.js        // 카테고리 페이지  
│   │   ├── Study.js          // 학습 화면  
│   │   └── QuizPage.js       // 퀴즈 화면  
│   ├── App.js  
│   ├── index.js  
│   └── App.css  
└── package.json  
  
