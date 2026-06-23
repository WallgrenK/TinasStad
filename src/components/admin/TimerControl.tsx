import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Square, RotateCcw } from 'lucide-react'
import { formatDuration } from '@/lib/admin/format'

type State = 'idle' | 'running' | 'paused' | 'done'

interface Props {
  estimatedMin: number
  onFinish?: (actualMin: number) => void
  initialState?: State
  initialElapsedSec?: number
}

export function TimerControl({
  estimatedMin,
  onFinish,
  initialState = 'idle',
  initialElapsedSec = 0,
}: Props) {
  const [state, setState] = useState<State>(initialState)
  const [elapsed, setElapsed] = useState(initialElapsedSec) // seconds
  const ref = useRef<number | null>(null)

  useEffect(() => {
    if (state === 'running') {
      ref.current = window.setInterval(() => setElapsed((e) => e + 1), 1000)
      return () => {
        if (ref.current) window.clearInterval(ref.current)
      }
    }
  }, [state])

  const minutes = Math.floor(elapsed / 60)
  const seconds = elapsed % 60
  const variance = minutes - estimatedMin

  const reset = () => {
    setState('idle')
    setElapsed(0)
  }

  const finish = () => {
    setState('done')
    if (ref.current) window.clearInterval(ref.current)
    onFinish?.(minutes)
  }

  return (
    <div className="rounded-xl border border-[var(--color-admin-border)] bg-white p-4">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-admin-muted)]">
            Arbetad tid
          </div>
          <div className="mt-1 font-mono text-4xl font-semibold tabular-nums text-[var(--color-admin-text)]">
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')}
          </div>
        </div>
        <div className="text-right text-[11px] text-[var(--color-admin-muted)]">
          <div>Est. {formatDuration(estimatedMin)}</div>
          {state !== 'idle' && (
            <div
              className={
                variance > 5
                  ? 'text-rose-600'
                  : variance < -5
                    ? 'text-blue-600'
                    : 'text-emerald-600'
              }
            >
              {variance >= 0 ? '+' : '−'}
              {formatDuration(Math.abs(variance))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {state === 'idle' && (
          <button
            onClick={() => setState('running')}
            className="col-span-2 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[var(--color-admin-text)] text-sm font-medium text-white"
          >
            <Play className="h-4 w-4" /> Starta
          </button>
        )}
        {state === 'running' && (
          <>
            <button
              onClick={() => setState('paused')}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[var(--color-admin-border)] bg-white text-sm font-medium"
            >
              <Pause className="h-4 w-4" /> Pausa
            </button>
            <button
              onClick={finish}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-600 text-sm font-medium text-white"
            >
              <Square className="h-4 w-4" /> Avsluta
            </button>
          </>
        )}
        {state === 'paused' && (
          <>
            <button
              onClick={() => setState('running')}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[var(--color-admin-text)] text-sm font-medium text-white"
            >
              <Play className="h-4 w-4" /> Fortsätt
            </button>
            <button
              onClick={finish}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-600 text-sm font-medium text-white"
            >
              <Square className="h-4 w-4" /> Avsluta
            </button>
          </>
        )}
        {state === 'done' && (
          <button
            onClick={reset}
            className="col-span-2 inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[var(--color-admin-border)] bg-white text-sm font-medium"
          >
            <RotateCcw className="h-4 w-4" /> Återställ
          </button>
        )}
      </div>
    </div>
  )
}
