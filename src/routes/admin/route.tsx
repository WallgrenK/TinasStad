import {
  createFileRoute,
  Outlet,
  useRouter,
  useRouterState,
  Link,
  redirect,
} from '@tanstack/react-router'
import {
  ChevronRight,
  LogOut,
  User as UserIcon,
  Settings as SettingsIcon,
} from 'lucide-react'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Toaster } from '@/components/ui/sonner'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { supabase } from '#/lib/utils'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { getUserRoles, hasAdminAccess } from '@/lib/auth'

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ location }) => {
    if (location.pathname === '/admin/login') {
      return
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw redirect({
        to: '/admin/login',
      })
    }

    const { data: roles, error } = await getUserRoles(user.id)

    if (error) {
      throw redirect({ to: '/admin/login' })
    }

    if (!hasAdminAccess(roles)) {
      throw redirect({ to: '/admin/login' })
    }
  },
  head: () => ({
    meta: [
      { title: 'Admin · Tinas Städ' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: AdminLayout,
})

const titles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/leads': 'Leads',
  '/admin/bookings': 'Bokningar',
  '/admin/customers': 'Kunder',
  '/admin/staff': 'Personal',
  '/admin/schedule': 'Schema',
  '/admin/time-tracking': 'Tidsspårning',
  '/admin/checklists': 'Checklistor',
  '/admin/services': 'Tjänster',
  '/admin/testimonials': 'Omdömen',
  '/admin/content': 'Innehåll',
  '/admin/settings': 'Inställningar',
}

function AdminLayout() {
  const router = useRouter()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const current = titles[pathname] ?? 'Admin'
  const { profile, role, loading } = useCurrentUser()
  const initials =
    profile?.full_name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? 'U'
  const displayRole = loading ? 'Laddar...' : (role ?? 'Admin')
  if (pathname === '/admin/login') {
    return <Outlet />
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Failed to sign out', error)
      return
    }

    await router.invalidate()
    await router.navigate({ to: '/admin/login' })
  }

  return (
    <div className="admin-scope min-h-screen">
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-(--color-admin-bg)">
          <AdminSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b border-(--color-admin-border) bg-admin-bg/95 px-4 backdrop-blur md:px-6">
              <div className="flex items-center gap-3 text-sm">
                <SidebarTrigger className="h-8 w-8 text-(--color-admin-muted) hover:text-(--color-admin-text)" />
                <nav
                  className="hidden items-center gap-1.5 text-(--color-admin-muted) sm:flex"
                  aria-label="Sökväg"
                >
                  <Link to="/admin" className="hover:text-(--color-admin-text)">
                    {displayRole}
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="font-medium text-(--color-admin-text)">
                    {current}
                  </span>
                </nav>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="hidden text-xs text-(--color-admin-muted) hover:text-(--color-admin-text) sm:inline"
                >
                  Visa webbplats →
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-(--color-admin-border) bg-(--color-admin-bg) py-1 pl-1 pr-3 text-sm transition-colors hover:bg-(--color-admin-surface)">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-(--color-admin-text) text-[11px] text-white">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden font-medium text-(--color-admin-text) sm:inline">
                      {profile?.full_name ?? 'Laddar...'}
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="text-xs text-(--color-admin-muted)">
                      {profile?.email ?? ''}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Inställningar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-rose-600"
                      onSelect={() => {
                        void handleSignOut()
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logga ut
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            <main className="flex-1 bg-(--color-admin-surface) px-4 py-6 md:px-8 md:py-8">
              <div className="mx-auto w-full max-w-7xl">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
        <Toaster richColors position="bottom-right" />
      </SidebarProvider>
    </div>
  )
}
