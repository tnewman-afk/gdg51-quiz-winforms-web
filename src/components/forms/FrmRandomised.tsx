'use client';

import React, { useState, useEffect } from 'react';
import { Question } from '@/lib/types';
import WinFormsWindow from '@/components/WinFormsWindow';

const INITIAL_COMPUTING_QUESTIONS: Question[] = [
  {
    questionText: 'What does CPU stand for?',
    answers: ['Central Processing Unit', 'Computer Personal Unit', 'Central Peripheral Utility'],
    correctAnswerIndex: 0,
  },
  {
    questionText: 'Which of these is an input device?',
    answers: ['Printer', 'Keyboard', 'Monitor'],
    correctAnswerIndex: 1,
  },
  {
    questionText: 'What does RAM stand for?',
    answers: ['Random Access Memory', 'Read Any Memory', 'Rapid Action Mode'],
    correctAnswerIndex: 0,
  },
  {
    questionText: 'Which file extension is used for an executable file?',
    answers: ['.exe', '.txt', '.jpg'],
    correctAnswerIndex: 0,
  },
  {
    questionText: 'What is the main circuit board in a computer called?',
    answers: ['Processor', 'Motherboard', 'Hard Drive'],
    correctAnswerIndex: 1,
  },
  {
    questionText: 'Which of these is NOT an operating system?',
    answers: ['Windows', 'Linux', 'Google'],
    correctAnswerIndex: 2,
  },
  {
    questionText: 'Which component stores data permanently?',
    answers: ['RAM', 'Hard Drive', 'Cache'],
    correctAnswerIndex: 1,
  },
  {
    questionText: 'What does GUI stand for?',
    answers: ['General User Interaction', 'Graphical User Interface', 'Global User Internet'],
    correctAnswerIndex: 1,
  },
  {
    questionText: 'What type of software is Microsoft Word?',
    answers: ['System Software', 'Application Software', 'Utility Software'],
    correctAnswerIndex: 1,
  },
  {
    questionText: 'Which binary number equals 5?',
    answers: ['101', '110', '100'],
    correctAnswerIndex: 0,
  },
];

interface FrmRandomisedProps {
  totalPoints: number;
  onUpdateScore: (newScore: number) => void;
  onBackToMenu: () => void;
  showMessageBox: (message: string, title?: string, onClose?: () => void) => void;
}

export default function FrmRandomised({
  totalPoints,
  onUpdateScore,
  onBackToMenu,
  showMessageBox,
}: FrmRandomisedProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Shuffle questions on load
    const shuffled = [...INITIAL_COMPUTING_QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, []);

  const handleNext = () => {
    if (selectedAnswer === null) {
      showMessageBox('Please select an answer before continuing.', 'Computing Quiz');
      return;
    }

    const currentQ = questions[currentIndex];
    let newScore = playerScore;
    if (selectedAnswer === currentQ.correctAnswerIndex) {
      newScore = playerScore + 1;
      setPlayerScore(newScore);
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setSelectedAnswer(null);
    } else {
      setIsCompleted(true);
      onUpdateScore(totalPoints + newScore);
    }
  };

  const currentQ = questions[currentIndex];

  return (
    <WinFormsWindow title="frmRandomised" width={820} height={520} backgroundColor="#f0f0f0">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '20px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#000000', marginBottom: '4px' }}>
              Computing Quiz
            </h2>
            <p style={{ fontSize: '13px', color: '#555555' }}>Please select one option</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#000000' }}>
              Quiz Score: {playerScore} / {questions.length}
            </div>
            <div style={{ fontSize: '13px', color: '#333333' }}>
              Global Score: {totalPoints}
            </div>
          </div>
        </div>

        {/* Content */}
        {!isCompleted && currentQ ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '640px', margin: '0 auto', width: '100%' }}>
            <div style={{ marginBottom: '18px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0a246a' }}>
                Question {currentIndex + 1} of {questions.length}:
              </span>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#000000',
                  marginTop: '4px',
                }}
              >
                {currentQ.questionText}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              {currentQ.answers.map((ans, idx) => (
                <label
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '15px',
                    cursor: 'pointer',
                    padding: '8px 12px',
                    backgroundColor: selectedAnswer === idx ? '#e0f2fe' : '#ffffff',
                    border: '1px solid #d1d5db',
                  }}
                >
                  <input
                    type="radio"
                    name="randomAns"
                    checked={selectedAnswer === idx}
                    onChange={() => setSelectedAnswer(idx)}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <span>{ans}</span>
                </label>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                className="win-button"
                onClick={handleNext}
                style={{ padding: '8px 36px', fontSize: '14px', fontWeight: 'bold' }}
              >
                {currentIndex + 1 === questions.length ? 'Finish Quiz' : 'Next'}
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#16a34a', marginBottom: '12px' }}>
              Quiz complete!
            </h2>
            <p style={{ fontSize: '18px', marginBottom: '24px', color: '#000000' }}>
              Final Score: {playerScore} / {questions.length}
            </p>
            <p style={{ fontSize: '14px', marginBottom: '24px', color: '#555555' }}>
              Total user score has been updated.
            </p>
            <button
              className="win-button"
              onClick={onBackToMenu}
              style={{ padding: '10px 30px', fontSize: '15px', fontWeight: 'bold' }}
            >
              Return to Menu
            </button>
          </div>
        )}
      </div>
    </WinFormsWindow>
  );
}
