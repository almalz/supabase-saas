import { GetStaticProps, NextPage } from 'next'
import Stripe from 'stripe'

type PricingPageProps = {
  // prices: Stripe.Price[]
  plans: Plan[] | undefined
}

type Plan = {
  id: string,
  name: string,
  price: number,
  interval: Stripe.Price.Recurring.Interval
  currency: string
}

const Pricing: NextPage<PricingPageProps> = ({plans}) => {
  return (
    <div className='w-full max-w-3xl mx-auto py-16 flex justify-arround'>
      {plans?.map(plan => (
        <div key={plan.id} className="w-80 h-40 rounded shadow px-6 py-6">
          <h2 className="text-xl">{plan.name}</h2>
          <p className="text-gray-500">{plan.price / 100} {plan.currency}/ {plan.interval}</p>
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

  const {data: prices} = await stripe.prices.list()

  const plans = await Promise.all(prices.map(async (price) => {
    if(price.product){
      const product = await stripe.products.retrieve(price.product as string)
      return {id: price.id, name: product.name, price: price.unit_amount, interval: price.recurring?.interval, currency: price.currency}
    }
  }))

  const sortedPlans = plans.sort((a,b) => (a?.price || 0) - (b?.price || 0))

  return {
    props: {
      plans: sortedPlans
    }
  }

}

export default Pricing