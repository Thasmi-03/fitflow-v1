'use client';

import { Navbar } from '../components/layout/Navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex flex-col items-center justify-center pt-32 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Fitflow</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Fashion & Style Management. Manage your wardrobe, create stunning outfits, and discover your personal style.
        </p>
      </main>
    </div>
  );
}
