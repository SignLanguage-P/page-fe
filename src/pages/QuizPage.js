import React, { useState, useEffect } from 'react';
import '../css/QuizPage.css';

function QuizPage() {
  const [quiz, setQuiz] = useState('');
  const [videoStream, setVideoStream] = useState(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        setVideoStream(stream);
      })
      .catch(error => {
        console.error('카메라 접근 실패:', error);
      });

    // 임의의 퀴즈 설정
    setQuiz('수화 단어 퀴즈');

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoStream]);

  const checkAnswer = () => {
    // 검증 코드 시작
    if (answer === '1') {
      alert('정답입니다!');
    } else {
      alert('오답입니다!');
      sendWrongAnswer();
    }
    // 검증 코드 끝
  };

  const sendWrongAnswer = () => {
    console.log('오답 전송:', { question: quiz, answer });
  };

  return (
    <div className="quiz-page">
      <h2>퀴즈 화면</h2>
      <div className="video-container">
        <video
          autoPlay
          playsInline
          ref={video => {
            if (video && videoStream) {
              video.srcObject = videoStream;
            }
          }}
        />
      </div>
      <div className="quiz-container">
        <p>{quiz}</p>
        <input
          type="text"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="정답을 입력하세요"
        />
        <button onClick={checkAnswer}>제출</button>
        <button>이전</button>
        <button>다음</button>
      </div>
    </div>
  );
}

export default QuizPage;
