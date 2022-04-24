import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { supabase } from '../../lib/supabase'
import { definitions } from '../../types/supabase'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if(req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET){
    return res.status(401).send("You are not authorized to call the API")
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
    typescript: true,
  })

  const customer = await stripe.customers.create({
    email: req.body.record.email,
  })

  await supabase
    .from<definitions['profile']>('profile')
    .update({
      stripe_customer: customer.id,
    })
    .eq('id', req.body.record.id)

  res.send({ message: 'stripe customer was created', customer })
}

export default handler
