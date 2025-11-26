'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Clock, CheckCircle, TrendingUp, ArrowRight, Package } from 'lucide-react';

export default function StylerDashboard() {
    const { user, logout } = useAuth();

    return (
        <ProtectedRoute allowedRoles={['styler']}>
            <div className="min-h-screen bg-gray-50">
                <nav className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                            <span className="text-xl font-semibold">Online Store</span>
                        <div className="flex items-center gap-6">
                            <a href="/styler" className="text-sm text-gray-700 hover:text-gray-900">Dashboard</a>
                            <a href="/styler/orders" className="text-sm text-gray-700 hover:text-gray-900 flex items-center gap-1">
                                Orders
                            </a>
                            <span className="text-sm text-gray-700">{user?.email}</span>
                            <Button onClick={logout} variant="ghost" size="sm">Logout</Button>
                        </div>
                    </div>
                </nav>

                
            </div>
        </ProtectedRoute>
    );
}
