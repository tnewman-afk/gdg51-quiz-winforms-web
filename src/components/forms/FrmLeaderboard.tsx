'use client';

import React from 'react';
import { User } from '@/lib/types';
import WinFormsWindow from '@/components/WinFormsWindow';

interface FrmLeaderboardProps {
  users: User[];
  onBackToMenu: () => void;
}

export default function FrmLeaderboard({ users, onBackToMenu }: FrmLeaderboardProps) {
  // Sort users descending by totalScore
  const sortedUsers = [...users].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <WinFormsWindow title="frmLeaderboard" width={800} height={530} backgroundColor="#afeeee">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
          position: 'relative',
          padding: '16px',
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontFamily: "'Microsoft Sans Serif', sans-serif",
            fontSize: '28px',
            fontWeight: 'normal',
            color: '#000000',
            marginBottom: '20px',
          }}
        >
          Leaderboard
        </h1>

        {/* DataGridView Container */}
        <div
          className="win-bevel-in"
          style={{
            width: '540px',
            maxWidth: '100%',
            height: '320px',
            overflowY: 'auto',
            backgroundColor: '#ffffff',
            boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px',
              fontFamily: "'Segoe UI', Tahoma, sans-serif",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: '#e4e4e4',
                  borderBottom: '2px solid #808080',
                  position: 'sticky',
                  top: 0,
                  zIndex: 10,
                }}
              >
                <th
                  style={{
                    padding: '6px 10px',
                    textAlign: 'left',
                    borderRight: '1px solid #c0c0c0',
                    fontWeight: 600,
                  }}
                >
                  Username
                </th>
                <th
                  style={{
                    padding: '6px 10px',
                    textAlign: 'left',
                    borderRight: '1px solid #c0c0c0',
                    fontWeight: 600,
                  }}
                >
                  First Name
                </th>
                <th
                  style={{
                    padding: '6px 10px',
                    textAlign: 'left',
                    borderRight: '1px solid #c0c0c0',
                    fontWeight: 600,
                  }}
                >
                  Last Name
                </th>
                <th
                  style={{
                    padding: '6px 10px',
                    textAlign: 'right',
                    fontWeight: 600,
                  }}
                >
                  Total Score
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr
                  key={user.username + index}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa',
                    borderBottom: '1px solid #e0e0e0',
                  }}
                >
                  <td
                    style={{
                      padding: '7px 10px',
                      borderRight: '1px solid #f0f0f0',
                      fontWeight: 500,
                    }}
                  >
                    {user.username}
                  </td>
                  <td
                    style={{
                      padding: '7px 10px',
                      borderRight: '1px solid #f0f0f0',
                    }}
                  >
                    {user.firstName}
                  </td>
                  <td
                    style={{
                      padding: '7px 10px',
                      borderRight: '1px solid #f0f0f0',
                    }}
                  >
                    {user.lastName}
                  </td>
                  <td
                    style={{
                      padding: '7px 10px',
                      textAlign: 'right',
                      fontWeight: 'bold',
                      color: user.totalScore > 0 ? '#15803d' : '#000000',
                    }}
                  >
                    {user.totalScore}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Menu Button */}
        <div style={{ position: 'absolute', bottom: '16px', left: '20px' }}>
          <button
            type="button"
            className="win-button"
            onClick={onBackToMenu}
            style={{
              backgroundColor: '#00ff7f', // SpringGreen
              color: '#000000',
              fontWeight: 'bold',
              padding: '6px 24px',
              fontSize: '13px',
            }}
          >
            Menu
          </button>
        </div>
      </div>
    </WinFormsWindow>
  );
}
