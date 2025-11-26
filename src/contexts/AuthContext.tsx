'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Role, User } from '@/types/auth';
import * as authApi from '@/lib/api/auth';
import { useRouter, usePathname } from 'next/navigation';
import { setToken, getToken, removeToken, setUser as saveUser, getUser as getSavedUser, clearAuthData } from '@/utils/storage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: Role, extra?: any, isPartner?: boolean) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => { },
  register: async () => { },
  logout: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      // Fetch user profile
      const { user } = await authApi.getProfile();
      setUser(user);
      saveUser(user);
    } catch (err) {
      console.error('Auth check failed:', err);
      clearAuthData();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      console.log('Logged in successfully:', response);

      // Save token
      if (response.token) {
        setToken(response.token);
      }

      // Save user
      if (response.user) {
        setUser(response.user);
        saveUser(response.user);

        // Redirect to appropriate dashboard using window.location for guaranteed navigation
        const dashboardMap: Record<Role, string> = {
          admin: '/admin',
          styler: '/styler',
          partner: '/partner',
        };

        const dashboardPath = dashboardMap[response.user.role];
        console.log('Redirecting to:', dashboardPath);

        // Use window.location.href for hard redirect
        window.location.href = dashboardPath;
      }
    } catch (err: any) {
      console.error('Login error:', err);

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

      // For partners, redirect to pending page
      if (isPartner || role === 'partner') {
        router.push('/auth/pending');
      } else {
        // For stylers, they can login immediately (auto-approved)
        router.push('/auth/login');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      const errorMessage = err?.response?.data?.message || err?.response?.data?.error || 'Registration failed';
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register: registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
