import {
  createFileRoute,
  Outlet,
  useRouterState,
  Link,
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

export const Route = createFileRoute('/admin')({
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
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const current = titles[pathname] ?? 'Admin'

  return (
    <div className="admin-scope min-h-screen">
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-[var(--color-admin-bg)]">
          <AdminSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b border-[var(--color-admin-border)] bg-[var(--color-admin-bg)]/95 px-4 backdrop-blur md:px-6">
              <div className="flex items-center gap-3 text-sm">
                <SidebarTrigger className="h-8 w-8 text-[var(--color-admin-muted)] hover:text-[var(--color-admin-text)]" />
                <nav
                  className="hidden items-center gap-1.5 text-[var(--color-admin-muted)] sm:flex"
                  aria-label="Sökväg"
                >
                  <Link
                    to="/admin"
                    className="hover:text-[var(--color-admin-text)]"
                  >
                    Admin
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="font-medium text-[var(--color-admin-text)]">
                    {current}
                  </span>
                </nav>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="hidden text-xs text-[var(--color-admin-muted)] hover:text-[var(--color-admin-text)] sm:inline"
                >
                  Visa webbplats →
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-[var(--color-admin-border)] bg-[var(--color-admin-bg)] py-1 pl-1 pr-3 text-sm transition-colors hover:bg-[var(--color-admin-surface)]">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-[var(--color-admin-text)] text-[11px] text-white">
                        TK
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden font-medium text-[var(--color-admin-text)] sm:inline">
                      Tina Karlsson
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="text-xs text-[var(--color-admin-muted)]">
                      tina@tinasstad.se
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
                    <DropdownMenuItem className="text-rose-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logga ut
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            <main className="flex-1 bg-[var(--color-admin-surface)] px-4 py-6 md:px-8 md:py-8">
              <div className="mx-auto w-full max-w-[1280px]">
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
