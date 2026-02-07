'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login with:', { email, password, rememberMe });
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mt-8">
          <h1 className="font-display text-4xl font-bold text-center mb-2 text-balance">Welcome Back</h1>
          <p className="text-center text-muted-foreground font-body mb-10">
            Sign in to your account to continue shopping
          </p>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-border p-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-body font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-body font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-body text-foreground">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-accent font-body hover:text-accent/80 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-primary-foreground font-body font-medium hover:bg-primary/90 transition-colors rounded"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-foreground font-body mb-4">
              Don't have an account?{' '}
              <Link href="/signup" className="text-accent font-medium hover:text-accent/80 transition-colors">
                Sign up here
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground font-body">Or continue as guest</span>
            </div>
          </div>

          <Link
            href="/catalog"
            className="block w-full px-6 py-3 border-2 border-border text-foreground font-body font-medium hover:bg-secondary transition-colors rounded text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
