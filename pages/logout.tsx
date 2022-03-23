import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/router'

const Logout = () => {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut()
      router.push('/')
    }
    logout()
  }, [])

  return <div>Logging out</div>
}

export default Logout
