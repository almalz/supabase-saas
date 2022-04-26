import { GetStaticProps, NextPage } from 'next'
import Stripe from 'stripe'
import { useAuth } from '../context/auth'

type PricingPageProps = {
  plans: Plan[] | undefined
}

type Plan = {
  id: string
  name: string
  price: number
  interval: Stripe.Price.Recurring.Interval
  currency: string
}

const Pricing: NextPage<PricingPageProps> = ({ plans }) => {
  const { user, login, isLoading } = useAuth()

  const processSubscribtion = async (planId: string) => {
    const res = await fetch(`/api/subscription/${planId}`)
    const data = await res.json()
    console.log(data)
  }

  const showSubscribeButton = !!user && !user.is_subscribed
  const showCreateAccountButton = !user
  const showManageSubscriptionButton = !!user && user.is_subscribed

  return (
    <div className="justify-arround mx-auto flex w-full max-w-3xl py-16">
      {plans?.map((plan) => (
        <div key={plan.id} className="h-40 w-80 rounded px-6 py-6 shadow">
          <h2 className="text-xl">{plan.name}</h2>
          <p className="text-gray-500">
            {plan.price / 100} {plan.currency} / {plan.interval}
          </p>
          {!isLoading && (
            <>
              {showSubscribeButton && (
                <button onClick={() => processSubscribtion(plan.id)}>
                  Subscribe
                </button>
              )}
              {showCreateAccountButton && (
                <button onClick={login}>Create Account</button>
              )}
              {showManageSubscriptionButton && (
                <button>Manage Subscription</button>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2020-08-27',
    typescript: true,
  })

  const { data: prices } = await stripe.prices.list()

  const plans = await Promise.all(
    prices.map(async (price) => {
      if (price.product) {
        const product = await stripe.products.retrieve(price.product as string)
        return {
          id: price.id,
          name: product.name,
          price: price.unit_amount,
          interval: price.recurring?.interval,
          currency: price.currency,
        }
      }
    })
  )

  const sortedPlans = plans.sort((a, b) => (a?.price || 0) - (b?.price || 0))

  return {
    props: {
      plans: sortedPlans,
    },
  }
}

export default Pricing
