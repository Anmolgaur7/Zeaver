'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import { getOrderById } from '@/lib/api/orders';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      return;
    }

    async function fetchOrder() {
      try {
        setOrder(await getOrderById(orderId!));
      } catch (error) {
        console.error('Failed to load order:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-col justify-center pt-32 text-center px-4">
         <div>
          <h1 className="text-2xl font-bold text-red-500 mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-8">We couldn't retrieve the order details. Please check your email for confirmation.</p>
          <Link href="/" className="text-primary hover:underline">Return Home</Link>
         </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 flex justify-center">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        
        <h1 className="text-4xl font-display font-bold text-primary mb-4">Thank You!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Your order <span className="font-bold text-primary">#{order.order_number}</span> has been confirmed.
        </p>

        <div className="bg-secondary/30 rounded-lg p-8 border border-border mb-8 text-left">
          <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Order Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Shipping To:</p>
              <p className="font-medium text-foreground">{order.shipping_name}</p>
              <p className="text-foreground">{order.shipping_address}</p>
              <p className="text-foreground">{order.shipping_city}, {order.shipping_state} {order.shipping_postal_code}</p>
              <p className="text-foreground">{order.shipping_country}</p>
            </div>
             <div>
              <p className="text-muted-foreground mb-1">Order Summary:</p>
              <div className="flex justify-between mb-1">
                <span>Subtotal</span>
                <span>₹{order.subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Shipping</span>
                <span>₹{order.shipping_cost?.toFixed(2)}</span>
              </div>
               <div className="flex justify-between mb-1">
                <span>Tax</span>
                <span>₹{order.tax?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-border pt-2 mt-2">
                <span>Total</span>
                <span>₹{order.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded font-medium hover:bg-primary/90 transition-colors w-full sm:w-auto"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-input px-8 py-3 rounded font-medium hover:bg-secondary transition-colors w-full sm:w-auto"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
