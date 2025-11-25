'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getRoleDashboardUrl } from '@/utils/roleRedirect';
import { Button } from '@/components/ui/button';
import { GalleryVerticalEnd } from 'lucide-react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to their dashboard
    if (!loading && user && user.isApproved) {
      const dashboardUrl = getRoleDashboardUrl(user.role);
      router.push(dashboardUrl);
    }
  }, [user, loading, router]);

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="flex w-full max-w-4xl flex-col items-center justify-center px-8 py-16 text-center">
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-lg">
            <GalleryVerticalEnd className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            FitFlow
          </h1>
        </div>

        <h2 className="mb-4 text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-4xl">
          Fashion & Style Management
        </h2>

        <p className="mb-8 max-w-2xl text-lg text-gray-600">
          Manage your wardrobe, create stunning outfits, and discover your
          personal style with FitFlow. Whether you're a stylist, partner, or
          admin, we've got you covered.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/auth/login">
            <Button size="lg" className="w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Create Account
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-2 font-semibold text-gray-900">For Stylists</h3>
            <p className="text-sm text-gray-600">
              Create occasions, manage outfits, and help clients look their best
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-2 font-semibold text-gray-900">For Partners</h3>
            <p className="text-sm text-gray-600">
              Showcase your clothing inventory and connect with stylists
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-2 font-semibold text-gray-900">For Admins</h3>
            <p className="text-sm text-gray-600">
              Manage users, approve accounts, and oversee platform operations
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
