'use client';

import React, { useState } from 'react';

interface LockoutScreenProps {
  onUnlocked: () => void;
}

export default function LockoutScreen({ onUnlocked }: LockoutScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Password is required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onUnlocked();
      } else {
        setError(data.error || 'Access denied: Invalid password.');
      }
    } catch {
      setError('Network or server error verifying credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#1e293b',
        backgroundImage: 'radial-gradient(ellipse at center, #1e293b 0%, #0f172a 100%)',
        padding: '20px',
      }}
    >
      <div
        className="win-bevel-out"
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#d4d0c8',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Title Bar */}
        <div className="win-titlebar" style={{ background: 'linear-gradient(90deg, #800000 0%, #cc0000 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px' }}>🔒</span>
            <span>Security Gatekeeper - System Locked</span>
          </div>
          <div className="win-titlebar-btn" title="Locked" style={{ cursor: 'not-allowed' }}>
            ✕
          </div>
        </div>

        {/* Content Area */}
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                backgroundColor: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: '#fff',
                flexShrink: 0,
              }}
            >
              🛡️
            </div>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
                Protected Environment Access
              </h2>
              <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.4 }}>
                This application is locked. Enter the secure access password configured in the server environment (<code>LOCKEDOUT</code>) to continue.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label
                htmlFor="lockout-password"
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginBottom: '6px',
                  color: '#1f2937',
                }}
              >
                Access Password:
              </label>
              <input
                id="lockout-password"
                type="password"
                className="win-input"
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  fontSize: '15px',
                  letterSpacing: '2px',
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                autoFocus
                disabled={loading}
              />
            </div>

            {error && (
              <div
                style={{
                  backgroundColor: '#fee2e2',
                  border: '1px solid #ef4444',
                  color: '#991b1b',
                  fontSize: '12px',
                  padding: '8px 10px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                type="submit"
                className="win-button"
                disabled={loading}
                style={{
                  padding: '7px 24px',
                  fontWeight: 'bold',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  borderColor: '#3b82f6 #1d4ed8 #1d4ed8 #3b82f6',
                }}
              >
                {loading ? 'Verifying...' : 'Unlock Application'}
              </button>
            </div>
          </form>

          <div
            style={{
              marginTop: '20px',
              paddingTop: '12px',
              borderTop: '1px solid #9ca3af',
              fontSize: '11px',
              color: '#6b7280',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>Environment Variable: <strong>LOCKEDOUT</strong></span>
            <span>Security: SHA-256 + Timing Safe</span>
          </div>
        </div>
      </div>
    </div>
  );
}
