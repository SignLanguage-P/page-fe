import React, { useEffect } from 'react';
import '../css/AlertModal.css';

function AlertModal({ message, onClose, type = 'success', showRetryButton, showHomeButton }) {
  return (
    <div className="modal-overlay">
      <div className={`modal-content ${type}`}>
        <p>{message}</p>
        <div className="modal-buttons">
          {showRetryButton ? (
            <>
              <button onClick={onClose}>다시 학습하기</button>
              <button onClick={() => window.location.reload()}>다시 시도하기</button>
            </>
          ) : showHomeButton ? (
            <>
              <button onClick={() => window.location.href = '/'}>메인으로 돌아가기</button>
              {type === 'error' && (
                <button onClick={onClose}>다시 시도하기</button>
              )}
            </>
          ) : (
            <button onClick={onClose}>확인</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AlertModal; 