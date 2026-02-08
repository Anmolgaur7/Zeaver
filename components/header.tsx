'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { SearchBar } from './search-bar';

import { useCart } from '@/context/cart-context';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="font-display text-2xl font-bold tracking-widest text-primary">
              ZEAVER
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/catalog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <SearchBar />
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative group p-2"
            >
              <ShoppingCart className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-primary hover:text-accent"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-3 border-t border-border pt-4">
            {/* Navigation links removed */}
          </nav>
        )}
      </div>
    </header>
  );
}
