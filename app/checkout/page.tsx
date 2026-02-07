'use client';

import React from "react"

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const cartItems = [
    { id: 1, name: 'Statement Necklace', price: 49.99, quantity: 1 },
    { id: 2, name: 'Diamond Earrings', price: 89.99, quantity: 1 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStepChange = (step: 'shipping' | 'payment' | 'review') => {
    setCurrentStep(step);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <Link href="/cart" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Cart
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-6 text-balance">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {(['shipping', 'payment', 'review'] as const).map((step, idx) => (
              <div key={step} className="flex items-center flex-1">
                <button
                  onClick={() => handleStepChange(step)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
                    currentStep === step
                      ? 'bg-primary text-primary-foreground'
                      : ['shipping', 'payment'].includes(currentStep) && ['shipping', 'payment', 'review'].indexOf(step) < ['shipping', 'payment', 'review'].indexOf(currentStep)
                        ? 'bg-accent text-primary'
                        : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {idx + 1}
                </button>

                {idx < 2 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 transition-colors ${
                      ['shipping', 'payment'].includes(currentStep) && ['shipping', 'payment', 'review'].indexOf(step) < ['shipping', 'payment', 'review'].indexOf(currentStep)
                        ? 'bg-accent'
                        : 'bg-secondary'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6 text-sm font-body">
            <span className={currentStep === 'shipping' ? 'font-bold text-primary' : 'text-muted-foreground'}>
              Shipping
            </span>
            <span className={currentStep === 'payment' ? 'font-bold text-primary' : 'text-muted-foreground'}>
              Payment
            </span>
            <span className={currentStep === 'review' ? 'font-bold text-primary' : 'text-muted-foreground'}>
              Review
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-border p-8 space-y-8">
              {/* Shipping Address */}
              {currentStep === 'shipping' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-6">Shipping Address</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State / Province"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="Zip Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                    />
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => handleStepChange('payment')}
                      className="flex-1 px-6 py-3 bg-primary text-primary-foreground font-body font-medium hover:bg-primary/90 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Information */}
              {currentStep === 'payment' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-6">Payment Information</h2>
                  </div>

                  <input
                    type="text"
                    name="cardName"
                    placeholder="Cardholder Name"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                  />

                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      type="text"
                      name="cardCvc"
                      placeholder="CVC"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      className="col-span-1 px-4 py-3 border border-border rounded bg-input focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => handleStepChange('shipping')}
                      className="flex-1 px-6 py-3 border border-border text-primary font-body font-medium hover:bg-secondary transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => handleStepChange('review')}
                      className="flex-1 px-6 py-3 bg-primary text-primary-foreground font-body font-medium hover:bg-primary/90 transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {/* Order Review */}
              {currentStep === 'review' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="font-display text-2xl font-bold mb-6">Order Review</h2>
                  </div>

                  <div className="space-y-4 border-t border-b border-border py-6">
                    <div className="space-y-3">
                      <h3 className="font-body font-medium text-sm text-muted-foreground uppercase">Shipping To</h3>
                      <p className="font-body text-foreground">
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p className="font-body text-foreground">{formData.address}</p>
                      <p className="font-body text-foreground">
                        {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-body font-medium text-sm text-muted-foreground uppercase">Shipping Method</h3>
                    <div className="flex items-center gap-4 p-4 border border-border rounded hover:bg-secondary transition-colors cursor-pointer">
                      <input type="radio" name="shipping" defaultChecked className="w-4 h-4" />
                      <div>
                        <p className="font-body font-medium">Standard Shipping</p>
                        <p className="text-sm text-muted-foreground">5-7 business days</p>
                      </div>
                      <p className="font-body font-bold ml-auto">${shipping.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => handleStepChange('payment')}
                      className="flex-1 px-6 py-3 border border-border text-primary font-body font-medium hover:bg-secondary transition-colors"
                    >
                      Back
                    </button>
                    <button className="flex-1 px-6 py-3 bg-accent text-primary font-body font-medium hover:bg-accent/90 transition-colors">
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg border border-border p-8 sticky top-8">
              <h3 className="font-display text-xl font-bold mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-body font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-body font-medium text-foreground ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between font-display font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-secondary rounded text-sm font-body text-muted-foreground">
                Free shipping on orders over $100
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
