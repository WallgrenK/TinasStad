import { useEffect, useState } from 'react'
import { supabase } from '#/lib/utils'
import type { User } from '@supabase/supabase-js'
import { canAccessAdmin, getUserRoles, type UserRole } from '@/lib/auth'

type Profile = {
  id: string
  full_name: string | null
  email: string | null
  phone: string | null
}

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

        const [{ data: profileData }, { data: roleData }] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', user.id).single(),
          getUserRoles(user.id),
        ])

        if (!mounted) return

        setProfile(profileData)
        setRole(
          roleData?.find((role) => canAccessAdmin(role.role))?.role ??
            roleData?.[0]?.role ??
            null,
        )
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
    isAdminOrManager: canAccessAdmin(role),
  }
}
