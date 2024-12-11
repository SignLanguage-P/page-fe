import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoStream from '../components/VideoStream';
import QuizControls from '../components/QuizControls';
import AlertModal from '../components/AlertModal';
import '../css/QuizPage.css';

function QuizPage() {
  const [quiz, setQuiz] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [quizCount, setQuizCount] = useState(0);
  const navigate = useNavigate();

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
          setModalMessage('정답입니다!');
          setTimeout(() => {
            if (quizCount < 4) {
              fetchRandomQuiz();
              setQuizCount(quizCount + 1);
              setShowModal(false);
            } else {
              setModalMessage('축하합니다! 모든 퀴즈를 완료했습니다.');
              setTimeout(() => {
                navigate('/');
              }, 3000);
            }
          }, 2000);
        } else {
          setModalMessage('오답입니다! 잘 모르겠나요? [다시 학습하기]');
          setShowModal(true);
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
    if (videoStream) {
      canvas.width = videoStream.videoWidth;
      canvas.height = videoStream.videoHeight;
      context.drawImage(videoStream, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg');
    }
    return null;
  };

  const handleRetry = () => {
    setShowModal(false);
    // 다시 학습하기 로직 추가
  };

  return (
    <div className="quiz-page">
      <h2>퀴즈 화면</h2>
      <div className="video-container">
        <VideoStream onStreamReady={setVideoStream} />
      </div>
      <QuizControls quiz={quiz} aiResult={aiResult} onSubmit={checkAnswer} />
      {showModal && (
        <AlertModal
          message={modalMessage}
          onClose={() => setShowModal(false)}
        >
          {modalMessage.includes('오답입니다') && (
            <button onClick={handleRetry}>다시 학습하기</button>
          )}
        </AlertModal>
      )}
    </div>
  );
}

export default QuizPage;
