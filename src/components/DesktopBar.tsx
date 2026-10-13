'use client';

import React, { useState, useEffect } from 'react';

interface DesktopBarProps {
  activeFormTitle: string;
  onRelock: () => void;
  onOpenMenu: () => void;
  onOpenForm: (formId: string) => void;
}

export default function DesktopBar({
  activeFormTitle,
  onRelock,
  onOpenMenu,
  onOpenForm,
}: DesktopBarProps) {
  const [time, setTime] = useState('');
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '32px',
        backgroundColor: '#d4d0c8',
        borderTop: '2px solid #ffffff',
        display: 'flex',
        alignItems: 'center',
        padding: '2px 4px',
        zIndex: 50000,
        boxShadow: '0 -1px 3px rgba(0,0,0,0.2)',
      }}
    >
      {/* Start Button */}
      <button
        className="win-button"
        style={{
          fontWeight: 'bold',
          padding: '2px 10px',
          height: '26px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: startMenuOpen ? '#c0c0c0' : '#e1e1e1',
        }}
        onClick={() => setStartMenuOpen(!startMenuOpen)}
      >
        <span style={{ fontSize: '14px' }}>🏁</span>
        <span>Start</span>
      </button>

      {/* Start Menu Dropdown */}
      {startMenuOpen && (
        <div
          className="win-bevel-out"
          style={{
            position: 'absolute',
            bottom: '33px',
            left: '4px',
            width: '240px',
            backgroundColor: '#d4d0c8',
            boxShadow: '4px 4px 10px rgba(0,0,0,0.4)',
            zIndex: 60000,
          }}
          onClick={() => setStartMenuOpen(false)}
        >
          <div
            style={{
              background: 'linear-gradient(180deg, #0a246a 0%, #1e40af 100%)',
              color: '#ffffff',
              padding: '8px 12px',
              fontWeight: 'bold',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>🏎️</span>
            <span>GDG51-71605-4117</span>
          </div>

          <div style={{ padding: '6px 0' }}>
            <div
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              className="hover:bg-blue-800 hover:text-white"
              onClick={() => onOpenForm('login')}
            >
              <span>🔑</span>
              <span>Staff Login</span>
            </div>

            <div
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              className="hover:bg-blue-800 hover:text-white"
              onClick={() => onOpenForm('register')}
            >
              <span>📝</span>
              <span>Register User</span>
            </div>

            <div
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              className="hover:bg-blue-800 hover:text-white"
              onClick={() => onOpenForm('menu')}
            >
              <span>📋</span>
              <span>Main Menu</span>
            </div>

            <div
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              className="hover:bg-blue-800 hover:text-white"
              onClick={() => onOpenForm('quiz')}
            >
              <span>🏎️</span>
              <span>Track Safety Quiz</span>
            </div>

            <div
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              className="hover:bg-blue-800 hover:text-white"
              onClick={() => onOpenForm('randomised')}
            >
              <span>💻</span>
              <span>Computing Quiz</span>
            </div>

            <div
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              className="hover:bg-blue-800 hover:text-white"
              onClick={() => onOpenForm('leaderboard')}
            >
              <span>🏆</span>
              <span>Leaderboard</span>
            </div>

            <div style={{ height: '1px', backgroundColor: '#808080', margin: '4px 0' }} />

            <div
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                cursor: 'pointer',
                color: '#b91c1c',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 'bold',
              }}
              onClick={onRelock}
            >
              <span>🔒</span>
              <span>Lock System (Relock)</span>
            </div>
          </div>
        </div>
      )}

      {/* Divider */}
      <div
        style={{
          width: '2px',
          height: '22px',
          backgroundColor: '#808080',
          margin: '0 6px',
          borderRight: '1px solid #ffffff',
        }}
      />

      {/* Taskbar Active Window Tab */}
      <div
        className="win-bevel-in"
        style={{
          padding: '2px 10px',
          height: '26px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          fontWeight: 'bold',
          maxWidth: '220px',
          backgroundColor: '#ffffff',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        <span>📄</span>
        <span>{activeFormTitle}</span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Quick Relock Button */}
      <button
        className="win-button"
        style={{
          fontSize: '11px',
          padding: '2px 8px',
          height: '24px',
          marginRight: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
        onClick={onRelock}
        title="Lock system with environment password"
      >
        <span>🔒</span>
        <span>Lock</span>
      </button>

      {/* Clock Tray */}
      <div
        className="win-bevel-in"
        style={{
          height: '24px',
          padding: '2px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          backgroundColor: '#d4d0c8',
        }}
      >
        <span>🔊</span>
        <span>{time || '12:00 PM'}</span>
      </div>
    </div>
  );
}
