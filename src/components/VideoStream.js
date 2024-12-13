import React, { useEffect, useRef, useState } from 'react';

function VideoStream({ onError }) {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) return;

    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('카메라 접근 실패:', error);
        setHasError(true);
        onError('카메라에 접근할 수 없습니다. 카메라 권한을 확인해주세요.');
      }
    };

    setupCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [onError, hasError]);

  const captureFrame = () => {
    const canvas = document.createElement('canvas');
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      return canvas.toDataURL('image/jpeg').split(',')[1];
    }
    return null;
  };

  return (
    <div className="video-wrapper">
      <video 
        ref={videoRef}
        autoPlay 
        playsInline 
        muted
        className="video-stream"
      />
      {hasError && <div className="video-placeholder" />}
    </div>
  );
}

export default VideoStream;