'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { useCart } from '@/context/cart-context';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, isCartOpen, setIsCartOpen, cartCount } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background border-l border-border p-0">
        <SheetHeader className="px-6 py-4 border-b border-border flex flex-row items-center justify-between space-y-0">
          <SheetTitle className="font-display text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart ({cartCount})
          </SheetTitle>
          {/* Close button is handled by Sheet primitive, but we can add custom if needed */}
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-primary">Your cart is empty</h3>
            <p className="text-muted-foreground max-w-xs">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button 
              onClick={() => setIsCartOpen(false)} 
              className="mt-4"
              asChild
            >
              <Link href="/catalog">
                Start Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="py-6 space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 bg-secondary rounded-md overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                         <div className="w-full h-full flex items-center justify-center text-2xl opacity-20">✨</div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-display font-medium text-primary line-clamp-1">{item.name}</h4>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        {item.size && (
                          <p className="text-xs text-muted-foreground mt-1">Size: {item.size}</p>
                        )}
                        <p className="font-medium text-primary mt-1">₹{item.price * item.quantity}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-border rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-secondary transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-secondary transition-colors"
                            disabled={item.maxQuantity ? item.quantity >= item.maxQuantity : false}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-6 border-t border-border space-y-4 bg-background">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-display text-xl font-bold text-primary">₹{subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Shipping and taxes calculated at checkout.
              </p>
              <Button className="w-full py-6 text-lg font-medium" asChild>
                <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                  Checkout
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
