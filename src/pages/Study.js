import React from 'react';

function Study() {
  return (
    <div>
      <h2>학습 화면</h2>
      <video src="video-url.mp4" controls />
      {/* 이전, 다음 버튼 */}
      <button>이전</button>
      <button>다음</button>
    </div>
  );
}

export default Study;
