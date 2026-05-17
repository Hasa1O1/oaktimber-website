import React from 'react'
import { Navigate } from 'react-router-dom'
import useAdminMode from '../hooks/useAdminMode'

function ProtectedRoute({ children }) {
  const { isAdmin, loading } = useAdminMode()

  if (loading) {
    return (
      <div className="section-padding bg-accent-cream text-center">
        <p className="text-gray-700">Checking session...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return <Navigate to="/admin" replace />
  }

  return children
}

export default ProtectedRoute

