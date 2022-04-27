import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'
import { definitions } from '../../../types/supabase'
import Stripe from 'stripe'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return res.status(401).send('Unauthorized')
  }

  const access_token = req.cookies['sb-access-token']

  supabase.auth.setAuth(access_token)

  const { data } = await supabase
    .from<definitions['profile']>('profile')
    .select('stripe_customer')
    .eq('id', user.id)
    .single()

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
    typescript: true,
  })
  const { priceId } = req.query

  const lineItems = [
    {
      price: priceId as string,
      quantity: 1,
    },
  ]

  console.log({ priceId })

  const session = await stripe.checkout.sessions.create({
    customer: data?.stripe_customer,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: lineItems,
    success_url: 'http://localhost:3000/payment/success',
    cancel_url: 'http://localhost:3000/payment/cancelled',
  })

  res.send({ id: session.id })
}

export default handler
