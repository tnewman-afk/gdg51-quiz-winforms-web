'use client';

import React, { useState, useEffect, useRef } from 'react';
import WinFormsWindow from '@/components/WinFormsWindow';

interface FrmQuizProps {
  totalPoints: number;
  onUpdateScore: (newScore: number) => void;
  onContinue: () => void;
  showMessageBox: (message: string, title?: string, onClose?: () => void) => void;
}

export default function FrmQuiz({
  totalPoints,
  onUpdateScore,
  onContinue,
  showMessageBox,
}: FrmQuizProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(10);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleAnswer = (answer: string, isCorrect: boolean) => {
    if (buttonsDisabled) return;

    if (timerRef.current) clearInterval(timerRef.current);
    setButtonsDisabled(true);
    setShowContinue(true);

    let newScore = totalPoints;
    if (isCorrect) {
      newScore = totalPoints + 1;
      onUpdateScore(newScore);
      showMessageBox(
        `The answer is correct 1 point has been added. You now have ${newScore}`,
        'Quiz'
      );
    } else {
      newScore = totalPoints - 1;
      onUpdateScore(newScore);
      showMessageBox(
        `The answer is incorrect 1 point has been deducted. You now have ${newScore}`,
        'Quiz'
      );
    }
  };

  return (
    <WinFormsWindow title="Quiz" width={900} height={580} backgroundColor="#e9967a">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          padding: '24px',
          fontFamily: "'Microsoft Sans Serif', sans-serif",
        }}
      >
        {/* Top Bar with Level, Score, Timer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h2
              style={{
                fontFamily: "'Lucida Bright', Georgia, serif",
                fontSize: '18px',
                color: '#000',
              }}
            >
              Staff track safety Quiz
            </h2>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', marginBottom: '4px' }}>
              Score: {totalPoints}
            </div>
            <div
              style={{
                fontSize: '14px',
                color: remainingSeconds === 0 ? '#b91c1c' : '#000',
                fontWeight: remainingSeconds <= 3 ? 'bold' : 'normal',
              }}
            >
              {remainingSeconds > 0
                ? `Time Remaining: ${remainingSeconds} Seconds`
                : 'Game Over'}
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div style={{ textAlign: 'center', margin: '30px 0 20px 0' }}>
          <h3
            style={{
              fontFamily: "'Lucida Bright', Georgia, serif",
              fontSize: '18px',
              color: '#000000',
              lineHeight: 1.4,
            }}
          >
            How many vechiles are permitted on the track at one given time?
          </h3>
        </div>

        {/* 6 Answer Buttons Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            maxWidth: '560px',
            margin: '20px auto',
            width: '100%',
          }}
        >
          {/* Row 1 */}
          <button
            className="win-button"
            style={{ height: '42px', fontSize: '15px' }}
            disabled={buttonsDisabled}
            onClick={() => handleAnswer('4', false)}
          >
            4
          </button>
          <button
            className="win-button"
            style={{ height: '42px', fontSize: '15px', fontWeight: 'bold' }}
            disabled={buttonsDisabled}
            onClick={() => handleAnswer('8', true)}
          >
            8
          </button>
          <button
            className="win-button"
            style={{ height: '42px', fontSize: '15px' }}
            disabled={buttonsDisabled}
            onClick={() => handleAnswer('100', false)}
          >
            100
          </button>

          {/* Row 2 */}
          <button
            className="win-button"
            style={{ height: '42px', fontSize: '15px' }}
            disabled={buttonsDisabled}
            onClick={() => handleAnswer('16', false)}
          >
            16
          </button>
          <button
            className="win-button"
            style={{ height: '42px', fontSize: '15px' }}
            disabled={buttonsDisabled}
            onClick={() => handleAnswer('30', false)}
          >
            30
          </button>
          <button
            className="win-button"
            style={{ height: '42px', fontSize: '15px' }}
            disabled={buttonsDisabled}
            onClick={() => handleAnswer('32', false)}
          >
            32
          </button>
        </div>

        {/* Continue Button */}
        {showContinue && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            <button
              className="win-button"
              onClick={onContinue}
              style={{
                padding: '12px 40px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#ffffff',
              }}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </WinFormsWindow>
  );
}
