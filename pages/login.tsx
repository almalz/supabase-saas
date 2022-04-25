import { useEffect } from 'react'
import { useAuth } from '../context/auth'

const Login = () => {
  const { login } = useAuth()
  useEffect(login, [])

  return <div>Logging in</div>
}

export default Login
