import { createClient } from '@/lib/supabase/client'

// ============================================
// ORDERS API
// ============================================

export interface CreateOrderData {
  userId?: string
  items: Array<{
    productId: string
    productName: string
    productPrice: number
    quantity: number
    size?: string
  }>
  shippingAddress: {
    name: string
    email: string
    phone?: string
    address: string
    city: string
    state: string
    postalCode: string
    country?: string
  }
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  stripePaymentIntentId?: string
}

export async function createOrder(orderData: CreateOrderData) {
  const supabase = createClient()
  
  // Generate order number
  const { data: orderNumberData } = await supabase
    .rpc('generate_order_number')
  
  const orderNumber = orderNumberData || `ZV${Date.now()}`

  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: orderData.userId || null,
      order_number: orderNumber,
      status: 'pending',
      subtotal: orderData.subtotal,
      shipping_cost: orderData.shippingCost,
      tax: orderData.tax,
      total: orderData.total,
      shipping_name: orderData.shippingAddress.name,
      shipping_email: orderData.shippingAddress.email,
      shipping_phone: orderData.shippingAddress.phone,
      shipping_address: orderData.shippingAddress.address,
      shipping_city: orderData.shippingAddress.city,
      shipping_state: orderData.shippingAddress.state,
      shipping_postal_code: orderData.shippingAddress.postalCode,
      shipping_country: orderData.shippingAddress.country || 'India',
      payment_status: orderData.stripePaymentIntentId ? 'paid' : 'pending',
      stripe_payment_intent_id: orderData.stripePaymentIntentId
    })
    .select()
    .single()

  if (orderError) {
    console.error('Error creating order:', orderError)
    throw orderError
  }

  // Create order items
  const orderItems = orderData.items.map(item => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.productName,
    product_price: item.productPrice,
    quantity: item.quantity,
    size: item.size,
    subtotal: item.productPrice * item.quantity
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) {
    console.error('Error creating order items:', itemsError)
    throw itemsError
  }

  return order
}

export async function getOrders(userId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    throw error
  }

  return data
}

export async function getOrderById(orderId: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('id', orderId)
    .single()

  if (error) {
    console.error('Error fetching order:', error)
    throw error
  }

  return data
}

export async function getOrderByNumber(orderNumber: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .eq('order_number', orderNumber)
    .single()

  if (error) {
    console.error('Error fetching order:', error)
    throw error
  }

  return data
}

export async function updateOrderStatus(
  orderId: string,
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single()

  if (error) {
    console.error('Error updating order status:', error)
    throw error
  }

  return data
}

export async function updatePaymentStatus(
  orderId: string,
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded',
  stripePaymentIntentId?: string
) {
  const supabase = createClient()
  
  const updates: any = { payment_status: paymentStatus }
  if (stripePaymentIntentId) {
    updates.stripe_payment_intent_id = stripePaymentIntentId
  }

  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', orderId)
    .select()
    .single()

  if (error) {
    console.error('Error updating payment status:', error)
    throw error
  }

  return data
}

// ============================================
// PROMO CODES API
// ============================================

export async function validatePromoCode(code: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('promo_codes')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('is_active', true)
    .single()

  if (error) {
    throw new Error('Invalid promo code')
  }

  // Check if expired
  if (data.valid_until && new Date(data.valid_until) < new Date()) {
    throw new Error('Promo code has expired')
  }

  // Check if max uses reached
  if (data.max_uses && data.current_uses >= data.max_uses) {
    throw new Error('Promo code has reached maximum uses')
  }

  return data
}

export async function applyPromoCode(code: string, subtotal: number) {
  const promoCode = await validatePromoCode(code)

  // Check minimum purchase
  if (promoCode.min_purchase && subtotal < promoCode.min_purchase) {
    throw new Error(`Minimum purchase of $${promoCode.min_purchase} required`)
  }

  // Calculate discount
  let discount = 0
  if (promoCode.discount_type === 'percentage') {
    discount = (subtotal * promoCode.discount_value) / 100
  } else {
    discount = promoCode.discount_value
  }

  return {
    code: promoCode.code,
    discount,
    discountType: promoCode.discount_type,
    discountValue: promoCode.discount_value
  }
}

export async function incrementPromoCodeUsage(code: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .rpc('increment', {
      table_name: 'promo_codes',
      row_id: code,
      column_name: 'current_uses'
    })

  if (error) {
    console.error('Error incrementing promo code usage:', error)
  }
}
