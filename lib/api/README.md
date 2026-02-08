# API Functions Reference

## 📦 Available API Functions

All API functions are organized by feature:

### Products (`lib/api/products.ts`)
```typescript
import { getProducts, getProductById, getFeaturedProducts } from '@/lib/api'

// Get all products
const products = await getProducts()

// Get products with filters
const necklaces = await getProducts({ category: 'Necklaces', limit: 10 })

// Get single product
const product = await getProductById('product-id')

// Get featured products
const featured = await getFeaturedProducts(6)

// Search products
const results = await searchProducts('pearl')
```

### Categories (`lib/api/products.ts`)
```typescript
import { getCategories, getCategoryBySlug } from '@/lib/api'

// Get all categories
const categories = await getCategories()

// Get category by slug
const category = await getCategoryBySlug('necklaces')
```

### Cart (`lib/api/products.ts`)
```typescript
import { getCartItems, addToCart, updateCartItemQuantity, removeFromCart, clearCart } from '@/lib/api'

// Get cart items
const cartItems = await getCartItems(userId)

// Add to cart
await addToCart(userId, productId, quantity, size)

// Update quantity
await updateCartItemQuantity(itemId, newQuantity)

// Remove item
await removeFromCart(itemId)

// Clear cart
await clearCart(userId)
```

### Wishlist (`lib/api/products.ts`)
```typescript
import { getWishlist, addToWishlist, removeFromWishlist, isInWishlist } from '@/lib/api'

// Get wishlist
const wishlist = await getWishlist(userId)

// Add to wishlist
await addToWishlist(userId, productId)

// Remove from wishlist
await removeFromWishlist(userId, productId)

// Check if in wishlist
const inWishlist = await isInWishlist(userId, productId)
```

### Authentication (`lib/api/auth.ts`)
```typescript
import { signUp, signIn, signOut, getCurrentUser, resetPassword } from '@/lib/api'

// Sign up
await signUp(email, password, fullName)

// Sign in
await signIn(email, password)

// Sign out
await signOut()

// Get current user
const user = await getCurrentUser()

// Reset password
await resetPassword(email)

// Sign in with Google
await signInWithGoogle()
```

### User Profile (`lib/api/auth.ts`)
```typescript
import { getUserProfile, updateUserProfile, isAdmin } from '@/lib/api'

// Get profile
const profile = await getUserProfile(userId)

// Update profile
await updateUserProfile(userId, { full_name: 'John Doe', phone: '1234567890' })

// Check if admin
const admin = await isAdmin(userId)
```

### Orders (`lib/api/orders.ts`)
```typescript
import { createOrder, getOrders, getOrderById, updateOrderStatus } from '@/lib/api'

// Create order
const order = await createOrder({
  userId,
  items: [...],
  shippingAddress: {...},
  subtotal,
  shippingCost,
  tax,
  total
})

// Get user orders
const orders = await getOrders(userId)

// Get single order
const order = await getOrderById(orderId)

// Update order status
await updateOrderStatus(orderId, 'shipped')
```

### Promo Codes (`lib/api/orders.ts`)
```typescript
import { validatePromoCode, applyPromoCode } from '@/lib/api'

// Validate promo code
const promoCode = await validatePromoCode('SAVE20')

// Apply promo code
const discount = await applyPromoCode('SAVE20', subtotal)
```

### Reviews (`lib/api/products.ts`)
```typescript
import { getProductReviews, addReview } from '@/lib/api'

// Get product reviews
const reviews = await getProductReviews(productId)

// Add review
await addReview(userId, productId, rating, title, comment)
```

### Newsletter (`lib/api/products.ts`)
```typescript
import { subscribeToNewsletter } from '@/lib/api'

// Subscribe to newsletter
await subscribeToNewsletter(email)
```

---

## 🎯 Usage Examples

### Example 1: Display Products on Homepage
```typescript
'use client'

import { useEffect, useState } from 'react'
import { getFeaturedProducts } from '@/lib/api'

export default function HomePage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function loadProducts() {
      const data = await getFeaturedProducts(6)
      setProducts(data)
    }
    loadProducts()
  }, [])

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  )
}
```

### Example 2: Add to Cart
```typescript
'use client'

import { addToCart, getCurrentUser } from '@/lib/api'
import { toast } from 'sonner'

export function AddToCartButton({ productId }: { productId: string }) {
  const handleAddToCart = async () => {
    try {
      const user = await getCurrentUser()
      if (!user) {
        toast.error('Please sign in to add items to cart')
        return
      }

      await addToCart(user.id, productId, 1)
      toast.success('Added to cart!')
    } catch (error) {
      toast.error('Failed to add to cart')
    }
  }

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  )
}
```

### Example 3: User Authentication
```typescript
'use client'

import { signIn } from '@/lib/api'
import { useState } from 'react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await signIn(email, password)
      // Redirect to dashboard
      window.location.href = '/dashboard'
    } catch (error) {
      alert('Invalid credentials')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
    </form>
  )
}
```

---

## ✅ All Functions Created!

You now have complete API coverage for:
- ✅ Products & Categories
- ✅ Shopping Cart
- ✅ Wishlist
- ✅ User Authentication
- ✅ User Profiles
- ✅ Orders & Checkout
- ✅ Promo Codes
- ✅ Reviews
- ✅ Newsletter

**Next Steps:**
1. Update your frontend components to use these API functions
2. Replace mock data with real database data
3. Add authentication to your pages
