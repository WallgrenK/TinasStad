import { useEffect, useState } from 'react'
import { supabase } from '#/lib/utils'
import type { User } from '@supabase/supabase-js'

type Profile = {
  id: string
  full_name: string | null
  email: string | null
  phone: string | null
}

type UserRole = 'admin' | 'manager' | 'staff'

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [role, setRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function loadUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!mounted) return

        setUser(user)

        if (!user) {
          setLoading(false)
          return
        }

        // TODO: Share this profile/role lookup with the admin route guard and surface errors instead of silently falling back to null.
        const [{ data: profileData }, { data: roleData }] =
          await Promise.all([
            supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single(),

            supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', user.id)
              .limit(1)
              .single(),
          ])

        if (!mounted) return

        setProfile(profileData)
        setRole(roleData?.role ?? null)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUser()
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  return {
    user,
    profile,
    role,
    loading,
    isAdmin: role === 'admin',
    isManager: role === 'manager',
    isStaff: role === 'staff',
    isAdminOrManager:
      role === 'admin' || role === 'manager',
  }
}
