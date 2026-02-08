'use client';

import { Heart, Share2, Truck, RotateCw, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProductById, getProductReviews } from '@/lib/api';

import { useCart } from '@/context/cart-context';

export function ProductDetailClient({ id }: { id: string }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.original_price,
      quantity: quantity,
      image: product.images?.[0] || product.image, // Handle both array and string
      maxQuantity: product.stock_quantity
    });
  };

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);
        // Ensure ID is decoded
        const decodedId = decodeURIComponent(id);
        console.log('Loading product with ID:', decodedId);
        
        const [productData, reviewsData] = await Promise.all([
          getProductById(decodedId),
          getProductReviews(decodedId)
        ]);
        setProduct(productData);
        setReviews(reviewsData);
      } catch (err: any) {
        console.error('Error loading product:', err);
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gray-200 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Product Not Found</h1>
          <p className="mb-4 text-muted-foreground">ID: {id}</p>
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md max-w-md mx-auto">
              <p className="font-bold">Error Details:</p>
              <p>{error}</p>
            </div>
          )}
          <Link href="/catalog" className="text-accent hover:underline">
            Return to Catalog
          </Link>
        </div>
      </main>
    );
  }

  const discount = product.original_price 
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const relatedProducts = [
    { id: '2', name: 'Crystal Drop Earrings', price: 29.99 },
    { id: '3', name: 'Gold Bangle Bracelet', price: 39.99 },
    { id: '5', name: 'Three Piece Jewelry Set', price: 79.99 },
  ];

  return (
    <main className="min-h-screen">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-muted to-secondary rounded-lg flex items-center justify-center relative">
              <div className="text-9xl opacity-20">✨</div>
              {/* Sale Tag */}
              {(discount > 0) && (
                 <div className="absolute top-4 left-4 bg-accent text-white px-4 py-2 font-bold text-sm">
                   SALE
                 </div>
              )}
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
                <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 py-4 border-y border-border">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-accent' : 'text-gray-300'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm font-body text-muted-foreground">
                  {product.rating} ({product.review_count || reviews.length} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-display font-bold text-primary">
                    ₹{product.price}
                  </span>
                  {product.original_price && (
                    <>
                      <span className="text-2xl font-body text-muted-foreground line-through">
                        ₹{product.original_price}
                      </span>
                      <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                        {discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className={`text-sm font-medium ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4 border-b border-border pb-6">
              <p className="font-body text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4 border-b border-border pb-6">
              <label className="block font-display font-bold text-primary">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border-2 border-border font-bold hover:bg-secondary transition-colors disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className="text-xl font-bold w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  className="w-12 h-12 border-2 border-border font-bold hover:bg-secondary transition-colors disabled:opacity-50"
                  disabled={quantity >= product.stock_quantity}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground py-4 font-body font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={product.stock_quantity === 0}
              >
                {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className="w-14 h-14 border-2 border-border hover:bg-secondary transition-colors flex items-center justify-center"
              >
                <Heart className={isFavorited ? 'fill-accent text-accent' : ''} />
              </button>
              <button className="w-14 h-14 border-2 border-border hover:bg-secondary transition-colors flex items-center justify-center">
                <Share2 />
              </button>
            </div>

            {/* Benefits */}
            <div className="space-y-3 border-t border-border pt-6">
              <div className="flex items-start gap-4">
                <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-body font-medium text-primary">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">On orders over ₹500</p>
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
              <h3 className="font-display text-2xl font-bold text-primary mb-6">
                Product Details
              </h3>
              <ul className="space-y-4 text-muted-foreground">
                <li>
                  <strong className="text-primary">Material:</strong> Premium brass with gold plating
                </li>
                <li>
                  <strong className="text-primary">Stone:</strong> Cubic Zirconia / Imitation Pearl
                </li>
                <li>
                  <strong className="text-primary">Plating:</strong> 18K Gold Plated
                </li>
                <li>
                  <strong className="text-primary">Closure:</strong> Secure lobster clasp or push back
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
                  <p className="text-lg font-bold text-primary mt-2">₹{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
