'use client';

import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';

interface LoginDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            <div
                className="absolute inset-0 bg-black/50"
                onClick={() => onOpenChange(false)}
            />

            <div className="relative z-10 w-full max-w-md mx-4 rounded-lg bg-white shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Login</h2>
                    <button
                        aria-label="Close"
                        className="text-gray-600 hover:text-gray-900"
                        onClick={() => onOpenChange(false)}
                    >
                        ✕
                    </button>
                </div>

                <LoginForm onSuccess={() => onOpenChange(false)} />
            </div>
        </div>
    );
}
