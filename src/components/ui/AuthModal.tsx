'use client';
import { useEffect, useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';

interface AuthModalProps {
  open: boolean;
  initialTab?: 'login' | 'signup';
  onClose: () => void;
}

export default function AuthModal({ open, initialTab = 'login', onClose }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab);

  useEffect(() => {
    if (open) setTab(initialTab);
  }, [open, initialTab]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white p-6 rounded shadow-lg z-60 w-full max-w-md relative">
        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            className={`flex-1 py-2 rounded ${tab === 'login' ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}
            onClick={() => setTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 rounded ${tab === 'signup' ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}
            onClick={() => setTab('signup')}
          >
            Signup
          </button>
        </div>

        {/* Forms */}
        {tab === 'login' ? <LoginForm onSuccess={onClose} /> : <RegisterForm onSuccess={onClose} />}

        <div className="mt-4 text-right">
          <button onClick={onClose} className="text-sm underline">Close</button>
        </div>
      </div>
    </div>
  );
}
