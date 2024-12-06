import React, { useState, useEffect, useRef } from 'react';
import '../css/QuizPage.css';

function QuizPage() {
  const [quiz, setQuiz] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        setVideoStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(error => {
        console.error('카메라 접근 실패:', error);
      });

    fetchRandomQuiz();

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoStream]);

  const fetchRandomQuiz = async () => {
    try {
      const response = await fetch('https://your-backend-api.com/api/quizzes/random');
      const data = await response.json();
      setQuiz(data);
    } catch (error) {
      console.error('퀴즈를 불러오는 데 실패했습니다:', error);
    }
  };

  const checkAnswer = () => {
    recognizeSignLanguage()
      .then(result => {
        setAiResult(result);
        if (result === quiz.correctAnswer) {
          alert('정답입니다!');
        } else {
          alert('오답입니다!');
          sendWrongAnswer();
        }
      });
  };

  const recognizeSignLanguage = async () => {
    try {
      const frame = captureVideoFrame();
      const response = await fetch('https://your-ai-api.com/api/recognize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ frame }),
      });
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('AI 모델 호출 실패:', error);
      return '오류';
    }
  };

  const captureVideoFrame = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg');
    }
    return null;
  };

  const sendWrongAnswer = () => {
    const wrongAnswers = JSON.parse(localStorage.getItem('wrongAnswers')) || [];
    wrongAnswers.push({ question: quiz.question, answer: aiResult });
    localStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers));
    console.log('오답 전송:', { question: quiz.question, answer: aiResult });
  };

  return (
    <div className="quiz-page">
      <h2>퀴즈 화면</h2>
      <div className="video-container">
        <video
          autoPlay
          playsInline
          ref={videoRef}
        />
      </div>
      <div className="quiz-container">
        {quiz ? (
          <>
            <p>{quiz.question} (난이도: {quiz.difficulty})</p>
            <button onClick={checkAnswer}>제출</button>
          </>
        ) : (
          <p>퀴즈를 불러오는 중...</p>
        )}
        <button onClick={fetchRandomQuiz}>다음 퀴즈</button>
        {aiResult && <p>AI 결과: {aiResult}</p>}
      </div>
    </div>
  );
}

export default QuizPage;
