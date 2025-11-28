'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';

export default function StylerDashboard() {
    return (
        <ProtectedRoute allowedRoles={['styler']}>
            <div className="flex min-h-screen bg-gray-50">
                <DashboardSidebar role="styler" />

                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900">Styler Dashboard</h1>
                            <p className="mt-2 text-gray-600">
                                Manage your wardrobe and discover perfect outfits
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}