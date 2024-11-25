import React from 'react';
import { Link } from 'react-router-dom';

function MyPage() {
  return (
    <div>
      <h2>마이페이지</h2>
      <Link to="/userprofile">기본정보</Link>
      <Link to="/wrongnote">오답노트</Link>
      {/* 학습 현황 표시 */}
    </div>
  );
}

export default MyPage;
