'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Role } from '@/types/auth';
import * as authApi from '@/lib/api/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: Role, extra?: any, isPartner?: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  loading: false,
  login: async () => { },
  register: async () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      console.log('Logged in successfully:', response);

      // TODO: Store token and user data
      // For now, just redirect based on role
      if (response.user) {
        const dashboardMap: Record<Role, string> = {
          admin: '/admin',
          styler: '/styler',
          partner: '/partner',
        };
        router.push(dashboardMap[response.user.role]);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      console.error('Login error response:', err?.response?.data);

      // Handle specific error cases
      if (err?.response?.status === 403) {
        throw new Error('Your account is pending admin approval. Please wait for approval before logging in.');
      }

      const errorMessage = err?.response?.data?.message || err?.response?.data?.error || 'Invalid credentials';
      throw new Error(errorMessage);
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
      const response = await authApi.register({
        email,
        password,
        role,
        ...extra
      });
      console.log('Registered successfully:', response);

      // Redirect to pending page or login based on response
      if (isPartner) {
        router.push('/auth/pending');
      } else {
        router.push('/auth/login');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      console.error('Error response:', err?.response?.data);
      const errorMessage = err?.response?.data?.message || err?.response?.data?.error || 'Registration failed';
      throw new Error(errorMessage);
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
