import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRouteWrapper = ({ role, allowedRoles, children, layout: LayoutComponent }) => {
  if (!allowedRoles.includes(role)) {
    return <Navigate to='/' replace />
  }

  return LayoutComponent ? <LayoutComponent>{children}</LayoutComponent> : children
}

export default ProtectedRouteWrapper
