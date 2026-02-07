'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Heart, Share2, Truck, RotateCw, Shield } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock product data - in real app this would come from database
  const product = {
    id: params.id,
    name: 'Classic Pearl Necklace',
    price: 49.99,
    originalPrice: 79.99,
    category: 'Necklaces',
    rating: 4.8,
    reviews: 128,
    description:
      'Elevate your elegance with our timeless Classic Pearl Necklace. Meticulously crafted with premium imitation materials, this piece brings sophistication to any occasion. Perfect for daily wear or special events.',
    features: [
      'Premium quality imitation pearls',
      'Adjustable length chain',
      'Hypoallergenic materials',
      'Comes with elegant gift box',
      'Water resistant coating',
    ],
    sizes: ['One Size', 'Adjustable'],
    inStock: true,
  };

  const relatedProducts = [
    { id: '2', name: 'Crystal Drop Earrings', price: 29.99 },
    { id: '3', name: 'Gold Bangle Bracelet', price: 39.99 },
    { id: '5', name: 'Three Piece Jewelry Set', price: 79.99 },
  ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm font-body">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/catalog" className="text-muted-foreground hover:text-primary">
              Collections
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-primary font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-muted to-secondary rounded-lg flex items-center justify-center relative">
                <div className="text-9xl opacity-20">✨</div>
                <div className="absolute top-4 left-4 bg-accent text-primary px-4 py-2 font-bold text-sm">
                  SALE
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gradient-to-br from-muted to-secondary rounded-lg flex items-center justify-center cursor-pointer hover:border-2 hover:border-primary transition-all"
                  >
                    <div className="text-4xl opacity-20">✨</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-body tracking-widest text-muted-foreground uppercase">
                    {product.category}
                  </p>
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
                    {product.name}
                  </h1>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 py-4 border-y border-border">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg text-accent">
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-body text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-primary">${product.price}</span>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="text-sm font-bold text-accent">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4 border-b border-border pb-6">
                <p className="font-body text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <label className="block font-display font-bold text-primary">Select Size</label>
                <div className="grid grid-cols-2 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 border-2 font-body font-medium transition-all ${
                        selectedSize === size
                          ? 'border-accent bg-accent/10 text-primary'
                          : 'border-border text-foreground hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-4 border-b border-border pb-6">
                <label className="block font-display font-bold text-primary">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 border border-border hover:border-primary transition-colors"
                  >
                    −
                  </button>
                  <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 border border-border hover:border-primary transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <button className="w-full bg-primary text-primary-foreground py-4 font-body font-bold text-lg hover:bg-primary/90 transition-colors">
                  Add to Cart
                </button>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`flex-1 py-4 border-2 font-body font-bold transition-all ${
                      isFavorited
                        ? 'border-accent bg-accent text-primary'
                        : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 inline mr-2 ${isFavorited ? 'fill-current' : ''}`}
                    />
                    Favorite
                  </button>
                  <button className="flex-1 py-4 border-2 border-primary text-primary font-body font-bold hover:bg-primary hover:text-primary-foreground transition-all">
                    <Share2 className="w-5 h-5 inline mr-2" />
                    Share
                  </button>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-3 border-t border-border pt-6">
                <div className="flex items-start gap-4">
                  <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-body font-medium text-primary">Free Shipping</p>
                    <p className="text-sm text-muted-foreground">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <RotateCw className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-body font-medium text-primary">Easy Returns</p>
                    <p className="text-sm text-muted-foreground">30-day return policy</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-body font-medium text-primary">Secure Checkout</p>
                    <p className="text-sm text-muted-foreground">Protected transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-20 pt-12 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-display text-2xl font-bold text-primary mb-6">Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-accent font-bold mt-1">✓</span>
                      <span className="font-body text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-primary mb-6">
                  Product Care
                </h3>
                <ul className="space-y-3 font-body text-muted-foreground">
                  <li>
                    <strong className="text-primary">Cleaning:</strong> Gently wipe with a soft cloth
                  </li>
                  <li>
                    <strong className="text-primary">Storage:</strong> Keep in the included jewelry box
                  </li>
                  <li>
                    <strong className="text-primary">Avoid:</strong> Excessive water exposure and harsh chemicals
                  </li>
                  <li>
                    <strong className="text-primary">Durability:</strong> With proper care, lasts for years
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-20">
            <h2 className="font-display text-3xl font-bold text-primary mb-12">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((item) => (
                <Link key={item.id} href={`/product/${item.id}`}>
                  <div className="group cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-muted to-secondary rounded-lg mb-4 group-hover:scale-105 transition-transform">
                      <div className="w-full h-full flex items-center justify-center text-6xl opacity-30">
                        ✨
                      </div>
                    </div>
                    <h3 className="font-display text-lg font-bold text-primary group-hover:text-accent transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-lg font-bold text-primary mt-2">${item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
