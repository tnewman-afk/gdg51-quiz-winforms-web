'use client';

import React, { useState } from 'react';
import { User } from '@/lib/types';
import WinFormsWindow from '@/components/WinFormsWindow';

interface FrmRegisterUserProps {
  users: User[];
  onRegisterUser: (newUser: User) => void;
  onGoToLogin: () => void;
  showMessageBox: (message: string, title?: string, onClose?: () => void) => void;
}

export default function FrmRegisterUser({
  users,
  onRegisterUser,
  onGoToLogin,
  showMessageBox,
}: FrmRegisterUserProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('Customer');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('2000-01-01');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Read input and trim spaces
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();
    const trimmedType = accountType.trim();
    const trimmedGender = gender.trim();

    // 2. Basic validation
    if (
      !trimmedUser ||
      !trimmedPass ||
      !trimmedFirst ||
      !trimmedLast ||
      !trimmedType ||
      !trimmedGender
    ) {
      showMessageBox('All fields are required.', 'Registration');
      return;
    }

    // 3. Check for unique username
    const exists = users.some(
      (u) => u.username.toLowerCase() === trimmedUser.toLowerCase()
    );

    if (exists) {
      showMessageBox('Username already exists. Please choose another.', 'Registration');
      return;
    }

    // 4. Create new User object with TotalScore = 0
    const newUser: User = {
      username: trimmedUser,
      password: trimmedPass,
      firstName: trimmedFirst,
      lastName: trimmedLast,
      totalScore: 0,
      userType: trimmedType,
      gender: trimmedGender,
      dob: dob,
    };

    // 5. Append user to state (silently continues without disk file error per instruction)
    onRegisterUser(newUser);

    showMessageBox('Registration successful!', 'Registration', () => {
      onGoToLogin();
    });
  };

  return (
    <WinFormsWindow title="frmRegisterUser" width={800} height={520} backgroundColor="#afeeee">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        <h1
          style={{
            fontFamily: "'Nirmala UI', sans-serif",
            fontSize: '32px',
            color: '#000000',
            marginBottom: '4px',
          }}
        >
          Register
        </h1>
        <p style={{ fontSize: '13px', color: '#444444', marginBottom: '24px' }}>
          Please enter your details
        </p>

        <form
          onSubmit={handleRegister}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '560px',
            maxWidth: '100%',
          }}
        >
          {/* Row 1: First Name & Last Name */}
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
                First Name
              </label>
              <input
                type="text"
                className="win-input"
                style={{ width: '100%', height: '26px' }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
                Last Name
              </label>
              <input
                type="text"
                className="win-input"
                style={{ width: '100%', height: '26px' }}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Row 2: Username & Password */}
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
                Username
              </label>
              <input
                type="text"
                className="win-input"
                style={{ width: '100%', height: '26px' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
                Password
              </label>
              <input
                type="password"
                className="win-input"
                style={{ width: '100%', height: '26px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Row 3: Account Type, Gender, DOB */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
                Account type:
              </label>
              <select
                className="win-input"
                style={{ width: '100%', height: '26px' }}
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="Customer">Customer</option>
                <option value="Staff">Staff</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
                Gender:
              </label>
              <select
                className="win-input"
                style={{ width: '100%', height: '26px' }}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div style={{ flex: 1.2 }}>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
                Date of Birth:
              </label>
              <input
                type="date"
                className="win-input"
                style={{ width: '100%', height: '26px' }}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
          </div>

          {/* Register Button */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '20px' }}>
            <button
              type="submit"
              className="win-button"
              style={{
                backgroundColor: '#708090', // SlateGray
                color: '#ffffff',
                fontWeight: 'bold',
                padding: '8px 30px',
                fontSize: '14px',
              }}
            >
              Register
            </button>
            <button
              type="button"
              className="win-button"
              onClick={onGoToLogin}
              style={{
                padding: '8px 20px',
                fontSize: '14px',
              }}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </WinFormsWindow>
  );
}
