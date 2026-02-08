'use client'

import { useEffect, useState } from 'react'
import { getProducts, getCategories, getFeaturedProducts } from '@/lib/api'

export default function TestPage() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [featured, setFeatured] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        
        // Test all API functions
        const [productsData, categoriesData, featuredData] = await Promise.all([
          getProducts(),
          getCategories(),
          getFeaturedProducts(3)
        ])

        setProducts(productsData)
        setCategories(categoriesData)
        setFeatured(featuredData)
        setError(null)
      } catch (err: any) {
        console.error('Error loading data:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading data from Supabase...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-bold text-xl mb-2">❌ Error</h2>
          <p className="text-red-600">{error}</p>
          <p className="text-sm text-red-500 mt-4">
            Make sure your .env.local file has the correct Supabase credentials.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            ✅ Supabase Connection Successful!
          </h1>
          <p className="text-gray-600">
            Your API functions are working correctly. Here's the data from your database:
          </p>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">📂 Categories ({categories.length})</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="border rounded-lg p-4 text-center">
                <p className="font-semibold">{category.name}</p>
                <p className="text-sm text-gray-500">{category.slug}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">⭐ Featured Products ({featured.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((product) => (
              <div key={product.id} className="border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    {product.original_price && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ${product.original_price}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-yellow-500">⭐ {product.rating}</span>
                  <span className="text-gray-500 ml-2">({product.review_count} reviews)</span>
                </div>
                <div className="mt-2">
                  <span className={`text-sm ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Products */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">🛍️ All Products ({products.length})</h2>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Category: {product.category} | SKU: {product.sku || 'N/A'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">${product.price}</p>
                    {product.original_price && (
                      <p className="text-sm text-gray-400 line-through">${product.original_price}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
          <h3 className="text-green-800 font-bold text-lg mb-2">🎉 Everything is working!</h3>
          <p className="text-green-700">
            Your Supabase backend is connected and all API functions are operational.
          </p>
          <p className="text-green-600 mt-2">
            Next step: Update your frontend pages to use these API functions instead of mock data.
          </p>
        </div>
      </div>
    </div>
  )
}
