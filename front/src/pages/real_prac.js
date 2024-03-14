import React, { useState } from 'react';

import './real.css';

export default function Real() {
  // 선택된 상황과 난이도를 저장하는 state
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  // 상황 선택 시 실행되는 함수
  const handleScenarioClick = (scenario) => {
    setSelectedScenario(scenario);
  };

  // 난이도 선택 시 실행되는 함수
  const handleDifficultyClick = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  // 확인 버튼을 클릭했을 때 실행되는 함수
  const handleConfirm = () => {
    if (selectedScenario !== null && selectedDifficulty !== null) {
      // 선택된 상황과 난이도를 이용하여 적절한 경로를 만듭니다.
      const path = `/scenarios/${selectedScenario}/${selectedDifficulty}`;
      // 만들어진 경로로 이동합니다.
      window.location.href = path;
    } else {
      alert('상황과 난이도를 모두 선택해주세요.');
    }
  };

  return (
    <div className="container">
      <div className="info">
        키오스크 실전 연습
      </div>
      <div className="info-1">
        원하는 상황을 설정해주세요
      </div>

      {/* 상황 선택 */}
      <div className="scenarios">
        <button
          className={`scenario-option ${selectedScenario === 'scenario1' && 'selected'}`}
          onClick={() => handleScenarioClick('scenario1')}
        >
          상황 1
        </button>
        <button
          className={`scenario-option ${selectedScenario === 'scenario2' && 'selected'}`}
          onClick={() => handleScenarioClick('scenario2')}
        >
          상황 2
        </button>
        <button
          className={`scenario-option ${selectedScenario === 'scenario3' && 'selected'}`}
          onClick={() => handleScenarioClick('scenario3')}
        >
          상황 3
        </button>
      </div>

      <div className="info">
        난이도 설정
      </div>

      {/* 난이도 선택 */}
      <div className="difficulties">
        <button
          className={`difficulty-option ${selectedDifficulty === 'easy' && 'selected'}`}
          onClick={() => handleDifficultyClick('easy')}
        >
          쉬움
        </button>
        <button
          className={`difficulty-option ${selectedDifficulty === 'medium' && 'selected'}`}
          onClick={() => handleDifficultyClick('medium')}
        >
          보통
        </button>
        <button
          className={`difficulty-option ${selectedDifficulty === 'hard' && 'selected'}`}
          onClick={() => handleDifficultyClick('hard')}
        >
          어려움
        </button>
      </div>

      {/* 확인 버튼 */}
      <button onClick={handleConfirm}>확인</button>
    </div>
  );
}
