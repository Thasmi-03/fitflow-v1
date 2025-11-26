import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/Navbar';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <Navbar />
      <Toaster />
      {children}
    </AuthProvider>
  );
}
