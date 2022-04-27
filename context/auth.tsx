import { Session, User } from '@supabase/supabase-js'
import React, { createContext, useState, useEffect, useContext } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/router'
import { definitions } from '../types/supabase'

type UserData = User & definitions['profile']
type AuthProvider = { children: React.ReactNode }
type AuthConext = {
  user: UserData | null
  session: Session | null
  setUser: (user: UserData) => void
  login: () => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthConext | undefined>(undefined)

const AuthProvider = ({ children }: AuthProvider) => {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(supabase.auth.user())
  const [session, setSession] = useState<Session | null>(
    supabase.auth.session()
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user()
      if (sessionUser) {
        const { data: profile } = await supabase
          .from<definitions['profile']>('profile')
          .select('*')
          .eq('id', sessionUser.id)
          .single()
        setUser({ ...sessionUser, ...profile })

        setIsLoading(false)
      }
    }

    getUserProfile()

    supabase.auth.onAuthStateChange(() => {
      getUserProfile()
      setSession(supabase.auth.session())
    })
  }, [])

  useEffect(() => {
    const event = (user ? 'SIGNED_IN' : 'SIGNED_OUT') as string
    fetch(`/api/set-supabase-cookie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: event,
        session: session,
      }),
    })
  }, [session, user])

  const login = async () => {
    await supabase.auth
      .signIn({
        provider: 'github',
      })
      .catch((err) => console.error(err))
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  const value = { user, session, setUser, login, logout, isLoading }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContext')
  }
  return context
}

export { AuthProvider, useAuth }
