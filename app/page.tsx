'use client';

import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { ProductMarquee } from '@/components/product-marquee';
import { useEffect, useState } from 'react';
import { getFeaturedProducts } from '@/lib/api';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const products = await getFeaturedProducts(3);
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setLoading(false);
      }
    }
    loadFeaturedProducts();
  }, []);

  return (
    <main className="min-h-screen">
      <Hero />
      
      {/* Featured Collections Preview */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-body tracking-widest text-muted-foreground uppercase mb-4">
              Featured Collection
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary text-balance">
              Latest Arrivals
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="animate-pulse">
                  <div className="bg-gray-200 h-80 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.original_price}
                  category={product.category}
                  isNew={new Date(product.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-body font-medium hover:bg-primary/90 transition-colors"
            >
              View All Collections
            </Link>
          </div>
        </div>
      </section>

      <Features />

      {/* Why Choose Zeaver Section */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        {/* Faded background images */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <p className="text-sm font-body tracking-widest text-muted-foreground uppercase mb-4">
              What Sets Us Apart
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary text-balance">
              The Zeaver Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-8 animate-slide-in-left">
              {[
                {
                  icon: '✓',
                  title: 'Premium Quality Materials',
                  description: 'Sourced from trusted suppliers worldwide, every material meets our strict quality standards.'
                },
                {
                  icon: '✓',
                  title: 'Expert Artisan Craftsmanship',
                  description: 'Handcrafted by skilled artisans with decades of jewelry-making experience.'
                },
                {
                  icon: '✓',
                  title: 'Sustainable & Ethical',
                  description: 'Committed to environmentally friendly practices and fair trade partnerships.'
                },
                {
                  icon: '✓',
                  title: 'Lifetime Warranty',
                  description: 'Every piece comes with our lifetime craftsmanship guarantee.'
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl group-hover:bg-accent group-hover:text-white transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-primary mb-2">{item.title}</h3>
                    <p className="font-body text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right side - Visual */}
            <div className="relative animate-slide-in-right">
              <div className="aspect-square bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg flex items-center justify-center">
                <div className="text-9xl opacity-20">💎</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-body tracking-widest text-muted-foreground uppercase mb-4">
              Customer Reviews
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary text-balance">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                rating: 5,
                review: 'Absolutely stunning pieces! The quality exceeded my expectations. I get compliments every time I wear them.'
              },
              {
                name: 'Emily Chen',
                rating: 5,
                review: 'Beautiful craftsmanship and elegant designs. The customer service was exceptional too!'
              },
              {
                name: 'Michael Rodriguez',
                rating: 5,
                review: 'Perfect gift for my wife. She loved the necklace! Fast shipping and beautiful packaging.'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-accent text-xl">★</span>
                  ))}
                </div>
                <p className="font-body text-muted-foreground mb-6 italic">"{testimonial.review}"</p>
                <p className="font-display font-bold text-primary">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-90"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-balance">
            Ready to Find Your Perfect Piece?
          </h2>
          <p className="font-body text-lg mb-8 text-primary-foreground/90 text-balance">
            Explore our curated collection of handcrafted jewelry designed to make every moment special.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 font-body font-medium hover:bg-white/90 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 font-body font-medium hover:bg-white hover:text-primary transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <ProductMarquee />
    </main>
  );
}
