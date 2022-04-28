import type { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro'
import Stripe from 'stripe'

export const config = { api: { bodyParser: false } }

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2020-08-27',
    typescript: true,
  })

  const signature = req.headers['stripe-signature']!
  const signingSecret = process.env.STRIPE_SIGNING_SECRET!
  const buf = await buffer(req)

  let event

  try {
    event = stripe.webhooks.constructEvent(buf, signature, signingSecret)
  } catch (error) {
    console.error(error)
    return res.status(400).send(`Webhook error: ${error}`)
  }

  console.log({ event })
  res.status(200).json({ received: true })
}

export default handler
