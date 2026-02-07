'use client';

import { Suspense } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { useSearchParams } from 'next/navigation';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // Mock search results - in production, this would query a database
  const results = [
    { id: 1, name: 'Statement Necklace Gold', price: 49.99, category: 'Necklaces' },
    { id: 2, name: 'Diamond Earrings', price: 89.99, category: 'Earrings' },
    { id: 3, name: 'Pearl Necklace', price: 59.99, category: 'Necklaces' },
    { id: 4, name: 'Gold Bracelet', price: 39.99, category: 'Bracelets' },
  ].filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2 text-balance">
            Search Results
          </h1>
          <p className="text-lg text-muted-foreground">
            {results.length > 0 ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"` : `No results found for "${query}"`}
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-body text-lg text-muted-foreground mb-6">
              We couldn't find any products matching your search. Try different keywords or browse our catalog.
            </p>
            <a
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-body font-medium hover:bg-primary/90 transition-colors"
            >
              View All Products
            </a>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
