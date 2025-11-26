'use client'

import React from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    // TODO: Implement proper authentication checks when user state is added to AuthContext
    // For now, just render children
    return <>{children}</>;
}
