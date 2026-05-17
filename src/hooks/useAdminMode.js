import { useAuth } from '../context/AuthContext'

function useAdminMode() {
  const { isAdmin, supabase, user, session, loading, isSupabaseConfigured } = useAuth()

  return {
    isAdmin,
    supabase,
    user,
    session,
    loading,
    isSupabaseConfigured,
  }
}

export default useAdminMode

