'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { displayTitleClassName } from '@/components/website/common/marketing-styles'
import {
  studioInventory,
  studioSpaces,
  studioSpecs,
  studioSystems,
  systemCount,
  zoneFor,
  type StudioSpace,
  type StudioSystem,
} from './studio-preview.data'

const StudioCanvas = dynamic(() => import('./studio-canvas').then(module => module.StudioCanvas), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#0c0e14]" />,
})

const highlights = [
  { label: 'Floor', value: '600 SQM' },
  { label: 'Chains', value: '6' },
  { label: 'Vision', value: 'FOR-A' },
  { label: 'Audio', value: 'Midas M32' },
]

export function StudioPreview() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const system = studioSystems.find(item => item.id === activeId) ?? null
  const space = studioSpaces.find(item => item.id === activeId) ?? null

  function select(id: string) {
    setActiveId(current => (current === id ? null : id))
  }

  return (
    <div className="bg-[#0c0e14] text-white">
      <section className="relative pt-24 md:pt-28">
        <div className="relative h-[calc(100svh-6rem)] min-h-[640px]">
          <StudioCanvas activeId={activeId} zone={zoneFor(activeId)} />

          <div className="pointer-events-none absolute top-6 left-4 z-10 max-w-sm md:top-8 md:left-8">
            <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.16em] text-white/55 uppercase">
              <span className="bg-primary h-px w-8" aria-hidden />
              Studio 1
            </p>
            <h1 className={cn(displayTitleClassName, 'mt-3 text-4xl text-white md:text-5xl')}>Broadcast studio</h1>
            <p className="mt-3 max-w-xs text-sm font-light text-white/60">
              A 600 square metre floor, fitted for live broadcast. Drag to orbit.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {highlights.map(item => (
                <div key={item.label}>
                  <dt className="text-[10px] font-medium tracking-[0.16em] text-white/40 uppercase">{item.label}</dt>
                  <dd className="mt-1 text-sm font-light">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="absolute top-6 right-4 z-10 flex flex-col gap-2 md:top-8 md:right-8">
            {studioSpaces.map(item => (
              <SpaceButton key={item.id} space={item} selected={item.id === activeId} onSelect={select} />
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#0c0e14] via-[#0c0e14]/80 to-transparent pt-10">
            <div className="container pb-5">
              {system ? <GearList items={system.items} /> : null}
              {space ? (
                <p className="mb-3 max-w-xl bg-[#0c0e14]/90 px-3 py-2.5 text-[13px] font-light text-white/80">{space.note}</p>
              ) : null}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {studioSystems.map(item => (
                  <SystemButton key={item.id} system={item} selected={item.id === activeId} onSelect={select} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background text-foreground">
        <div className="container py-16 md:py-20">
          <p className="text-muted-foreground mb-5 flex items-center gap-3 text-[11px] font-medium tracking-[0.16em] uppercase">
            <span className="bg-primary h-px w-8" aria-hidden />
            Technical
          </p>
          <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>Specifications</h2>
          <dl className="border-border mt-10 grid border-t sm:grid-cols-2">
            {studioSpecs.map(spec => (
              <div key={spec.label} className="border-border grid grid-cols-1 gap-1 border-b py-4 sm:grid-cols-5 sm:gap-4 sm:pe-8">
                <dt className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase sm:col-span-2">{spec.label}</dt>
                <dd className="text-sm font-light sm:col-span-3">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className={cn(displayTitleClassName, 'mt-16 text-3xl md:text-4xl')}>Inventory</h2>
          <div className="border-border mt-8 overflow-x-auto border-t">
            <table className="w-full min-w-[36rem] text-left">
              <thead>
                <tr className="text-muted-foreground border-border border-b text-[11px] font-medium tracking-[0.16em] uppercase">
                  <th className="py-3 pe-6 font-medium">Manufacturer</th>
                  <th className="py-3 pe-6 font-medium">Item</th>
                  <th className="py-3 text-end font-medium">Qty</th>
                </tr>
              </thead>
              <tbody>
                {studioInventory.map(row => (
                  <tr key={`${row.maker}-${row.item}`} className="border-border border-b">
                    <td className="py-3 pe-6 text-[13px] font-medium">{row.maker}</td>
                    <td className="text-muted-foreground py-3 pe-6 text-sm font-light">{row.item}</td>
                    <td className="py-3 text-end font-mono text-sm tabular-nums">{row.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

function GearList({ items }: { items: StudioSystem['items'] }) {
  return (
    <ul className="mb-3 grid gap-px bg-white/10 sm:grid-cols-2">
      {items.map(item => (
        <li key={item.title} className="flex items-start justify-between gap-4 bg-[#0c0e14]/90 px-3 py-2.5">
          <span className="text-[13px] font-light text-white/80">{item.title}</span>
          <span className="text-primary shrink-0 font-mono text-xs">×{item.qty}</span>
        </li>
      ))}
    </ul>
  )
}

function SystemButton({
  system,
  selected,
  onSelect,
}: {
  system: StudioSystem
  selected: boolean
  onSelect: (id: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(system.id)}
      className={cn(
        'shrink-0 border px-3 py-2 text-left transition-colors',
        selected ? 'border-primary bg-primary text-white' : 'border-white/15 bg-[#0c0e14]/70 text-white/80 hover:border-white/40',
      )}
    >
      <span className="block font-mono text-sm leading-none tabular-nums">×{systemCount(system)}</span>
      <span className="mt-1.5 block text-[10px] tracking-[0.14em] uppercase">{system.label}</span>
    </button>
  )
}

function SpaceButton({
  space,
  selected,
  onSelect,
}: {
  space: StudioSpace
  selected: boolean
  onSelect: (id: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(space.id)}
      className={cn(
        'border px-3 py-2 text-left text-[10px] font-medium tracking-[0.14em] uppercase transition-colors',
        selected ? 'border-primary bg-primary text-white' : 'border-white/20 bg-[#0c0e14]/70 text-white/80 hover:border-white/50',
      )}
    >
      {space.label}
    </button>
  )
}
