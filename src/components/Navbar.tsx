'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/ui/AuthModal';

export function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [mobileOpen, setMobileOpen] = useState(false);

  const openLogin = () => {
    setAuthTab('login');
    setIsAuthOpen(true);
  };

  const openSignup = () => {
    setAuthTab('signup');
    setIsAuthOpen(true);
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">FitFlow</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
            <Link href="/auth/register">
            <Button variant="outline">Become a Partner</Button>
          </Link>
          <Button variant="outline" onClick={openSignup}>Signup</Button>
          <Button variant="outline" onClick={openLogin}>Sigin</Button>
        
        </div>

        {/* Mobile Hamburger */}
        {/* <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button> */}
      </div>

      {/* Mobile Menu */}
      {/* {mobileOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-3">
          <Button className="w-full" variant="outline" onClick={openLogin}>Login</Button>
          <Button className="w-full" variant="outline" onClick={openSignup}>Signup</Button>
          <Link href="/auth/register">
            <Button className="w-full" variant="outline">Become a Partner</Button>
          </Link>
        </div>
      )} */}

      {/* Auth Modal */}
      <AuthModal open={isAuthOpen} initialTab={authTab} onClose={() => setIsAuthOpen(false)} />
    </nav>
  );
}
