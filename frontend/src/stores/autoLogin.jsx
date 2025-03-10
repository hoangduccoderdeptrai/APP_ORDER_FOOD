import React from 'react'
import useAuth from './useAuth'
import { useState, useEffect } from 'react'
import user from '~/apis/user'
import { LoadingSpinner } from '~/components/ui/LoadingSpinner'

const AutoLogin = ({ children }) => {
  const { isAuth, login, logout, setUser } = useAuth()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (isAuth !== null) return

    async function fetchMe() {
      try {
        const res = await user.getMe()
        setUser(res.user)
        login()
      } catch (error) {
        logout()
      }
    }

    if (hydrated) {
      fetchMe()
    }
  }, [hydrated, login, logout, setUser, isAuth])

  if (!hydrated) {
    return <>{children}</>
  }

  if (isAuth === null) {
    return (
      <main className='container flex h-dvh items-center justify-center'>
        <LoadingSpinner />
      </main>
    )
  }

  return <>{children}</>
}

export default AutoLogin
