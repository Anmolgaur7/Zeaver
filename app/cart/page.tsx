'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Classic Pearl Necklace',
      price: 49.99,
      quantity: 1,
      size: 'One Size',
    },
    {
      id: '3',
      name: 'Gold Bangle Bracelet',
      price: 39.99,
      quantity: 2,
      size: 'One Size',
    },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <main className="min-h-screen">
      <Header />

      {/* Page Header */}
      <div className="pt-24 pb-12 bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-primary">Shopping Cart</h1>
        </div>
      </div>

      {/* Cart Section */}
      <div className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-6">
              <div className="text-6xl opacity-20">🛒</div>
              <h2 className="font-display text-3xl font-bold text-primary">Your cart is empty</h2>
              <p className="font-body text-muted-foreground max-w-md mx-auto">
                Start shopping and add your favorite pieces to your cart.
              </p>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-body font-medium hover:bg-primary/90 transition-colors"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-border">
                  <h2 className="font-display text-2xl font-bold text-primary">Items in Cart</h2>
                  <p className="text-sm font-body text-muted-foreground">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                  </p>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="border border-border rounded-lg p-6 space-y-4">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-gradient-to-br from-muted to-secondary rounded-lg flex-shrink-0 flex items-center justify-center">
                        <div className="text-3xl opacity-20">✨</div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="space-y-1 mb-4">
                          <h3 className="font-display text-lg font-bold text-primary">
                            {item.name}
                          </h3>
                          <p className="text-sm font-body text-muted-foreground">Size: {item.size}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 border border-border hover:border-primary transition-colors flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 border border-border hover:border-primary transition-colors flex items-center justify-center"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">${item.price} each</p>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive/80 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}

                <Link
                  href="/catalog"
                  className="inline-flex items-center gap-2 text-primary hover:text-accent font-body font-medium mt-6"
                >
                  ← Continue Shopping
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-secondary rounded-lg p-8 space-y-6 sticky top-24">
                  <h3 className="font-display text-2xl font-bold text-primary">Order Summary</h3>

                  <div className="space-y-4 border-b border-border pb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-body text-foreground">Subtotal</span>
                      <span className="font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-body text-foreground">
                        Shipping {shipping === 0 && <span className="text-accent text-sm">(Free)</span>}
                      </span>
                      <span className="font-bold">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-body text-foreground">Tax (estimated)</span>
                      <span className="font-bold">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <span className="font-display text-xl font-bold text-primary">Total</span>
                    <span className="font-display text-2xl font-bold text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full bg-primary text-primary-foreground py-4 font-body font-bold text-center hover:bg-primary/90 transition-colors block"
                  >
                    Proceed to Checkout
                  </Link>

                  <details className="space-y-2">
                    <summary className="font-body font-medium text-primary cursor-pointer hover:text-accent">
                      Have a promo code?
                    </summary>
                    <div className="space-y-3 pt-3">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="w-full px-4 py-2 border border-border focus:outline-none focus:border-primary transition-colors bg-white"
                      />
                      <button className="w-full border border-primary text-primary py-2 font-body font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
                        Apply
                      </button>
                    </div>
                  </details>

                  <div className="bg-white/50 border border-border rounded p-4 space-y-2 text-sm">
                    <p className="font-body font-medium text-primary">✓ Free shipping on orders over $50</p>
                    <p className="font-body text-muted-foreground text-xs">
                      Quality guaranteed or your money back
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
