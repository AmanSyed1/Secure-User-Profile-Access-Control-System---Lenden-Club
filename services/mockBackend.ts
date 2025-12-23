
import { UserProfile, AuthResponse } from '../types';

// Simple mock of the security logic for the demo environment
const MOCK_SECRET = 'secure-key-123';
const USERS_DB: any[] = JSON.parse(localStorage.getItem('mock_users_db') || '[]');

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  register: async (name: string, email: string, pass: string, govId: string): Promise<void> => {
    await sleep(800);
    if (USERS_DB.find(u => u.email === email)) {
      throw new Error('User already exists');
    }
    const newUser = {
      id: USERS_DB.length + 1,
      name,
      email,
      password: pass, // In real backend, this is hashed
      government_id: govId, // In real backend, this is encrypted
      created_at: new Date().toISOString()
    };
    USERS_DB.push(newUser);
    localStorage.setItem('mock_users_db', JSON.stringify(USERS_DB));
  },

  login: async (email: string, pass: string): Promise<AuthResponse> => {
    await sleep(800);
    const user = USERS_DB.find(u => u.email === email && u.password === pass);
    if (!user) throw new Error('Invalid credentials');
    
    // Return a mock JWT
    return { token: `mock-jwt-token-${user.id}` };
  },

  getProfile: async (token: string): Promise<UserProfile> => {
    await sleep(600);
    const userId = parseInt(token.replace('mock-jwt-token-', ''));
    const user = USERS_DB.find(u => u.id === userId);
    if (!user) throw new Error('Invalid token!');
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      government_id: user.government_id,
      created_at: user.created_at
    };
  }
};
