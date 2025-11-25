'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Calendar, TrendingUp } from 'lucide-react';

export default function StylerDashboard() {
    const { user } = useAuth();

    return (
        <ProtectedRoute allowedRoles={['styler']}>
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Styler Dashboard</h1>
                        <p className="mt-2 text-gray-600">
                            Welcome back, {user?.email}
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Palette className="h-5 w-5 text-purple-600" />
                                    <CardTitle>My Occasions</CardTitle>
                                </div>
                                <CardDescription>Manage your styling occasions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">0</div>
                                <p className="text-sm text-gray-500 mt-2">Total occasions created</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-blue-600" />
                                    <CardTitle>Upcoming Events</CardTitle>
                                </div>
                                <CardDescription>Events scheduled this month</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">0</div>
                                <p className="text-sm text-gray-500 mt-2">Events this month</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-green-600" />
                                    <CardTitle>Active Clients</CardTitle>
                                </div>
                                <CardDescription>Clients you're working with</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">0</div>
                                <p className="text-sm text-gray-500 mt-2">Active clients</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Get started with your styling work</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-gray-500">
                                <p>Start creating occasions and managing your styling portfolio</p>
                                <p className="text-sm mt-2">More features coming soon...</p>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </ProtectedRoute>
    );
}
