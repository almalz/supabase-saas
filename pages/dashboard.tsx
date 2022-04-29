import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useAuth } from '../context/auth'
import { supabase } from '../lib/supabase'

const Dashboard = () => {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  const loadPortal = async () => {
    const res = await fetch('/api/portal')
    const data = await res.json()
    router.push(data?.url)
  }

  return (
    <div className="mx-auto w-full max-w-3xl py-16 px-8">
      <h1 className="mb-6 text-3xl">Dashboard</h1>
      {!isLoading && (
        <>
          <p className="mb-6">
            {user?.is_subscribed
              ? `Subscribed: ${user.interval}`
              : 'Not subscribed'}
          </p>
          <button onClick={loadPortal}>Manage Subscription</button>
        </>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }

  return {
    props: {},
  }
}

export default Dashboard
