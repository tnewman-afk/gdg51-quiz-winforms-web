'use client';

import React, { useState } from 'react';
import WinFormsWindow from '@/components/WinFormsWindow';

interface FrmQuiz2Props {
  totalPoints: number;
  onUpdateScore: (newScore: number) => void;
  onContinue: () => void;
  showMessageBox: (message: string, title?: string, onClose?: () => void) => void;
}

export default function FrmQuiz2({
  totalPoints,
  onUpdateScore,
  onContinue,
  showMessageBox,
}: FrmQuiz2Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAnswer) {
      showMessageBox('Please select an option before submitting.', 'Multiple Choice');
      return;
    }

    setSubmitted(true);

    if (selectedAnswer === 'First lap complete') {
      const newScore = totalPoints + 1;
      onUpdateScore(newScore);
      showMessageBox(
        `Answer is correct. 1 point has been added You now have ${newScore}`,
        'Quiz 2'
      );
    } else {
      const newScore = totalPoints - 1;
      onUpdateScore(newScore);
      showMessageBox(
        `Answer is incorrect. 1 point has been deducted You now have ${newScore}`,
        'Quiz 2'
      );
    }
  };

  return (
    <WinFormsWindow title="Multiple Choice 1" width={800} height={480} backgroundColor="#e9967a">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          padding: '24px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2
            style={{
              fontFamily: "'Lucida Bright', Georgia, serif",
              fontSize: '18px',
              color: '#000000',
            }}
          >
            Multiple Choice 1
          </h2>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#000000' }}>
            Score: {totalPoints}
          </div>
        </div>

        {/* Question */}
        <div style={{ marginBottom: '28px' }}>
          <h3
            style={{
              fontFamily: "'Lucida Bright', Georgia, serif",
              fontSize: '17px',
              color: '#000000',
              textAlign: 'center',
            }}
          >
            When a white-flag is waved, what does this mean?
          </h3>
        </div>

        {/* Radio Options Grid */}
        <form onSubmit={handleSubmit} style={{ maxWidth: '520px', margin: '0 auto', width: '100%' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '30px',
            }}
          >
            {[
              'Race is over',
              'First lap complete',
              'Race has begun',
              'Half-time',
            ].map((option) => (
              <label
                key={option}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '16px',
                  fontFamily: "'Microsoft Sans Serif', sans-serif",
                  cursor: submitted ? 'default' : 'pointer',
                }}
              >
                <input
                  type="radio"
                  name="quiz2Option"
                  value={option}
                  disabled={submitted}
                  checked={selectedAnswer === option}
                  onChange={() => setSelectedAnswer(option)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          {/* Submit and Continue Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            {!submitted ? (
              <button
                type="submit"
                className="win-button"
                style={{
                  padding: '8px 30px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                className="win-button"
                onClick={onContinue}
                style={{
                  padding: '8px 36px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  backgroundColor: '#ffffff',
                }}
              >
                Continue
              </button>
            )}
          </div>
        </form>
      </div>
    </WinFormsWindow>
  );
}
