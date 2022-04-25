import { useEffect } from 'react'
import { useAuth } from '../context/auth'

const Logout = () => {
  const { logout } = useAuth()
  useEffect(logout, [])

  return <div>Logging out</div>
}

export default Logout
