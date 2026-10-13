'use client';

import React, { useEffect } from 'react';

export interface MessageBoxState {
  isOpen: boolean;
  message: string;
  title?: string;
  onClose?: () => void;
}

interface MessageBoxModalProps {
  box: MessageBoxState;
  onClose: () => void;
}

export default function MessageBoxModal({ box, onClose }: MessageBoxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (box.isOpen && (e.key === 'Enter' || e.key === 'Escape')) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [box.isOpen, onClose]);

  if (!box.isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
      }}
      onClick={onClose}
    >
      <div
        className="win-bevel-out"
        style={{
          width: '380px',
          maxWidth: '90vw',
          backgroundColor: '#d4d0c8',
          boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="win-titlebar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px' }}>ℹ️</span>
            <span>{box.title || 'Message'}</span>
          </div>
          <button className="win-titlebar-btn" onClick={onClose} title="Close">
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#0055ea',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '22px',
              flexShrink: 0,
              boxShadow: '1px 1px 3px rgba(0,0,0,0.3)',
            }}
          >
            i
          </div>
          <div
            style={{
              fontSize: '13px',
              color: '#000000',
              lineHeight: 1.4,
              wordBreak: 'break-word',
              userSelect: 'text',
              fontFamily: "'Segoe UI', Tahoma, sans-serif",
            }}
          >
            {box.message}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '10px 16px',
            backgroundColor: '#c0c0c0',
            borderTop: '1px solid #808080',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            className="win-button"
            onClick={onClose}
            autoFocus
            style={{ minWidth: '75px', fontWeight: 'bold' }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
