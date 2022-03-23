import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

const Login = () => {
  useEffect(() => {
    supabase.auth.signIn({
      provider: 'github',
    })
  }, [])

  return <div>Logging in</div>
}

export default Login
