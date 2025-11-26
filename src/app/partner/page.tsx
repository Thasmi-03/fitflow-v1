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

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Shirt className="h-5 w-5 text-indigo-600" />
                                    <CardTitle>My Inventory</CardTitle>
                                </div>
                                <CardDescription>Total clothing items</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">0</div>
                                <p className="text-sm text-gray-500 mt-2">Items in inventory</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Package className="h-5 w-5 text-orange-600" />
                                    <CardTitle>Available Items</CardTitle>
                                </div>
                                <CardDescription>Ready for styling</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">0</div>
                                <p className="text-sm text-gray-500 mt-2">Available for rent</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-green-600" />
                                    <CardTitle>Revenue</CardTitle>
                                </div>
                                <CardDescription>Total earnings</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold">$0</div>
                                <p className="text-sm text-gray-500 mt-2">This month</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Manage your clothing inventory</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-gray-500">
                                <p>Start adding your clothing items to the inventory</p>
                                <p className="text-sm mt-2">More features coming soon...</p>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </ProtectedRoute>
    );
}
