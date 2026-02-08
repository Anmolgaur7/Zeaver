'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { createOrder } from '@/lib/api/orders';
import { toast } from 'sonner';
import { Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
  });

  // Derived Values
  const shipping = subtotal > 1000 ? 0 : 100; // Free shipping over ₹1000
  const tax = subtotal * 0.18; // 18% GST estimate
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      setIsSubmitting(true);

      // Create Order
      const order = await createOrder({
        // userId is optional for guest checkout
        items: items.map(item => ({
          productId: item.productId,
          productName: item.name,
          productPrice: item.price,
          quantity: item.quantity,
          size: item.size
        })),
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: 'India'
        },
        subtotal,
        shippingCost: shipping,
        tax,
        total
      });

      // Clear cart and redirect
      clearCart();
      toast.success('Order placed successfully!');
      router.push(`/order-confirmation?orderId=${order.id}`);

    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-24 pb-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-display font-bold text-primary mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some items specifically to proceed to checkout.</p>
          <Link href="/catalog" className="bg-primary text-primary-foreground px-8 py-3 rounded hover:bg-primary/90 transition-colors">
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Link>
        
        <h1 className="text-3xl font-display font-bold text-primary mb-8">Checkout</h1>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Left Column: Form */}
          <div className="space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-border space-y-6">
              <h2 className="text-xl font-bold text-primary">Contact Information</h2>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-input rounded focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <div className="border-t border-border pt-6">
                <h2 className="text-xl font-bold text-primary mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-input rounded focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-input rounded focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-input rounded focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                      placeholder="123 Main St, Apt 4B"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-input rounded focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-input rounded focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-input rounded focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-input rounded focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border sticky top-24">
              <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>
              
              <div className="space-y-4 max-h-64 overflow-y-auto mb-6 pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 border-b border-border last:border-0">
                    <div className="relative w-16 h-16 bg-gradient-to-br from-muted to-secondary rounded overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg opacity-30">✨</div>
                      )}
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-primary line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.size}</p>
                    </div>
                    <p className="font-bold text-sm text-primary">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                 <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (GST 18%)</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-border pt-3">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full mt-8 bg-primary text-primary-foreground py-4 rounded font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ₹${total.toFixed(2)}`
                )}
              </button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                Secure checkout powered by Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
