'use client';

import React from 'react';
import { RegisterForm } from '@/components/auth/RegisterForm';

interface SignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignupDialog({ open, onOpenChange }: SignupDialogProps) {
  if (!open) return null;

  return (
    // Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full max-w-md mx-4 rounded-lg bg-white shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Signup</h2>
          <button
            aria-label="Close"
            className="text-gray-600 hover:text-gray-900"
            onClick={() => onOpenChange(false)}
          >
            ✕
          </button>
        </div>

        <RegisterForm onSuccess={() => onOpenChange(false)} />
      </div>
    </div>
  );
}
