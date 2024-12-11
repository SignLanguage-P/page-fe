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
- 랜덤 퀴즈를 띄우고, 최대 퀴즈 제한 설정


## 구조
```
page-fe/
 ┣ public/
 ┃ ┣ index.html
 ┃ ┣ manifest.json
 ┃ ┗ robots.txt
 ┣ src/
 ┃ ┣ assets/           
 ┃ ┃ ┗ logo.png                      // 로고
 ┃ ┣ components/
 ┃ ┃ ┣ AlertModal.js                 //퀴즈 정답 확인 알람
 ┃ ┃ ┣ Navbar.js                     //상단바
 ┃ ┃ ┣ QuizControls.js               //퀴즈 질문 확인
 ┃ ┃ ┣ Sidebar.js                    //학습 카테고리 사이드바
 ┃ ┃ ┗ VideoStream.js                //퀴즈 영상 모달
 ┃ ┣ css/
 ┃ ┃ ┣ AlertModal.css        
 ┃ ┃ ┣ Home.css
 ┃ ┃ ┣ Navbar.css
 ┃ ┃ ┣ QuizPage.css
 ┃ ┃ ┣ Sidebar.css
 ┃ ┃ ┗ Study.css
 ┃ ┣ data/
 ┃ ┃ ┣ categoryData.js              //학습 카테고리 데이터
 ┃ ┃ ┗ videoData.js                 //학습 영상 데이터
 ┃ ┣ pages/
 ┃ ┃ ┣ Home.js                      //메인 홈 화면
 ┃ ┃ ┣ QuizPage.js                  //퀴즈 페이지
 ┃ ┃ ┗ Study.js                     //학습 페이지
 ┃ ┣ App.css
 ┃ ┣ App.js
 ┃ ┣ index.css
 ┃ ┗ index.js
 ┣ .gitignore
 ┣ package-lock.json
 ┣ package.json
 ┗ README.md
```

## 구현 화면
![메인화면](https://github.com/user-attachments/assets/6109fb84-b890-4f0c-a607-5d4ee06007ea)

![학습화면](https://github.com/user-attachments/assets/a38ccc8b-3074-485b-98a4-5b40f8ebde03)
