'use server'

import Stripe from 'stripe'

import { CartProduct } from '../contexts/cart'

interface CreateStripeCheckoutInput {
  products: CartProduct[]
  orderId: number
}

export default async function createStripeCheckout({
  products,
  orderId
}: CreateStripeCheckoutInput) {
  if(!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing Stripe secret key')
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-02-24.acacia'
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment', 
    cancel_url: 'http://localhost:3000',
    success_url: 'http://localhost:3000',
    metadata: {
      orderId,
    },
    line_items: products.map(product => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: product.name,
          images: [product.imageUrl]
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity
    }))
  })

  return { sessionId: session.id}
}
