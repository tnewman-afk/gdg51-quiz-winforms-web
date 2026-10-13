'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { User } from '@/lib/types';
import WinFormsWindow from '@/components/WinFormsWindow';

interface FrmLoginProps {
  users: User[];
  onLoginSuccess: (user: User) => void;
  onGoToRegister: () => void;
  showMessageBox: (message: string, title?: string, onClose?: () => void) => void;
}

export default function FrmLogin({
  users,
  onLoginSuccess,
  onGoToRegister,
  showMessageBox,
}: FrmLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedUser = username.trim().toLowerCase();
    const trimmedPass = password.trim().toLowerCase();

    const matchedUser = users.find(
      (u) =>
        u.username.trim().toLowerCase() === trimmedUser &&
        u.password.trim().toLowerCase() === trimmedPass
    );

    if (matchedUser) {
      showMessageBox('Login successful!', 'Login', () => {
        onLoginSuccess(matchedUser);
      });
    } else {
      showMessageBox('Invalid username or password.', 'Login');
    }
  };

  return (
    <WinFormsWindow title="Login" width={800} height={520} backgroundColor="#7fffd4">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          position: 'relative',
          padding: '20px',
        }}
      >
        {/* Car Logo in Top Right */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '25px',
            width: '210px',
            height: '100px',
            overflow: 'hidden',
          }}
        >
          <img
            src="/images/car.png"
            alt="Track Car"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/car2.png';
            }}
          />
        </div>

        {/* Staff Login Heading */}
        <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '20px' }}>
          <h1
            style={{
              fontFamily: "'Lucida Bright', Georgia, serif",
              fontSize: '22px',
              fontWeight: 'normal',
              color: '#000000',
              marginBottom: '6px',
            }}
          >
            Staff Login
          </h1>
          <p style={{ fontSize: '13px', color: '#333333' }}>
            Enter your credentials to access the quiz portal
          </p>
        </div>

        {/* Form Controls */}
        <form
          onSubmit={handleLogin}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '380px',
          }}
        >
          {/* Username */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label
              style={{
                fontFamily: "'Lucida Bright', Georgia, serif",
                fontSize: '15px',
                color: '#000000',
                width: '110px',
              }}
            >
              Username:
            </label>
            <input
              type="text"
              className="win-input"
              style={{ width: '220px', height: '28px', fontSize: '14px' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>

          {/* Password */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label
              style={{
                fontFamily: "'Lucida Bright', Georgia, serif",
                fontSize: '15px',
                color: '#000000',
                width: '110px',
              }}
            >
              Password:
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="win-input"
              style={{ width: '220px', height: '28px', fontSize: '14px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Show Password Checkbox */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '6px' }}>
            <input
              id="show-pass-chk"
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <label
              htmlFor="show-pass-chk"
              style={{
                fontFamily: "'Lucida Bright', Georgia, serif",
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Show Password
            </label>
          </div>

          {/* Login Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <button
              type="submit"
              className="win-button"
              style={{
                backgroundColor: '#98fb98', // PaleGreen
                fontFamily: "'Lucida Fax', Georgia, serif",
                fontSize: '15px',
                width: '150px',
                height: '42px',
                fontWeight: 'bold',
              }}
            >
              Login
            </button>
          </div>
        </form>

        {/* Bottom Sign Up Button */}
        <div style={{ position: 'absolute', bottom: '20px', right: '30px' }}>
          <button
            type="button"
            className="win-button"
            onClick={onGoToRegister}
            style={{
              padding: '6px 18px',
              fontSize: '13px',
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </WinFormsWindow>
  );
}
