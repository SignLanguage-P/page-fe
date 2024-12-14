
import React, { useEffect, useState, forwardRef } from 'react';
import AlertModal from './AlertModal';

const VideoStream = forwardRef(({ onStreamReady, quizAnswer, onResultChange }, ref) => {
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    let mounted = true;

    const setupCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          },
          audio: false
        });
        
        if (!mounted) return;
        
        setStream(mediaStream);
        
        if (ref?.current) {
          ref.current.srcObject = mediaStream;
          ref.current.onloadedmetadata = () => {
            if (!mounted) return;
            
            ref.current.play()
              .then(() => {
                if (!mounted) return;
                console.log('비디오 재생 시작');
                onStreamReady?.(ref.current);
              })
              .catch(err => {
                if (!mounted) return;
                console.error('비디오 재생 실패:', err);
                setError('비디오 재생에 실패했습니다. 카메라 권한을 확인해주세요.');
                onStreamReady?.(null);
              });
          };
        }
      } catch (err) {
        if (!mounted) return;
        console.error('카메라 초기화 오류:', err);
        setError('카메라 접근에 실패했습니다. 카메라 권한을 확인해주세요.');
        onStreamReady?.(null);
      }
    };

    setupCamera();

    return () => {
      mounted = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onStreamReady, ref]);

  return (
    <div className="video-stream-container">
      <div className="video-wrapper">
        <video
          ref={ref}
          className="video-stream"
          playsInline
          autoPlay
          muted
          style={{
            width: '100%',
            maxWidth: '640px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#000000'
          }}
        />
        {error && (
          <div className="camera-error-overlay">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
});

VideoStream.displayName = 'VideoStream';

export default VideoStream;