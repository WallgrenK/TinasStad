import { useState, type ReactNode } from 'react'

export function Accordion({ items }: { items: { q: string; a: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-start justify-between gap-6 py-6 text-left"
            >
              <span className="display-md pr-4">{it.q}</span>
              <span
                className={`mt-2 text-ink-soft transition-transform shrink-0 ${
                  isOpen ? 'rotate-45' : ''
                }`}
                aria-hidden
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen
                  ? 'grid-rows-[1fr] opacity-100 pb-7'
                  : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="text-ink-soft max-w-2xl leading-relaxed">
                  {it.a}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
