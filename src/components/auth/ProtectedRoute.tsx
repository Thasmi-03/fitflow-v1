'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
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
            // If not authenticated, redirect to login
            if (!user) {
                router.push('/auth/login');
                return;
            }

            // If user is not approved, redirect to pending page
            if (!user.isApproved) {
                router.push('/auth/pending');
                return;
            }

            // If specific roles are required and user doesn't have the right role
            if (allowedRoles && !allowedRoles.includes(user.role)) {
                // Redirect to user's own dashboard
                const dashboardMap: Record<Role, string> = {
                    admin: '/admin',
                    styler: '/styler',
                    partner: '/partner',
                };
                router.push(dashboardMap[user.role]);
            }
        }
    }, [user, loading, allowedRoles, router]);

    // Show loading state
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Don't render children if not authenticated or not approved
    if (!user || !user.isApproved) {
        return null;
    }

    // Don't render if user doesn't have the right role
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
}
