'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/types/auth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const registerSchema = z
  .object({
    shopName: z.string().min(1, 'Shop name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 chars'),
    confirmPassword: z.string().min(6),
    role: z.enum(['admin', 'styler', 'partner']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  isPartnerPage?: boolean;
  onSuccess?: () => void;
}

export function RegisterForm({ isPartnerPage = false, onSuccess }: RegisterFormProps = {}) {
  const { register: registerUser, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { shopName: '', email: '', password: '' },
  });

  useEffect(() => {
    setValue('role', isPartnerPage ? 'partner' : 'styler');
  }, [setValue, isPartnerPage]);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(data.email, data.password, data.role as Role, { shopName: data.shopName }, isPartnerPage);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="shopName">Shop Name</Label>
        <Input {...register('shopName')} id="shopName" disabled={loading} />
        {errors.shopName && <p className="text-red-500 text-sm">{errors.shopName.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input {...register('email')} id="email" type="email" disabled={loading} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input {...register('password')} id="password" type={showPassword ? 'text' : 'password'} disabled={loading} />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

     

      <input {...register('role')} type="hidden" value="partner" />

      <Button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register as Partner'}</Button>
    </form>
  );
}
