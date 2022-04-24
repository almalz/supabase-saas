import { useEffect } from 'react'
import { useAuth } from '../context/user'

const Logout = () => {
  const {logout} = useAuth()
  useEffect(logout
  , [])

  return <div>Logging out</div>
}

export default Logout
