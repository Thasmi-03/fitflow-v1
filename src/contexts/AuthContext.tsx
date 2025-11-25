'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AuthContextType, User, Role, AuthResponse } from '@/types/auth';
import { login as apiLogin, register as apiRegister, getProfile } from '@/lib/api/auth';
import { setToken, getToken, setUser, getUser, clearAuthData } from '@/utils/storage';
import { getRoleDashboardUrl } from '@/utils/roleRedirect';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUserState] = useState<User | null>(null);
    const [token, setTokenState] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Initialize auth state from localStorage
    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedToken = getToken();
                const storedUser = getUser();

                if (storedToken && storedUser) {
                    setTokenState(storedToken);
                    setUserState(storedUser);

                    // Verify token is still valid by fetching profile
                    try {
                        const { user: currentUser } = await getProfile();
                        setUserState(currentUser);
                        setUser(currentUser);
                    } catch (err) {
                        // Token is invalid, clear auth data
                        clearAuthData();
                        setTokenState(null);
                        setUserState(null);
                    }
                }
            } catch (err) {
                console.error('Error initializing auth:', err);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        try {
            setError(null);
            setLoading(true);

            const response: AuthResponse = await apiLogin({ email, password });

            if (response.token && response.user) {
                // Store token and user
                setToken(response.token);
                setUser(response.user);
                setTokenState(response.token);
                setUserState(response.user);

                toast.success('Login successful!');

                // Redirect to role-based dashboard
                const dashboardUrl = getRoleDashboardUrl(response.user.role);
                router.push(dashboardUrl);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || err.message || 'Login failed';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (
        email: string,
        password: string,
        role: Role,
        metadata?: Record<string, any>,
        isPartnerPage: boolean = false
    ): Promise<AuthResponse> => {
        try {
            setError(null);
            setLoading(true);

            const response: AuthResponse = await apiRegister({ email, password, role });

            // If token is returned (first admin or auto-approved), store it
            if (response.token && response.user) {
                setToken(response.token);
                setUser(response.user);
                setTokenState(response.token);
                setUserState(response.user);

                toast.success(response.message || 'Registration successful!');

                // Redirect to role-based dashboard
                const dashboardUrl = getRoleDashboardUrl(response.user.role);
                router.push(dashboardUrl);
            } else {
                // User needs approval
                toast.info(response.message || 'Registration successful! Waiting for admin approval.');

                // Redirect based on registration source
                if (isPartnerPage) {
                    // Partner registrations redirect to login
                    router.push('/auth/login');
                } else {
                    // Other registrations go to pending page
                    router.push('/auth/pending');
                }
            }

            return response;
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || err.message || 'Registration failed';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        clearAuthData();
        setTokenState(null);
        setUserState(null);
        toast.success('Logged out successfully');
        router.push('/');
    };

    const clearError = () => {
        setError(null);
    };

    const value: AuthContextType = {
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        clearError,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
