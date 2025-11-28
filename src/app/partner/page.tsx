'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function PartnerDashboard() {
    return (
        <ProtectedRoute allowedRoles={['partner']}>
            <div className="flex min-h-screen bg-gray-50">
                <DashboardSidebar role="partner" />

                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">Partner Store Dashboard</h1>
                                    <p className="mt-2 text-gray-600">
                                        Manage your inventory, track sales, and grow your business
                                    </p>
                                </div>
                                <Link href="/partner/clothes/add">
                                    <Button className="flex items-center gap-2 bg-[#e2c2b7] hover:bg-[#d4b5a8] text-gray-900">
                                        <Plus className="h-4 w-4" />
                                        Add New Product
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}