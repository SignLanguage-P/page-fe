import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../css/Study.css';

function Study() {
  const [selectedWord, setSelectedWord] = useState('default-video-url');

  const handleWordSelect = (word) => {
    // 단어에 따라 YouTube 동영상 URL을 설정
    const videoMap = {
      '안녕': 'https://www.youtube.com/embed/RTBvWTdJSZs?si=o5SOX55vYr_PfzXk',
      '긍정': 'http://sldict.korean.go.kr/multimedia/multimedia_files',
      '부정': 'https://www.youtube.com/embed/yet-another-video-id',
      '박물관': 'https://www.youtube.com/embed/museum-video-id',
      '미술관': 'https://www.youtube.com/embed/art-gallery-video-id',
      '지하철': 'https://www.youtube.com/embed/subway-video-id',
    };
    setSelectedWord(videoMap[word] || 'default-video-url');
  };

  return (
    <div className="study-page">
      <div className="study-content">
        <h2>학습 화면</h2>
        {selectedWord.startsWith('https://www.youtube.com') ? (
          <iframe
            width="560"
            height="315"
            src={selectedWord}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video src={selectedWord} controls />
        )}
        <div className="navigation-buttons">
          <button>이전</button>
          <button>다음</button>
        </div>
      </div>
      <Sidebar onWordSelect={handleWordSelect} />
    </div>
  );
}

export default Study;
