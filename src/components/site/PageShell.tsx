import type { ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: ReactNode
  lead?: string
}) {
  return (
    <section className="container-page pt-20 md:pt-28 pb-12 md:pb-16">
      <div className="eyebrow mb-6">{eyebrow}</div>
      <h1 className="display-xl max-w-4xl">{title}</h1>
      {lead && <p className="lead mt-8">{lead}</p>}
    </section>
  )
}
