'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CatalogFilters } from '@/components/catalog-filters';
import { ProductCard } from '@/components/product-card';
import { useState } from 'react';

const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Classic Pearl Necklace',
    price: 49.99,
    category: 'Necklaces',
    rating: 4.8,
    isNew: true,
  },
  {
    id: '2',
    name: 'Crystal Drop Earrings',
    price: 29.99,
    category: 'Earrings',
    rating: 4.6,
    isNew: true,
  },
  {
    id: '3',
    name: 'Gold Bangle Bracelet',
    price: 39.99,
    category: 'Bracelets',
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Elegant Statement Ring',
    price: 34.99,
    category: 'Rings',
    rating: 4.5,
  },
  {
    id: '5',
    name: 'Three Piece Jewelry Set',
    price: 79.99,
    category: 'Sets',
    rating: 4.9,
    isNew: true,
  },
  {
    id: '6',
    name: 'Geometric Pendant Necklace',
    price: 44.99,
    category: 'Necklaces',
    rating: 4.4,
  },
  {
    id: '7',
    name: 'Vintage Inspired Bracelet',
    price: 54.99,
    category: 'Bracelets',
    rating: 4.7,
  },
  {
    id: '8',
    name: 'Cubic Zirconia Studs',
    price: 24.99,
    category: 'Earrings',
    rating: 4.6,
  },
  {
    id: '9',
    name: 'Cocktail Ring',
    price: 59.99,
    category: 'Rings',
    rating: 4.8,
  },
];

export default function CatalogPage() {
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);

  const handleFilterChange = (filters: any) => {
    // Filter logic would go here
    console.log('Filters applied:', filters);
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Page Header */}
      <div className="pt-24 pb-12 bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <p className="text-sm font-body tracking-widest text-muted-foreground uppercase">
              Explore Our Collection
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-primary">
              Products
            </h1>
            <p className="font-body text-muted-foreground max-w-2xl">
              Discover our carefully curated selection of luxury imitation jewelry, each piece
              designed to elevate your style.
            </p>
          </div>
        </div>
      </div>

      {/* Catalog Section */}
      <div className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-primary mb-4">Filter</h3>
                  <CatalogFilters onFilterChange={handleFilterChange} />
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Results Info */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                <p className="text-sm font-body text-muted-foreground">
                  Showing <span className="font-bold">{products.length}</span> products
                </p>
                <div className="text-sm font-body text-muted-foreground">
                  View as:{' '}
                  <button className="ml-2 text-primary hover:text-accent font-medium">
                    Grid
                  </button>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>

              {/* Load More */}
              <div className="mt-16 text-center">
                <button className="px-8 py-4 border border-primary text-primary font-body font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
                  Load More Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
