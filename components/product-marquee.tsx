'use client';

import { useState } from 'react';

export function ProductMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  const products = [
    { name: 'Classic Pearl Necklace', price: '₹599', tag: 'Best Seller' },
    { name: 'Gold Chain Bracelet', price: '₹399', tag: 'New' },
    { name: 'Diamond Studs', price: '₹499', tag: 'Trending' },
    { name: 'Elegant Ring Set', price: '₹799', tag: 'Limited' },
    { name: 'Vintage Pendant', price: '₹549', tag: 'Sale' },
    { name: 'Statement Earrings', price: '₹449', tag: 'Popular' },
    { name: 'Rose Gold Bangle', price: '₹649', tag: 'New' },
    { name: 'Crystal Choker', price: '₹699', tag: 'Exclusive' },
  ];

  // Duplicate products for seamless loop
  const duplicatedProducts = [...products, ...products];

  return (
    <div
      className="w-full overflow-hidden bg-gradient-to-r from-white via-secondary to-white py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`flex gap-6 ${isPaused ? '' : 'animate-marquee'}`}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {duplicatedProducts.map((product, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-80 bg-secondary rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
          >
            {/* Product Image Area */}
            <div className="relative aspect-square bg-gradient-to-br from-muted to-secondary flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <div className="text-5xl opacity-30 group-hover:opacity-50 transition-opacity">✨</div>
              <div className="absolute top-3 right-3 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">
                {product.tag}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col justify-between">
              <h3 className="font-display text-sm font-bold text-primary group-hover:text-accent transition-colors line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-center justify-between pt-3 border-t border-border mt-3">
                <span className="text-base font-bold text-primary">{product.price}</span>
                <button className="text-xs font-body font-medium text-accent hover:text-primary transition-colors">
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
