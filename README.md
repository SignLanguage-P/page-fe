# P 프로젝트 - 수화 학습 웹 제작
React를 이용하여 프론트 화면 구성

## 제작 기한
2024.11 ~ 2024.12.20

## 사용 기술
<img src="https://img.shields.io/badge/html5-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white" /> <img src="https://img.shields.io/badge/css3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white" /> <img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=black" /> <img src="https://img.shields.io/badge/react-%2361DAFB.svg?&style=for-the-badge&logo=react&logoColor=black" />

## 구성
1. 메인 페이지
- 학습, 퀴즈 페이지로 연결
- 모든 페이지에 홈으로 연결되는 아이콘 등의 상단바 적용(반응형 상단바)

2. 카테고리
- 단어 학습 및 퀴즈 카테고리 상단바(드롭 다운)

3. 학습 화면
- 영상 자료 + 설명
- 수강 사이드 바를 띄워 세부카테고리로 이동
- 이전, 다음 구현

4. 퀴즈 화면 페이지
- 회원 카메라를 통해 모션 인식(AI와 연결)
- 랜덤 퀴즈를 띄우고 이전 다음 페이지 구현

5. 오답 노트
- 위의 퀴즈 화면에서 틀린 문제들을 오답노트로
- 퀴즈 화면과 비슷한 디자인

## 구조
수화교육/  
├── public/  
│   ├── index.html  
│   ├── manifest.json 
│   └── robots.txt
├── src/  
│   ├──assets/  
│   │   └── logo.png
│   ├── components/  
│   │   ├── AlertModal.js        // 퀴즈 알림모달
│   │   ├── Navbar.js            // 상단바  
│   │   ├── Sidebar.js           // 학습 카테고리 사이드바  
│   │   ├── QuizControl.js       // 퀴즈 질문 모달
│   │   └── VideoStream.js       // 퀴즈 카메라 접근 모달
│   ├── css/                     // 각 요소의 css  
│   ├── data/         
│   │   ├── categoryData.js      // 카테고리 데이터
│   │   └── videoData.js         //  비디오 데이터 
│   ├── pages/  
│   │   ├── Home.js             // 메인 페이지  
│   │   ├── Study.js            // 학습 화면  
│   │   └── QuizPage.js         // 퀴즈 화면  
│   ├── App.js   
│   ├── index.js  
│   └── App.css  
└── package.json  
