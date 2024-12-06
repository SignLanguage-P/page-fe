import React, { useState } from 'react';
import '../css/Sidebar.css';

function Sidebar({ onWordSelect }) {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div className="sidebar">
      <h3>카테고리</h3>
      <div className="category">
        <div className="category-header" onClick={() => toggleCategory('daily')}>
          일상단어
        </div>
        {openCategory === 'daily' && (
          <div className="category-items">
            <a href="#hello" onClick={() => onWordSelect('안녕')}>안녕</a>
            <a href="#positive" onClick={() => onWordSelect('긍정')}>긍정</a>
            <a href="#negative" onClick={() => onWordSelect('부정')}>부정</a>
          </div>
        )}
      </div>
      <div className="category">
        <div className="category-header" onClick={() => toggleCategory('places')}>
          장소단어
        </div>
        {openCategory === 'places' && (
          <div className="category-items">
            <a href="#museum" onClick={() => onWordSelect('박물관')}>박물관</a>
            <a href="#art-gallery" onClick={() => onWordSelect('미술관')}>미술관</a>
            <a href="#subway" onClick={() => onWordSelect('지하철')}>지하철</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
