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
                {/* Top Navigation */}
                <nav className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShoppingCart className="h-6 w-6" />
                            <span className="text-xl font-semibold">Online Store</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <a href="/styler" className="text-sm text-gray-700 hover:text-gray-900">Dashboard</a>
                            <a href="/styler/orders" className="text-sm text-gray-700 hover:text-gray-900 flex items-center gap-1">
                                <ShoppingCart className="h-4 w-4" />
                                Orders
                            </a>
                            <span className="text-sm text-gray-700">{user?.email}</span>
                            <Button onClick={logout} variant="ghost" size="sm">Logout</Button>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-6 py-8">
                    {/* Welcome Section */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.fullName || 'Styler'}!</h1>
                            <p className="text-gray-600 mt-1">{user?.email}</p>
                        </div>
                        <Button className="bg-black hover:bg-gray-800 text-white">
                            Continue Shopping
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Total Orders */}
                        <Card className="border border-gray-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
                                    <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                                        <ShoppingCart className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900">0</div>
                                <p className="text-xs text-gray-500 mt-1">All time</p>
                            </CardContent>
                        </Card>

                        {/* Pending */}
                        <Card className="border border-gray-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
                                    <div className="h-10 w-10 rounded-full bg-yellow-50 flex items-center justify-center">
                                        <Clock className="h-5 w-5 text-yellow-600" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900">0</div>
                                <p className="text-xs text-gray-500 mt-1">In progress</p>
                            </CardContent>
                        </Card>

                        {/* Completed */}
                        <Card className="border border-gray-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
                                    <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900">0</div>
                                <p className="text-xs text-gray-500 mt-1">Delivered</p>
                            </CardContent>
                        </Card>

                        {/* Total Spent */}
                        <Card className="border border-gray-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
                                    <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center">
                                        <TrendingUp className="h-5 w-5 text-purple-600" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900">Rs. 0.00</div>
                                <p className="text-xs text-gray-500 mt-1">All orders</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Orders */}
                    <Card className="border border-gray-200">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-xl font-bold">Recent Orders</CardTitle>
                                    <CardDescription className="mt-1">Your latest order history and status</CardDescription>
                                </div>
                                <Button className="bg-black hover:bg-gray-800 text-white">
                                    View All
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Empty State */}
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                    <Package className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                                <p className="text-sm text-gray-500 mb-6">Start shopping to see your orders here</p>
                                <Button className="bg-black hover:bg-gray-800 text-white">
                                    Start Shopping
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </ProtectedRoute>
    );
}
