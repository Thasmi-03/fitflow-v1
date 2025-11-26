'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shirt, Package, DollarSign } from 'lucide-react';

export default function PartnerDashboard() {
    return (
        <ProtectedRoute allowedRoles={['partner']}>
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Partner Dashboard</h1>
                        <p className="mt-2 text-gray-600">
                            Manage your clothing inventory and track earnings
                        </p>
                    </div>

                   

                   
                </main>
            </div>
        </ProtectedRoute>
    );
}
