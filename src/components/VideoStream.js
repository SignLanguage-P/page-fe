import React, { useEffect, useRef, useState } from 'react';
import AlertModal from './AlertModal';
import { SignLanguageModel } from '../models/signLanguageModel';

function VideoStream({ onStreamReady, quizAnswer, onResultChange }) {
  const videoRef = useRef(null);
  const modelRef = useRef(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const initializeModel = async () => {
    try {
      modelRef.current = new SignLanguageModel();
      await modelRef.current.load();
    } catch (err) {
      console.error('모델 초기화 오류:', err);
      setError('모델 로드에 실패했습니다.');
    }
  };

  const analyzeFrame = async (video) => {
    if (error || isCorrectAnswer || isAnalyzing || !modelRef.current) return;

    try {
      setIsAnalyzing(true);
      
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const result = await modelRef.current.predict(canvas);
      
      if (result && result.probability > 0.7) {
        const isCorrect = result.label.toLowerCase() === quizAnswer.toLowerCase();
        
        if (isCorrect) {
          setIsCorrectAnswer(true);
          setShowModal(true);
          setModalMessage('정답입니다!');
          if (onResultChange) {
            onResultChange(true);
          }
        } else {
          setShowModal(true);
          setModalMessage('오답입니다. 다시 시도해보세요.');
          setTimeout(() => {
            setShowModal(false);
          }, 2000);
        }
      }
    } catch (err) {
      console.error('분석 오류:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    let analysisInterval;

    const setupCamera = async () => {
      try {
        await initializeModel();
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          },
          audio: false
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play()
              .then(() => {
                console.log('비디오 재생 시작');
                if (onStreamReady) {
                  onStreamReady(videoRef.current);
                }
                analysisInterval = setInterval(() => {
                  analyzeFrame(videoRef.current);
                }, 1000);
              })
              .catch(err => {
                console.error('비디오 재생 실패:', err);
                setError('비디오 재생에 실패했습니다.');
              });
          };
        }
      } catch (err) {
        console.error('카메라 초기화 오류:', err);
        setError('카메라 접근에 실패했습니다.');
        if (analysisInterval) {
          clearInterval(analysisInterval);
        }
      }
    };

    setupCamera();

    return () => {
      if (analysisInterval) {
        clearInterval(analysisInterval);
      }
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [onStreamReady]);

  const handleModalClose = () => {
    setShowModal(false);
    if (!isCorrectAnswer) {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="video-stream-container">
      <video
        ref={videoRef}
        className="video-stream"
        playsInline
        autoPlay
        muted
      />
      {error ? (
        <div className="video-error-message">
          {error}
          <button onClick={() => window.location.reload()}>
            다시 시도
          </button>
        </div>
      ) : (
        <AlertModal 
          isOpen={showModal}
          onClose={handleModalClose}
          type={modalMessage.includes('정답') ? 'success' : 'error'}
          message={modalMessage}
        />
      )}
    </div>
  );
}

export default VideoStream;