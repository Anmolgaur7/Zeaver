import { createClient } from '@/lib/supabase/client'

// ============================================
// PRODUCTS API
// ============================================

export async function getProducts(filters?: {
  category?: string
  featured?: boolean
  limit?: number
  offset?: number
}) {
  const supabase = createClient()
  
  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (filters?.category) {
    query = query.eq('category', filters.category)
  }

  if (filters?.featured) {
    query = query.eq('is_featured', true)
  }

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.offset) {
    query = query.range(
      filters.offset,
      filters.offset + (filters.limit || 10) - 1
    )
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    throw error
  }

  return data
}

export async function getProductById(id: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    throw error
  }

  return data
}

export async function getFeaturedProducts(limit: number = 6) {
  return getProducts({ featured: true, limit })
}

export async function getProductsByCategory(category: string, limit?: number) {
  return getProducts({ category, limit })
}

export async function searchProducts(searchQuery: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
    .limit(20)

  if (error) {
    console.error('Error searching products:', error)
    throw error
  }

  return data
}

// ============================================
// CATEGORIES API
// ============================================

export async function getCategories() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    throw error
  }

  return data
}

export async function getCategoryBySlug(slug: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching category:', error)
    throw error
  }

  return data
}

// ============================================
// CART API
// ============================================

export async function getOrCreateCart(userId: string) {
  const supabase = createClient()
  
  // Try to get existing cart
  let { data: cart, error } = await supabase
    .from('carts')
    .select('*')
    .eq('user_id', userId)
    .single()

  // If no cart exists, create one
  if (error || !cart) {
    const { data: newCart, error: createError } = await supabase
      .from('carts')
      .insert({ user_id: userId })
      .select()
      .single()

    if (createError) {
      console.error('Error creating cart:', createError)
      throw createError
    }

    cart = newCart
  }

  return cart
}

export async function getCartItems(userId: string) {
  const supabase = createClient()
  const cart = await getOrCreateCart(userId)

  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      products (*)
    `)
    .eq('cart_id', cart.id)

  if (error) {
    console.error('Error fetching cart items:', error)
    throw error
  }

  return data
}

export async function addToCart(
  userId: string,
  productId: string,
  quantity: number = 1,
  size?: string
) {
  const supabase = createClient()
  const cart = await getOrCreateCart(userId)

  // Check if item already exists
  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('*')
    .eq('cart_id', cart.id)
    .eq('product_id', productId)
    .eq('size', size || '')
    .maybeSingle()

  if (existingItem) {
    // Update quantity
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: existingItem.quantity + quantity })
      .eq('id', existingItem.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating cart item:', error)
      throw error
    }

    return data
  } else {
    // Add new item
    const { data, error } = await supabase
      .from('cart_items')
      .insert({
        cart_id: cart.id,
        product_id: productId,
        quantity,
        size
      })
      .select()
      .single()

    if (error) {
      console.error('Error adding to cart:', error)
      throw error
    }

    return data
  }
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  const supabase = createClient()
  
  if (quantity <= 0) {
    return removeFromCart(itemId)
  }

  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', itemId)
    .select()
    .single()

  if (error) {
    console.error('Error updating cart item:', error)
    throw error
  }

  return data
}

export async function removeFromCart(itemId: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', itemId)

  if (error) {
    console.error('Error removing from cart:', error)
    throw error
  }

  return true
}

export async function clearCart(userId: string) {
  const supabase = createClient()
  const cart = await getOrCreateCart(userId)

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('cart_id', cart.id)

  if (error) {
    console.error('Error clearing cart:', error)
    throw error
  }

  return true
}

// ============================================
// WISHLIST API
// ============================================

export async function getWishlist(userId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('wishlists')
    .select(`
      *,
      products (*)
    `)
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching wishlist:', error)
    throw error
  }

  return data
}

export async function addToWishlist(userId: string, productId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('wishlists')
    .insert({
      user_id: userId,
      product_id: productId
    })
    .select()
    .single()

  if (error) {
    console.error('Error adding to wishlist:', error)
    throw error
  }

  return data
}

export async function removeFromWishlist(userId: string, productId: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('wishlists')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)

  if (error) {
    console.error('Error removing from wishlist:', error)
    throw error
  }

  return true
}

export async function isInWishlist(userId: string, productId: string) {
  const supabase = createClient()
  
  const { data } = await supabase
    .from('wishlists')
    .select('id')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .maybeSingle()

  return !!data
}

// ============================================
// REVIEWS API
// ============================================

export async function getProductReviews(productId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching reviews:', error)
    throw error
  }

  return data
}

export async function addReview(
  userId: string,
  productId: string,
  rating: number,
  title: string,
  comment: string
) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      user_id: userId,
      product_id: productId,
      rating,
      title,
      comment
    })
    .select()
    .single()

  if (error) {
    console.error('Error adding review:', error)
    throw error
  }

  return data
}

// ============================================
// NEWSLETTER API
// ============================================

export async function subscribeToNewsletter(email: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email })
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      throw new Error('Email already subscribed')
    }
    console.error('Error subscribing to newsletter:', error)
    throw error
  }

  return data
}
