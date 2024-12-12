import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoStream from '../components/VideoStream';
import QuizControls from '../components/QuizControls';
import AlertModal from '../components/AlertModal';
import '../css/QuizPage.css';
import gestureLabels from '../model/gesture_labels.json';

function QuizPage() {
  const [quiz, setQuiz] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [quizCount, setQuizCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    generateRandomQuiz();
  }, []);

  const generateRandomQuiz = () => {
    if (!gestureLabels?.labels) {
      console.error('Labels not found in gesture_labels.json');
      return;
    }

    const labels = Object.values(gestureLabels.labels);
    const randomIndex = Math.floor(Math.random() * labels.length);
    setQuiz({
      question: labels[randomIndex],
      correctAnswer: labels[randomIndex]
    });
  };

  const checkAnswer = async () => {
    setLoading(true);
    try {
      const result = await recognizeSignLanguage();
      setAiResult(result);
      
      if (result === quiz.correctAnswer) {
        setModalMessage('정답입니다!');
        setShowModal(true);
        setTimeout(() => {
          if (quizCount < 4) {
            generateRandomQuiz();
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
    } catch (error) {
      console.error('퀴즈 검사 중 오류 발생:', error);
      setModalMessage('오류가 발생했습니다. 다시 시도해주세요.');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
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
      throw new Error('인식 실패');
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
    navigate('/learning');
  };

  return (
    <div className="quiz-page">
      <div className="quiz-progress">
        문제 {quizCount + 1} / 5
      </div>
      <div className="video-container">
        <VideoStream onStreamReady={setVideoStream} />
      </div>
      <QuizControls 
        quiz={quiz} 
        onSubmit={checkAnswer}
        loading={loading}
      />
      {showModal && (
        <AlertModal
          message={modalMessage}
          onClose={() => {
            setShowModal(false);
            if (modalMessage.includes('오답입니다')) {
              handleRetry();
            }
          }}
        />
      )}
    </div>
  );
}

export default QuizPage;
