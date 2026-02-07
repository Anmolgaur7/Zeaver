'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-primary to-primary/95 text-primary-foreground">
      {/* Top Section with Newsletter */}
      <div className="border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold">Stay Connected</h3>
              <p className="font-body text-sm text-primary-foreground/70">
                Subscribe for exclusive offers and new collection launches.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 border border-primary-foreground/20 focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-primary font-body font-medium hover:bg-accent/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-2xl font-bold tracking-widest">ZEAVER</h3>
              <p className="font-body text-xs tracking-widest text-primary-foreground/60 mt-1 uppercase">
                Luxury Imitation Jewelry
              </p>
            </div>
            <p className="font-body text-sm text-primary-foreground/70 leading-relaxed">
              Timeless elegance meets modern sophistication in every piece.
            </p>
            <div className="space-y-3 pt-4 border-t border-primary-foreground/10">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:hello@zeaver.com" className="font-body text-primary-foreground/80 hover:text-accent transition-colors">
                  hello@zeaver.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:+1234567890" className="font-body text-primary-foreground/80 hover:text-accent transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-5">
            <h4 className="font-display font-bold text-lg tracking-wide">Shop</h4>
            <nav className="space-y-3">
              <Link href="/catalog" className="text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors block hover:translate-x-1 duration-200">
                Collections
              </Link>
              <Link href="/catalog" className="text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors block hover:translate-x-1 duration-200">
                New Arrivals
              </Link>
              <Link href="/catalog" className="text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors block hover:translate-x-1 duration-200">
                Best Sellers
              </Link>
              <Link href="/account" className="text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors block hover:translate-x-1 duration-200">
                My Account
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h4 className="font-display font-bold text-lg tracking-wide">Company</h4>
            <nav className="space-y-3">
              <Link href="/about" className="text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors block hover:translate-x-1 duration-200">
                About Us
              </Link>
              <Link href="/contact" className="text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors block hover:translate-x-1 duration-200">
                Contact
              </Link>
              <Link href="/catalog" className="text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors block hover:translate-x-1 duration-200">
                Lookbook
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-5">
            <h4 className="font-display font-bold text-lg tracking-wide">Support</h4>
            <nav className="space-y-3">
              <Link href="/policies" className="text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors block hover:translate-x-1 duration-200">
                Shipping Info
              </Link>
              <Link href="/policies" className="text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors block hover:translate-x-1 duration-200">
                Returns & Exchanges
              </Link>
              <Link href="/policies" className="text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors block hover:translate-x-1 duration-200">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-5">
            <h4 className="font-display font-bold text-lg tracking-wide">Legal</h4>
            <nav className="space-y-3">
              <Link href="/policies" className="text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors block hover:translate-x-1 duration-200">
                Privacy Policy
              </Link>
              <Link href="/policies" className="text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors block hover:translate-x-1 duration-200">
                Terms of Service
              </Link>
              <Link href="/policies" className="text-sm font-body text-primary-foreground/80 hover:text-accent transition-colors block hover:translate-x-1 duration-200">
                Shipping Policy
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-sm font-body text-primary-foreground/60">
              © 2024 Zeaver. All rights reserved. Crafted with elegance.
            </p>

            {/* Social Links */}
            <div className="flex gap-6">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:bg-accent hover:text-primary transition-all duration-300 group">
                <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:bg-accent hover:text-primary transition-all duration-300 group">
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:bg-accent hover:text-primary transition-all duration-300 group">
                <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
