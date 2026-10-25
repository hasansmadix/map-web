import { cn } from '@/lib/utils'

interface DiagramUnit {
  slug: string
  kind?: string
  type?: string
  items: { group?: string; qty?: number }[]
  specs?: { cameraChains?: number; format?: string }
}

function unitKind(unit: DiagramUnit) {
  return unit.kind ?? unit.type ?? ''
}

const groupOrder = [
  'CAMERAS',
  'LENSES',
  'VISION_MIXING',
  'AUDIO',
  'RECORDING_REPLAY',
  'MONITORING',
  'INTERCOM',
  'POWER',
  'RF_WIRELESS',
  'ROUTING',
  'PLAYOUT_GRAPHICS',
  'CAMERA_SUPPORT',
  'SYNC_TIMING',
  'NETWORKING',
  'CABLING',
  'STUDIO_TOOLS',
  'VIDEO_PRODUCTION',
  'OTHER',
]

const groupLabel: Record<string, string> = {
  CAMERAS: 'Cameras',
  LENSES: 'Lenses',
  VISION_MIXING: 'Vision',
  AUDIO: 'Audio',
  RECORDING_REPLAY: 'Replay',
  MONITORING: 'Monitors',
  INTERCOM: 'Intercom',
  POWER: 'Power',
  RF_WIRELESS: 'RF',
  ROUTING: 'Routing',
  PLAYOUT_GRAPHICS: 'Graphics',
  CAMERA_SUPPORT: 'Support',
  SYNC_TIMING: 'Sync',
  NETWORKING: 'Network',
  CABLING: 'Cabling',
  STUDIO_TOOLS: 'Studio',
  VIDEO_PRODUCTION: 'Video',
  OTHER: 'Other',
}

interface UnitHeadline {
  value: string
  label: string
}

interface LoadoutCell {
  key: string
  label: string
  qty: number
}

function kindLabel(kind: string) {
  if (kind === 'obvan' || kind === 'OBVAN') return 'OB van'
  if (kind === 'flight-case' || kind === 'FLIGHT_CASE') return 'Flypack'
  if (kind === 'studio' || kind === 'STUDIO') return 'Studio'
  return 'Unit'
}

function loadoutFor(unit: DiagramUnit): LoadoutCell[] {
  const grouped = new Map<string, number[]>()
  for (const item of unit.items ?? []) {
    const key = item.group || 'OTHER'
    const qty = item.qty && item.qty > 0 ? item.qty : 1
    const current = grouped.get(key) ?? []
    current.push(qty)
    grouped.set(key, current)
  }

  const totals = new Map<string, number>()
  for (const [key, qtys] of grouped) {
    if (key === 'CAMERAS' && !unit.specs?.cameraChains) continue
    totals.set(key, qtys.reduce((sum, qty) => sum + qty, 0))
  }

  if (unit.specs?.cameraChains) totals.set('CAMERAS', unit.specs.cameraChains)

  return [...totals.entries()]
    .sort((a, b) => {
      const aIndex = groupOrder.indexOf(a[0])
      const bIndex = groupOrder.indexOf(b[0])
      return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex)
    })
    .slice(0, 6)
    .map(([key, qty]) => ({
      key,
      label: groupLabel[key] ?? key.replace(/_/g, ' '),
      qty,
    }))
}

function headlineFor(unit: DiagramUnit): UnitHeadline | null {
  if (unit.specs?.cameraChains) return { value: String(unit.specs.cameraChains), label: 'Camera chains' }
  if (unit.specs?.format && unit.specs.format.length <= 16) return { value: unit.specs.format, label: 'Format' }
  if (unit.items?.length) return { value: String(unit.items.length), label: 'On board' }
  return null
}

function ObVanMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 440 200" fill="none" className={cn('h-auto w-full', className)} aria-hidden>
      <path d="M28 176h384" stroke="currentColor" strokeOpacity="0.18" />
      <path d="M36 152V100h52l44-48" stroke="currentColor" strokeOpacity="0.9" />
      <path d="M98 96l28-30" className="text-primary" stroke="currentColor" strokeWidth="2.5" />
      <path d="M132 52h268v100H132z" stroke="currentColor" strokeOpacity="0.9" />
      <path d="M132 92h268" className="text-primary" stroke="currentColor" strokeWidth="3" />
      <path d="M156 106h36v46h-36z" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M214 106h96v28H214z" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M348 52V30" stroke="currentColor" strokeOpacity="0.55" />
      <circle cx="348" cy="22" r="9" stroke="currentColor" strokeOpacity="0.75" />
      <path d="M348 14c14 6 22 14 22 14" className="text-primary" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="104" cy="168" r="16" stroke="currentColor" />
      <circle cx="104" cy="168" r="4.5" className="text-primary" fill="currentColor" />
      <circle cx="268" cy="168" r="16" stroke="currentColor" />
      <circle cx="268" cy="168" r="4.5" className="text-primary" fill="currentColor" />
      <circle cx="348" cy="168" r="16" stroke="currentColor" />
      <circle cx="348" cy="168" r="4.5" className="text-primary" fill="currentColor" />
    </svg>
  )
}

function FlightCaseMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 440 210" fill="none" className={cn('h-auto w-full', className)} aria-hidden>
      <path d="M78 162V46h268v28" stroke="currentColor" strokeOpacity="0.35" />
      <rect x="78" y="46" width="14" height="14" stroke="currentColor" strokeOpacity="0.35" />
      <rect x="112" y="72" width="268" height="112" stroke="currentColor" strokeOpacity="0.9" />
      <rect x="112" y="72" width="16" height="16" className="text-primary" fill="currentColor" />
      <rect x="364" y="72" width="16" height="16" stroke="currentColor" strokeOpacity="0.45" />
      <rect x="112" y="168" width="16" height="16" stroke="currentColor" strokeOpacity="0.45" />
      <rect x="364" y="168" width="16" height="16" className="text-primary" fill="currentColor" />
      <path d="M112 98h268M112 158h268" stroke="currentColor" strokeOpacity="0.16" />
      <rect x="226" y="72" width="16" height="10" stroke="currentColor" strokeOpacity="0.75" />
      <rect x="250" y="72" width="16" height="10" stroke="currentColor" strokeOpacity="0.75" />
      <rect x="206" y="114" width="80" height="24" stroke="currentColor" strokeOpacity="0.8" />
      <path d="M222 114v24M270 114v24" stroke="currentColor" strokeOpacity="0.35" />
    </svg>
  )
}

function StudioMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 440 200" fill="none" className={cn('h-auto w-full', className)} aria-hidden>
      <rect x="48" y="36" width="344" height="128" stroke="currentColor" strokeOpacity="0.9" />
      <path d="M48 72h344" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M168 72v92" className="text-primary" stroke="currentColor" strokeWidth="2" />
      <rect x="188" y="96" width="160" height="48" stroke="currentColor" strokeOpacity="0.55" />
      <path d="M80 36v-12h48" stroke="currentColor" strokeOpacity="0.45" />
    </svg>
  )
}

export function UnitMark({ type, className }: { type: string; className?: string }) {
  if (type === 'flight-case' || type === 'FLIGHT_CASE') return <FlightCaseMark className={className} />
  if (type === 'studio' || type === 'STUDIO') return <StudioMark className={className} />
  return <ObVanMark className={className} />
}

export function UnitVisual({ unit }: { unit: DiagramUnit }) {
  const cells = loadoutFor(unit)
  const headline = headlineFor(unit)

  return (
    <aside className="border border-white/20 text-white">
      <div className="flex items-center justify-between border-b border-white/20 px-4 py-3">
        <p className="text-[11px] font-medium tracking-[0.16em] text-white/55 uppercase">{kindLabel(unitKind(unit))}</p>
        <p className="font-mono text-[11px] tracking-[0.12em] text-white/40 uppercase">{unit.slug}</p>
      </div>
      <div className="relative px-6 py-5">
        <div className="tech-pattern-dark absolute inset-0 opacity-40" />
        <UnitMark type={unitKind(unit)} className="relative" />
      </div>
      {headline ? (
        <div className="flex items-end justify-between border-t border-white/20 px-4 py-4">
          <p className="text-[11px] font-medium tracking-[0.16em] text-white/50 uppercase">{headline.label}</p>
          <p className="text-4xl leading-none font-light tracking-[-0.04em]">{headline.value}</p>
        </div>
      ) : null}
      {cells.length > 0 ? (
        <ul className="grid grid-cols-3 gap-px border-t border-white/20 bg-white/15">
          {cells.map(cell => (
            <li key={cell.key} className="bg-foreground px-3 py-3">
              <p className="font-mono text-lg leading-none font-light tabular-nums">×{cell.qty}</p>
              <p className="mt-2 text-[11px] font-medium tracking-[0.14em] text-white/50 uppercase">{cell.label}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  )
}

export function UnitCardVisual({ unit, className }: { unit: DiagramUnit; className?: string }) {
  const headline = headlineFor(unit)

  return (
    <div className={cn('relative flex h-52 w-full shrink-0 flex-col justify-between overflow-hidden bg-foreground p-5 text-white md:h-auto md:w-72', className)}>
      <div className="tech-pattern-dark pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative flex items-center justify-between">
        <p className="text-[11px] font-medium tracking-[0.16em] text-white/55 uppercase">{kindLabel(unitKind(unit))}</p>
        {headline ? <p className="font-mono text-sm text-white/80">{headline.value}</p> : null}
      </div>
      <UnitMark type={unitKind(unit)} className="relative" />
      <p className="relative text-[11px] font-medium tracking-[0.16em] text-white/45 uppercase">
        {headline?.label ?? unit.slug}
      </p>
    </div>
  )
}
