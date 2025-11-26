'use client'

import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Role } from '@/types/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: Role[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            // Not authenticated - redirect to login
            if (!user) {
                router.push('/auth/login');
                return;
            }

            // Authenticated but wrong role - redirect to appropriate dashboard
            if (allowedRoles && !allowedRoles.includes(user.role)) {
                const dashboardMap: Record<Role, string> = {
                    admin: '/admin',
                    styler: '/styler',
                    partner: '/partner',
                };
                router.push(dashboardMap[user.role] || '/');
            }
        }
    }, [user, loading, router, allowedRoles]);

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Not authenticated
    if (!user) {
        return null;
    }

    // Wrong role
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
}
