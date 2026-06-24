import { supabase } from '#/lib/utils'

export type UserRole = 'admin' | 'manager' | 'staff'

export function canAccessAdmin(role: UserRole | null | undefined) {
  return role === 'admin' || role === 'manager'
}

export function hasAdminAccess(roles: Array<{ role: UserRole | null }> | null) {
  return roles?.some((role) => canAccessAdmin(role.role)) ?? false
}

export async function getUserRoles(userId: string) {
  return supabase.from('user_roles').select('role').eq('user_id', userId)
}
