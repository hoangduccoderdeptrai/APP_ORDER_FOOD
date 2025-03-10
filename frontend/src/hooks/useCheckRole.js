import { useMemo } from 'react'
import useAuth from '~/stores/useAuth'

function useCheckRole(userRole) {
  const { user } = useAuth()
  const currentRole = user.role

  const hasRole = useMemo(() => {
    return userRole === currentRole
  }, [userRole, currentRole])

  return hasRole
}

export default useCheckRole
