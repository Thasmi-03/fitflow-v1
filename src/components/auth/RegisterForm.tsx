'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/types/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/**
 * Schema: includes shopName, email, password, confirmPassword, role.
 * role defaults to 'partner' for this page.
 */
const registerSchema = z
  .object({
    shopName: z.string().min(1, 'Shop name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
    role: z.enum(['admin', 'styler', 'partner'], {
      message: 'Please select a role',
    }),
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
    defaultValues: {
      shopName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: isPartnerPage ? 'partner' : 'styler',
    },
  });

  // Set role based on page type
  useEffect(() => {
    setValue('role', isPartnerPage ? 'partner' : 'styler');
  }, [setValue, isPartnerPage]);

  const onSubmit = async (data: RegisterFormValues) => {
    console.log('onSubmit called with:', data);
    try {
      // Adjust this call if your registerUser signature differs
      await registerUser(data.email, data.password, data.role as Role, {
        shopName: data.shopName,
      }, isPartnerPage);
      console.log('registerUser resolved');

      // Call success callback if provided (for modal usage)
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const onError = (errs: any) => {
    console.log('validation errors:', errs);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Become a Partner</CardTitle>
        <CardDescription>Register your shop. Approval required from admin</CardDescription>
      </CardHeader>

      <CardContent>
        {/* NOTE: submit button is INSIDE this form to avoid form-attribute issues */}
        <form id="register-form" onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shopName">Shop Name</Label>
              <Input
                {...register('shopName')}
                id="shopName"
                type="text"
                disabled={loading}
              />
              {errors.shopName && (
                <p className="text-sm text-red-500">{errors.shopName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                autoComplete="email"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  {...register('password')}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                  disabled={loading}
                >
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>



            {/* Hidden role field — default to partner */}
            <input {...register('role')} type="hidden" value="partner" />
          </div>

          {/* Place submit button inside form to guarantee native submit */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
              disabled={loading}
              onClick={() => console.log('native submit clicked')}
            >
              {loading ? 'Creating account...' : 'Register as Partner'}
            </button>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
