// src/components/auth/StylerRegisterForm.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface StylerRegisterFormValues {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

interface StylerRegisterFormProps {
  onSuccess?: () => void;
}

export function StylerRegisterForm({ onSuccess }: StylerRegisterFormProps = {}) {
  const { register, handleSubmit } = useForm<StylerRegisterFormValues>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: StylerRegisterFormValues) => {
    setLoading(true);
    try {
      console.log('Styler registration data:', data);
      // TODO: call your register API for stylers here.
      // Example: await api.registerStyler(data)
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Styler register error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input {...register('fullName')} id="fullName" required />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input {...register('email')} id="email" type="email" required />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input {...register('phone')} id="phone" required />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input {...register('address')} id="address" required />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input {...register('password')} id="password" type="password" required />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Signing up...' : 'Sign Up'}
      </Button>
    </form>
  );
}
