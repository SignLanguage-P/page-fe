
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoStream from '../components/VideoStream';
import QuizControls from '../components/QuizControls';
import AlertModal from '../components/AlertModal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { fetchRandomQuiz } from '../data/quizService';
import '../css/QuizPage.css';

function QuizPage() {
  const [quiz, setQuiz] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [quizCount, setQuizCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const navigate = useNavigate();

  const videoRef = useRef(null);

  const generateRandomQuiz = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError(false);
      const quizData = await fetchRandomQuiz();

      setQuiz(quizData);
    } catch (error) {
      console.error('퀴즈 로딩 오류:', error);
      setLoadError(true);
      setModalMessage('퀴즈를 불러오는데 실패했습니다.');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    generateRandomQuiz();
  }, [generateRandomQuiz]);

  const handleQuizComplete = useCallback(() => {
    setModalMessage('축하합니다! 모든 퀴즈를 완료했습니다!');
    setIsQuizCompleted(true);
    setShowModal(true);
  }, []);


  const handleRetry = useCallback(() => {
    setShowModal(false);
    navigate('/learning');
  }, [navigate]);


  const handleStreamReady = useCallback((stream) => {
    if (stream) {
      setVideoStream(stream);
      setCameraError(false);
    } else {
      setCameraError(true);
      setModalMessage('카메라 연결에 실패했습니다. 카메라 권한을 확인해주세요.');
      setShowModal(true);
    }
  }, []);

  const handleModalClose = useCallback(() => {
    if (modalMessage.includes('오답입니다')) {
      navigate('/learning');
    } else if (isQuizCompleted) {
      navigate('/');
    } else if (loadError) {
      setShowModal(false);
      setLoadError(false);
      generateRandomQuiz();
    } else {
      setShowModal(false);
    }
  }, [modalMessage, navigate, isQuizCompleted, loadError, generateRandomQuiz]);

  const checkAnswer = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      if (quizCount >= 4) {
        handleQuizComplete();
      } else {
        setModalMessage('정답입니다!');
        setShowModal(true);
        const timer = setTimeout(() => {
          generateRandomQuiz();
          setQuizCount(prev => prev + 1);
          setShowModal(false);
        }, 2000);
        return () => clearTimeout(timer);

      }
    } catch (error) {
      console.error('퀴즈 검사 중 오류 발생:', error);
      setModalMessage('오답입니다! 다시 학습하시겠어요?');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  }, [loading, quizCount, handleQuizComplete, generateRandomQuiz]);

  const onResultChange = useCallback((isCorrect) => {
    if (isCorrect) {
      setModalMessage('정답입니다!');
    } else {
      setModalMessage('오답입니다! 다시 학습하시겠어요?');
    }
    setShowModal(true);
    if (!isCorrect) {
      const timer = setTimeout(() => {
        setShowModal(false);
        navigate('/learning');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  return (
    <div className="quiz-page">
      <div className="quiz-section">
        <div className="quiz-content">
          <h2 className="quiz-question">
            {loading ? (
              "퀴즈 로딩중..."
            ) : quiz ? (
              `"${quiz.question}" 수어를 보여주세요`
            ) : loadError ? (
              "퀴즈 로딩 실패"
            ) : (
              "퀴즈를 불러오는 중..."
            )}
          </h2>
        </div>
      </div>
      <div className="video-container">
        <VideoStream 
          ref={videoRef}
          onStreamReady={handleStreamReady}
          quizAnswer={quiz?.answer}
          onResultChange={onResultChange}
        />
      </div>
      <div className="quiz-progress">
        남은 문제: {5 - quizCount} / 5
      </div>
      {loading && <LoadingSpinner />}
      {(showModal || loadError) && (
        <AlertModal
          message={loadError ? "퀴즈를 불러오는데 실패했습니다." : modalMessage}
          onClose={handleModalClose}
          type={modalMessage.includes('축하합니다') ? 'complete' : modalMessage.includes('정답') ? 'success' : 'error'}
          showRetryButton={modalMessage.includes('오답')}
          showHomeButton={isQuizCompleted || loadError}
        />
      )}
    </div>
  );
}

export default QuizPage;
