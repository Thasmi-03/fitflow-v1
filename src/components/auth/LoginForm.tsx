'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps = {}) {
  const { login, loading } = useAuth();
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const [error, setError] = useState('');

  const onSubmit = async (data: LoginFormValues) => {
    setError('');
    try {
      await login(data.email, data.password);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input {...register('email')} id="email" type="email" disabled={loading} />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input {...register('password')} id="password" type="password" disabled={loading} />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</Button>
    </form>
  );
}
