'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { Role } from '@/types/auth';

interface AuthContextType {
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: Role, extra?: any, isPartner?: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  loading: false,
  login: async () => {},
  register: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      console.log('Logged in', res.data);
    } catch (err) {
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (
    email: string,
    password: string,
    role: Role,
    extra?: any,
    isPartner?: boolean
  ) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/register', { email, password, role, ...extra });
      console.log('Registered', res.data);
    } catch (err) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ loading, login, register: registerUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
