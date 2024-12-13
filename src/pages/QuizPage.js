import React, { useState, useEffect, useRef } from 'react';
import VideoStream from '../components/VideoStream';
import QuizControls from '../components/QuizControls';
import AlertModal from '../components/AlertModal';
import { quizService } from '../data/quizService';
import '../css/QuizPage.css';

function QuizPage() {
  const [quiz, setQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [quizCount, setQuizCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState('BEGINNER');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [cameraError, setCameraError] = useState(false);
  
  const videoRef = useRef(null);

  const fetchRandomQuiz = async () => {
    try {
      setLoading(true);
      const quizData = await quizService.fetchRandomQuiz();
      setQuiz(quizData);
    } catch (error) {
      console.error('퀴즈 로딩 오류:', error);
      setModalMessage('퀴즈를 불러오는데 실패했습니다.');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuiz();
  }, []);

  const handleError = (message) => {
    if (!cameraError) {
      setCameraError(true);
      setModalMessage(message);
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleQuizSubmit = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const imageData = videoRef.current?.captureFrame();
      if (!imageData) throw new Error('비디오 프레임 캡처 실패');

      const result = await quizService.submitQuizAnswer(quiz.id, imageData);

      if (result.correct) {
        setModalMessage('정답입니다!');
        setShowModal(true);
        setTimeout(() => {
          if (quizCount < 4) {
            setQuizCount(prev => prev + 1);
            setShowModal(false);
            fetchRandomQuiz();
          } else {
            setModalMessage('축하합니다! 모든 퀴즈를 완료했습니다.');
            setShowModal(true);
          }
        }, 2000);
      } else {
        setModalMessage('오답입니다! 다시 시도해보세요.');
        setShowModal(true);
      }
    } catch (error) {
      console.error('답안 제출 오류:', error);
      setModalMessage('답안 제출에 실패했습니다.');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-page">
      <h2>퀴즈 화면</h2>
      <div className="quiz-container">
        <div className="quiz-content">
          <QuizControls 
            quiz={quiz}
            onSubmit={handleQuizSubmit}
            loading={loading}
            difficulty={difficulty}
            category={category}
            categories={categories || []}
            onDifficultyChange={setDifficulty}
            onCategoryChange={setCategory}
          />
        </div>
        <div className="video-container">
          <VideoStream 
            ref={videoRef}
            onError={handleError}
          />
        </div>
      </div>
      {showModal && (
        <AlertModal
          message={modalMessage}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default QuizPage;
