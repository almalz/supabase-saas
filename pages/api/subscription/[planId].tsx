import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'
import { definitions } from '../../../types/supabase'

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

  res.send({ ...user, stripe_customer: data?.stripe_customer })
}

export default handler
