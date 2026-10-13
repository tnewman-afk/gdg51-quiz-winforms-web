'use client';

import React, { useState } from 'react';
import WinFormsWindow from '@/components/WinFormsWindow';

interface FrmQuiz3Props {
  totalPoints: number;
  onUpdateScore: (newScore: number) => void;
  onContinue: () => void;
  showMessageBox: (message: string, title?: string, onClose?: () => void) => void;
}

export default function FrmQuiz3({
  totalPoints,
  onUpdateScore,
  onContinue,
  showMessageBox,
}: FrmQuiz3Props) {
  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');

  const handleContinue = () => {
    if (ans1.trim().toLowerCase() === 'bill gates') {
      const newScore = totalPoints + 1;
      onUpdateScore(newScore);
      showMessageBox(
        `Correct manager verified! Point added. Current Score: ${newScore}`,
        'Staff Assessment',
        () => {
          onContinue();
        }
      );
    } else {
      showMessageBox(
        'Assessment submitted.',
        'Staff Assessment',
        () => {
          onContinue();
        }
      );
    }
  };

  return (
    <WinFormsWindow title="frmQuiz3" width={820} height={490} backgroundColor="#f0f0f0">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '24px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2
            style={{
              fontFamily: "'Lucida Bright', Georgia, serif",
              fontSize: '18px',
              color: '#000000',
            }}
          >
            Staff Safety Assessment
          </h2>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#000000' }}>
            Score: {totalPoints}
          </div>
        </div>

        {/* Question 1 */}
        <div style={{ marginBottom: '24px', maxWidth: '640px', margin: '0 auto 24px auto', width: '100%' }}>
          <label
            style={{
              display: 'block',
              fontFamily: "'Lucida Bright', Georgia, serif",
              fontSize: '15px',
              color: '#000000',
              marginBottom: '8px',
            }}
          >
            Who is the on-site manager on Mondays?
          </label>
          <input
            type="text"
            className="win-input"
            style={{ width: '100%', height: '30px', fontSize: '14px' }}
            value={ans1}
            onChange={(e) => setAns1(e.target.value)}
            placeholder="Type name here..."
          />
        </div>

        {/* Question 2 */}
        <div style={{ marginBottom: '32px', maxWidth: '640px', margin: '0 auto 32px auto', width: '100%' }}>
          <label
            style={{
              display: 'block',
              fontFamily: "'Lucida Bright', Georgia, serif",
              fontSize: '15px',
              color: '#000000',
              marginBottom: '8px',
            }}
          >
            How many staff have security access?
          </label>
          <input
            type="text"
            className="win-input"
            style={{ width: '100%', height: '30px', fontSize: '14px' }}
            value={ans2}
            onChange={(e) => setAns2(e.target.value)}
            placeholder="Type count here..."
          />
        </div>

        {/* Continue Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
          <button
            type="button"
            className="win-button"
            onClick={handleContinue}
            style={{
              padding: '10px 40px',
              fontSize: '15px',
              fontWeight: 'bold',
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </WinFormsWindow>
  );
}
