import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'
import { definitions } from '../../types/supabase'
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

  const stripe_customer = data?.stripe_customer

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
    typescript: true,
  })

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: stripe_customer!,
    return_url: 'http://localhost:3000/dashboard',
  })

  res.send({
    url: portalSession.url,
  })
}

export default handler
