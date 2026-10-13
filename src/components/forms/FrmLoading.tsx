'use client';

import React from 'react';
import WinFormsWindow from '@/components/WinFormsWindow';

interface FrmLoadingProps {
  onStartQuiz: () => void;
  onBackToMenu: () => void;
}

export default function FrmLoading({ onStartQuiz, onBackToMenu }: FrmLoadingProps) {
  return (
    <WinFormsWindow title="frmLoading" width={760} height={420} backgroundColor="#99b4d1">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          padding: '24px',
          position: 'relative',
        }}
      >
        {/* Level Tag */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            fontFamily: "'Lucida Bright', Georgia, serif",
            fontSize: '15px',
            fontWeight: 'bold',
            color: '#1a202c',
          }}
        >
          Multiple Choice 1
        </div>

        {/* Instructions */}
        <div style={{ margin: '40px 0' }}>
          <h2
            style={{
              fontSize: '20px',
              fontFamily: "'Segoe UI', Tahoma, sans-serif",
              color: '#000000',
              marginBottom: '14px',
            }}
          >
            Track Safety Quiz Ready
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#1a202c',
              maxWidth: '520px',
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            When you begin the quiz; you will be placed under a 10 second time-limit.
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            className="win-button"
            onClick={onStartQuiz}
            style={{
              padding: '10px 32px',
              fontSize: '15px',
              fontWeight: 'bold',
              backgroundColor: '#e1e1e1',
            }}
          >
            Start Quiz
          </button>
          <button
            className="win-button"
            onClick={onBackToMenu}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
            }}
          >
            Return to Menu
          </button>
        </div>
      </div>
    </WinFormsWindow>
  );
}
