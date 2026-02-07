'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  rating?: number;
  isNew?: boolean;
}

export function ProductCard({
  id,
  name,
  price,
  category,
  rating = 4.5,
  isNew = false,
}: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="group">
      <div className="relative overflow-hidden bg-gradient-to-br from-muted to-secondary aspect-square rounded-lg mb-4">
        {/* Product Image Area */}
        <div className="w-full h-full flex items-center justify-center text-6xl opacity-30 group-hover:scale-110 transition-transform duration-300">
          ✨
        </div>

        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {isNew && (
            <div className="bg-accent text-primary px-3 py-1 text-xs font-bold">NEW</div>
          )}
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
              isFavorited
                ? 'bg-accent text-primary'
                : 'bg-white text-primary hover:bg-accent hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
          <Link
            href={`/product/${id}`}
            className="px-6 py-3 bg-white text-primary font-body font-bold hover:bg-accent hover:text-white transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <p className="text-xs font-body tracking-widest text-muted-foreground uppercase">
          {category}
        </p>
        <Link href={`/product/${id}`}>
          <h3 className="font-display text-lg font-bold text-primary group-hover:text-accent transition-colors">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xs ${i < Math.floor(rating) ? 'text-accent' : 'text-muted'}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({Math.round(rating * 10) / 10})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
          <button className="text-xs font-body font-medium text-primary hover:text-accent transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
