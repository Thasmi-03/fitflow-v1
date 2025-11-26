'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { getPendingUsers, approveUser } from '@/lib/api/admin';
import { PendingUser } from '@/types/auth';
import { toast } from 'sonner';
import { Users, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
    const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPendingUsers();
    }, []);

    const loadPendingUsers = async () => {
        try {
            setLoading(true);
            const response = await getPendingUsers();
            setPendingUsers(response.users);
        } catch (error) {
            console.error('Error loading pending users:', error);
            toast.error('Failed to load pending users');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (userId: string) => {
        try {
            await approveUser(userId);
            toast.success('User approved successfully');
            loadPendingUsers();
        } catch (error) {
            console.error('Error approving user:', error);
            toast.error('Failed to approve user');
        }
    };

    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="mt-2 text-gray-600">
                            Manage user approvals and system settings
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Pending Users</CardTitle>
                                <CardDescription>Users waiting for approval</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">{pendingUsers.length}</div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                <CardTitle>Pending User Approvals</CardTitle>
                            </div>
                            <CardDescription>
                                Review and approve user registrations
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="text-center py-8">
                                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
                                    <p className="mt-4 text-gray-600">Loading...</p>
                                </div>
                            ) : pendingUsers.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    No pending users to approve
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {pendingUsers.map((pendingUser) => (
                                        <div
                                            key={pendingUser.id}
                                            className="flex items-center justify-between rounded-lg border p-4"
                                        >
                                            <div>
                                                <p className="font-medium">{pendingUser.email}</p>
                                                <p className="text-sm text-gray-500">
                                                    Role: <span className="capitalize">{pendingUser.role}</span>
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    Registered: {new Date(pendingUser.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <Button
                                                onClick={() => handleApprove(pendingUser.id)}
                                                size="sm"
                                                className="flex items-center gap-2"
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                                Approve
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </ProtectedRoute>
    );
}
