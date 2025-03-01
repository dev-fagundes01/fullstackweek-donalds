import { NextResponse } from 'next/server'
import Stripe from 'stripe';

import { db } from '@/lib/prisma';

export async function POST(req: Request) {
  if(!process.env.STRIPE_WEBHOOK_SECRET_KEY) {
    return new Error('Missing Stripe secret key')
  }

  const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET_KEY, {
    apiVersion: '2025-02-24.acacia'
  })

  const signature = req.headers.get('stripe-signature')
  if(!signature) return NextResponse.error(); 

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY
  if(!webhookSecret) {
    throw new Error('Missing stripe webhook secret key')
  }

  const text = await req.text()
  const event = stripe.webhooks.constructEvent(text, signature, webhookSecret)

  const paymentIsSuccessful = event.type === 'checkout.session.completed'
  if (paymentIsSuccessful) {
    const orderId = event.data.object.metadata?.orderId

    if(!orderId) {
      return NextResponse.json({received: true})
    }

    await db.order.update({
      where: {id: Number(orderId)},
      data: {status: 'PAYMENT_CONFIRMED'}
    })
  }

  return NextResponse.json({received: true})
}