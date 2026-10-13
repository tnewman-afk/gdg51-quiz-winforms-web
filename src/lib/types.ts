export interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  totalScore: number;
  userType: string;
  gender: string;
  dob: string;
}

export interface Question {
  questionText: string;
  answers: string[];
  correctAnswerIndex: number;
}

export const INITIAL_USERS: User[] = [
  {
    username: 'THOMAS',
    password: 'PASSWORD',
    firstName: 'Thomas',
    lastName: 'Newman',
    totalScore: 1,
    userType: 'Customer',
    gender: 'Male',
    dob: '2025-11-05T12:39:43.000Z',
  },
];
