'use client';

import React, { useState, useEffect } from 'react';
import { User, INITIAL_USERS } from '@/lib/types';
import LockoutScreen from '@/components/LockoutScreen';
import DesktopBar from '@/components/DesktopBar';
import MessageBoxModal, { MessageBoxState } from '@/components/MessageBoxModal';

// Form Components
import FrmLogin from '@/components/forms/FrmLogin';
import FrmRegisterUser from '@/components/forms/FrmRegisterUser';
import FrmMenu from '@/components/forms/FrmMenu';
import FrmLoading from '@/components/forms/FrmLoading';
import FrmQuiz from '@/components/forms/FrmQuiz';
import FrmQuiz2 from '@/components/forms/FrmQuiz2';
import FrmQuiz3 from '@/components/forms/FrmQuiz3';
import FrmRandomised from '@/components/forms/FrmRandomised';
import FrmLeaderboard from '@/components/forms/FrmLeaderboard';

type FormType =
  | 'login'
  | 'register'
  | 'menu'
  | 'loading'
  | 'quiz'
  | 'quiz2'
  | 'quiz3'
  | 'randomised'
  | 'leaderboard';

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null);
  const [activeForm, setActiveForm] = useState<FormType>('login');
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);

  // WinForms MessageBox state
  const [messageBox, setMessageBox] = useState<MessageBoxState>({
    isOpen: false,
    message: '',
    title: 'Message',
  });

  // Verify server session on initial load
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        setIsUnlocked(!!data.unlocked);
      } catch {
        setIsUnlocked(false);
      }
    }
    checkSession();
  }, []);

  // Initialize stored users from localStorage if available
  useEffect(() => {
    try {
      const stored = localStorage.getItem('gdg51_users');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setUsers(parsed);
        }
      }
    } catch {
      // Silently continue
    }
  }, []);

  // Save users to localStorage silently
  const saveUsers = (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    try {
      localStorage.setItem('gdg51_users', JSON.stringify(updatedUsers));
    } catch {
      // Silently continue without error
    }
  };

  const showMessageBox = (
    message: string,
    title: string = 'Message',
    onClose?: () => void
  ) => {
    setMessageBox({
      isOpen: true,
      message,
      title,
      onClose,
    });
  };

  const handleCloseMessageBox = () => {
    const callback = messageBox.onClose;
    setMessageBox((prev) => ({ ...prev, isOpen: false, onClose: undefined }));
    if (callback) callback();
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setTotalPoints(user.totalScore);
    setActiveForm('menu');
  };

  const handleRegisterUser = (newUser: User) => {
    const updated = [...users, newUser];
    saveUsers(updated);
  };

  const handleUpdateScore = (newScore: number) => {
    setTotalPoints(newScore);
    if (currentUser) {
      const updatedUser = { ...currentUser, totalScore: newScore };
      setCurrentUser(updatedUser);

      const updatedUsers = users.map((u) =>
        u.username.toLowerCase() === currentUser.username.toLowerCase()
          ? updatedUser
          : u
      );
      saveUsers(updatedUsers);
    }
  };

  const handleRelock = async () => {
    try {
      await fetch('/api/auth/relock', { method: 'POST' });
    } finally {
      setIsUnlocked(false);
    }
  };

  // If session check still pending
  if (isUnlocked === null) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#008080',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>⏳</div>
          <div>Initializing GDG51 Security Subsystem...</div>
        </div>
      </div>
    );
  }

  // If locked, present secure gatekeeper
  if (!isUnlocked) {
    return <LockoutScreen onUnlocked={() => setIsUnlocked(true)} />;
  }

  // Active form title for taskbar
  const formTitles: Record<FormType, string> = {
    login: 'Login - Staff Login',
    register: 'frmRegisterUser',
    menu: 'frmMenu',
    loading: 'frmLoading',
    quiz: 'Quiz',
    quiz2: 'frmQuiz2',
    quiz3: 'frmQuiz3',
    randomised: 'frmRandomised',
    leaderboard: 'frmLeaderboard',
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#008080',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Desktop Workspace */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '40px',
          position: 'relative',
          overflow: 'auto',
        }}
      >
        {activeForm === 'login' && (
          <FrmLogin
            users={users}
            onLoginSuccess={handleLoginSuccess}
            onGoToRegister={() => setActiveForm('register')}
            showMessageBox={showMessageBox}
          />
        )}

        {activeForm === 'register' && (
          <FrmRegisterUser
            users={users}
            onRegisterUser={handleRegisterUser}
            onGoToLogin={() => setActiveForm('login')}
            showMessageBox={showMessageBox}
          />
        )}

        {activeForm === 'menu' && (
          <FrmMenu
            currentUser={currentUser}
            onStartQuiz={() => setActiveForm('loading')}
            onOpenLeaderboard={() => setActiveForm('leaderboard')}
            onOpenRandomisedQuiz={() => setActiveForm('randomised')}
            onLogOut={() => {
              setCurrentUser(null);
              setActiveForm('login');
            }}
          />
        )}

        {activeForm === 'loading' && (
          <FrmLoading
            onStartQuiz={() => setActiveForm('quiz')}
            onBackToMenu={() => setActiveForm('menu')}
          />
        )}

        {activeForm === 'quiz' && (
          <FrmQuiz
            totalPoints={totalPoints}
            onUpdateScore={handleUpdateScore}
            onContinue={() => setActiveForm('quiz2')}
            showMessageBox={showMessageBox}
          />
        )}

        {activeForm === 'quiz2' && (
          <FrmQuiz2
            totalPoints={totalPoints}
            onUpdateScore={handleUpdateScore}
            onContinue={() => setActiveForm('quiz3')}
            showMessageBox={showMessageBox}
          />
        )}

        {activeForm === 'quiz3' && (
          <FrmQuiz3
            totalPoints={totalPoints}
            onUpdateScore={handleUpdateScore}
            onContinue={() => setActiveForm('randomised')}
            showMessageBox={showMessageBox}
          />
        )}

        {activeForm === 'randomised' && (
          <FrmRandomised
            totalPoints={totalPoints}
            onUpdateScore={handleUpdateScore}
            onBackToMenu={() => setActiveForm('menu')}
            showMessageBox={showMessageBox}
          />
        )}

        {activeForm === 'leaderboard' && (
          <FrmLeaderboard
            users={users}
            onBackToMenu={() => setActiveForm('menu')}
          />
        )}
      </main>

      {/* Reusable WinForms MessageBox Dialog */}
      <MessageBoxModal box={messageBox} onClose={handleCloseMessageBox} />

      {/* Taskbar */}
      <DesktopBar
        activeFormTitle={formTitles[activeForm]}
        onRelock={handleRelock}
        onOpenMenu={() => setActiveForm('menu')}
        onOpenForm={(f) => setActiveForm(f as FormType)}
      />
    </div>
  );
}
