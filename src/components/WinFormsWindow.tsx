'use client';

import React, { useState } from 'react';

interface WinFormsWindowProps {
  title: string;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  onClose?: () => void;
  children: React.ReactNode;
}

export default function WinFormsWindow({
  title,
  width = 800,
  height = 'auto',
  backgroundColor = '#d4d0c8',
  onClose,
  children,
}: WinFormsWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <div
      className="win-bevel-out"
      style={{
        width: isMaximized ? '98vw' : width,
        height: isMaximized ? '94vh' : height,
        maxWidth: isMaximized ? '98vw' : '95vw',
        maxHeight: '90vh',
        backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.45)',
        position: 'relative',
        transition: 'all 0.15s ease',
        overflow: 'hidden',
      }}
    >
      {/* Title Bar */}
      <div className="win-titlebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* WinForms icon */}
          <span style={{ fontSize: '12px' }}>🏎️</span>
          <span style={{ userSelect: 'none' }}>{title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            className="win-titlebar-btn"
            title="Minimize"
            onClick={() => {}}
          >
            _
          </button>
          <button
            className="win-titlebar-btn"
            title={isMaximized ? 'Restore' : 'Maximize'}
            onClick={() => setIsMaximized(!isMaximized)}
          >
            {isMaximized ? '❐' : '□'}
          </button>
          <button
            className="win-titlebar-btn"
            title="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          position: 'relative',
          padding: '16px',
        }}
      >
        {children}
      </div>
    </div>
  );
}
