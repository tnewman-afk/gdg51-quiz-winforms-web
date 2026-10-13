'use client';

import React from 'react';
import { User } from '@/lib/types';
import WinFormsWindow from '@/components/WinFormsWindow';

interface FrmMenuProps {
  currentUser: User | null;
  onStartQuiz: () => void;
  onOpenLeaderboard: () => void;
  onOpenRandomisedQuiz: () => void;
  onLogOut: () => void;
}

export default function FrmMenu({
  currentUser,
  onStartQuiz,
  onOpenLeaderboard,
  onOpenRandomisedQuiz,
  onLogOut,
}: FrmMenuProps) {
  const firstName = currentUser?.firstName || 'Guest';

  return (
    <WinFormsWindow title="frmMenu" width={600} height={480} backgroundColor="#7fffd4">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          padding: '20px',
        }}
      >
        {/* Top Header Row with Welcome and Log Out */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '36px',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            paddingBottom: '12px',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Microsoft Sans Serif', sans-serif",
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#000000',
              }}
            >
              Welcome {firstName}!
            </h2>
            <span style={{ fontSize: '12px', color: '#333333' }}>
              Logged in as: {currentUser?.username} ({currentUser?.userType || 'Staff'}) | Current Score: {currentUser?.totalScore ?? 0}
            </span>
          </div>

          <button
            className="win-button"
            onClick={onLogOut}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            Log Out
          </button>
        </div>

        {/* Menu Buttons Area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            maxWidth: '300px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Start Quiz Button */}
          <button
            className="win-button"
            onClick={onStartQuiz}
            style={{
              backgroundColor: '#1e90ff', // DodgerBlue
              color: '#006400', // DarkGreen
              fontWeight: 'bold',
              fontSize: '16px',
              height: '46px',
              width: '100%',
            }}
          >
            🏁 Start Track Safety Quiz
          </button>

          {/* Leaderboard Button */}
          <button
            className="win-button"
            onClick={onOpenLeaderboard}
            style={{
              fontWeight: 'bold',
              fontSize: '15px',
              height: '44px',
              width: '100%',
            }}
          >
            🏆 Leaderboard
          </button>

          {/* Randomised Computing Quiz Button */}
          <button
            className="win-button"
            onClick={onOpenRandomisedQuiz}
            style={{
              fontWeight: 'bold',
              fontSize: '15px',
              height: '44px',
              width: '100%',
              backgroundColor: '#f5f5f5',
            }}
          >
            💻 Computing Knowledge Quiz
          </button>
        </div>

        {/* Bottom Info */}
        <div
          style={{
            marginTop: 'auto',
            textAlign: 'center',
            fontSize: '11px',
            color: '#444444',
            paddingTop: '20px',
          }}
        >
          GDG51 Motorsport & Computing Training Platform
        </div>
      </div>
    </WinFormsWindow>
  );
}
