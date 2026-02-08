'use client';

import { CatalogFilters } from '@/components/catalog-filters';
import { ProductCard } from '@/components/product-card';
import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '@/lib/api';

export default function CatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Load products and categories from Supabase
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setAllProducts(productsData);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter products by category
  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      setProducts(allProducts.filter(p => p.category === category));
    } else {
      setProducts(allProducts);
    }
  };

  const handleFilterChange = (filters: any) => {
    // Filter logic would go here
    console.log('Filters applied:', filters);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-body tracking-widest text-muted-foreground uppercase mb-4">
            Shop Our Collections
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary text-balance">
            Curated Elegance
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <CatalogFilters 
              categories={categories} 
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryFilter}
            />
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="space-y-8">
              {/* Sort & Results Count */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-8 border-b border-border">
                <p className="font-body text-muted-foreground">
                  Showing <span className="font-bold text-primary">{products.length}</span> results
                </p>
                <div className="flex items-center gap-4">
                  <span className="font-body text-sm font-medium text-muted-foreground">Sort by:</span>
                  <select className="bg-transparent border-none font-body font-medium text-primary focus:ring-0 cursor-pointer">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                  </select>
                </div>
              </div>

              {/* Products */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground">No products found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              )}

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
    </main>
  );
}
