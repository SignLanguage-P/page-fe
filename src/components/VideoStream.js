import React, { useEffect, useRef } from 'react';

function VideoStream({ onStreamReady }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const getVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current && !videoRef.current.srcObject) {
          videoRef.current.srcObject = stream;
        }
        onStreamReady(stream);
      } catch (error) {
        console.error('카메라 접근 실패:', error);
      }
    };

    getVideoStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [onStreamReady]);

  return <video autoPlay playsInline ref={videoRef} />;
}

export default VideoStream;