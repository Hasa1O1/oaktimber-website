import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import useAdminMode from '../hooks/useAdminMode'

function AdminLogin() {
  const { isAdmin, supabase, isSupabaseConfigured } = useAdminMode()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAdmin) {
    return <Navigate to="/" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!isSupabaseConfigured || !supabase) {
      toast.error('Add Supabase credentials to .env first')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success('Logged in')
    navigate('/')
  }

  return (
    <section className="section-padding bg-accent-cream">
      <div className="container-custom max-w-md">
        <div className="card p-8">
          <h1 className="mb-2 text-primary-900">Admin Login</h1>
          <p className="mb-8 text-gray-600">
            Sign in to edit OAKTIMBER website content.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-lg border border-primary-200 px-4 py-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-lg border border-primary-200 px-4 py-3 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default AdminLogin
