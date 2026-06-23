import { Link, useRouterState } from '@tanstack/react-router'
import {
  LayoutDashboard,
  Inbox,
  CalendarDays,
  Users,
  UserCog,
  CalendarRange,
  Timer,
  ListChecks,
  Sparkles,
  MessageSquareQuote,
  FileText,
  Settings,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { leads } from '@/lib/admin/mock/leads'

const newLeadCount = leads.filter((l) => l.status === 'new').length

const primary = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard, exact: true },
  { title: 'Leads', url: '/admin/leads', icon: Inbox, badge: newLeadCount },
  { title: 'Bokningar', url: '/admin/bookings', icon: CalendarDays },
  { title: 'Kunder', url: '/admin/customers', icon: Users },
  { title: 'Personal', url: '/admin/staff', icon: UserCog },
  { title: 'Schema', url: '/admin/schedule', icon: CalendarRange },
  { title: 'Tidsspårning', url: '/admin/time-tracking', icon: Timer },
  { title: 'Checklistor', url: '/admin/checklists', icon: ListChecks },
]

const secondary = [
  { title: 'Tjänster', url: '/admin/services', icon: Sparkles },
  { title: 'Omdömen', url: '/admin/testimonials', icon: MessageSquareQuote },
  { title: 'Innehåll', url: '/admin/content', icon: FileText },
  { title: 'Inställningar', url: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  const isActive = (url: string, exact?: boolean) =>
    exact
      ? pathname === url
      : pathname === url || pathname.startsWith(url + '/')

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-(--color-admin-border) bg-(--color-admin-bg)"
    >
      <SidebarHeader className="border-b border-(--color-admin-border) px-3 py-4">
        <Link to="/admin" className="flex items-center gap-2 px-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-(--color-admin-text) text-[11px] font-bold text-white">
            T
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold tracking-tight text-(--color-admin-text)">
              Tinas Städ
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-(--color-admin-muted)">
              Admin
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.16em] text-(--color-admin-muted)">
            Drift
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {primary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url, item.exact)}
                    tooltip={item.title}
                  >
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge ? (
                        <span className="ml-auto rounded-full bg-(--color-admin-accent-soft) px-1.5 text-[10px] font-medium text-(--color-admin-accent) group-data-[collapsible=icon]:hidden">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.16em] text-(--color-admin-muted)">
            Webbplats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-(--color-admin-border) px-3 py-3 text-[11px] text-(--color-admin-muted) group-data-[collapsible=icon]:hidden">
        v0.1 · prototyp
      </SidebarFooter>
    </Sidebar>
  )
}
