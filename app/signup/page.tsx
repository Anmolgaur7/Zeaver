'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle signup logic here
    console.log('Signup with:', formData);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mt-8">
          <h1 className="font-display text-4xl font-bold text-center mb-2 text-balance">Create Account</h1>
          <p className="text-center text-muted-foreground font-body mb-10">
            Join us and discover luxury jewelry
          </p>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-border p-8 space-y-5">
            <div>
              <label htmlFor="firstName" className="block text-sm font-body font-medium text-foreground mb-2">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Sarah"
                className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
              />
              {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-body font-medium text-foreground mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Anderson"
                className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
              />
              {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-body font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-body font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
              />
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
              <p className="text-xs text-muted-foreground mt-2">Minimum 8 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-body font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
              />
              {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-start gap-2">
              <input
                id="agreeToTerms"
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 rounded mt-1"
              />
              <label htmlFor="agreeToTerms" className="text-sm font-body text-foreground leading-relaxed">
                I agree to the{' '}
                <Link href="/policies" className="text-accent hover:text-accent/80 transition-colors">
                  terms and conditions
                </Link>{' '}
                and{' '}
                <Link href="/policies" className="text-accent hover:text-accent/80 transition-colors">
                  privacy policy
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && <p className="text-sm text-red-600">{errors.agreeToTerms}</p>}

            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-primary-foreground font-body font-medium hover:bg-primary/90 transition-colors rounded"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-foreground font-body">
              Already have an account?{' '}
              <Link href="/login" className="text-accent font-medium hover:text-accent/80 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
