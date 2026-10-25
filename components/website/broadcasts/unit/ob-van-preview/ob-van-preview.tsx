'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { displayTitleClassName } from '@/components/website/common/marketing-styles'
import { obVanSpecs, obVanSystems, systemCount, type ObVanSystem } from './ob-van-preview.data'

const ObVanCanvas = dynamic(() => import('./ob-van-canvas').then(module => module.ObVanCanvas), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#0c0e14]" />,
})

const highlights = [
  { label: 'Chains', value: '12' },
  { label: 'Format', value: 'HD / 4K' },
  { label: 'Vision', value: 'HVS-490' },
  { label: 'Audio', value: 'Midas M32' },
]

export function ObVanPreview() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const active = obVanSystems.find(system => system.id === activeId) ?? null

  function selectSystem(system: ObVanSystem) {
    setActiveId(current => (current === system.id ? null : system.id))
    if (system.zone === 'rack') setIsOpen(true)
  }

  return (
    <div className="bg-[#0c0e14] text-white">
      <section className="relative pt-24 md:pt-28">
        <div className="relative h-[calc(100svh-6rem)] min-h-[640px]">
          <ObVanCanvas active={active} isOpen={isOpen} />

          <div className="pointer-events-none absolute top-6 left-4 max-w-sm md:top-8 md:left-8">
            <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.16em] text-white/55 uppercase">
              <span className="bg-primary h-px w-8" aria-hidden />
              OB VAN 1
            </p>
            <h1 className={cn(displayTitleClassName, 'mt-3 text-4xl text-white md:text-5xl')}>Outside broadcast</h1>
            <p className="mt-3 max-w-xs text-sm font-light text-white/60">Drag to orbit. Open the side to see the gallery.</p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {highlights.map(item => (
                <div key={item.label}>
                  <dt className="text-[10px] font-medium tracking-[0.16em] text-white/40 uppercase">{item.label}</dt>
                  <dd className="mt-1 text-sm font-light">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="pointer-events-none absolute top-6 right-4 md:top-8 md:right-8">
            <button
              type="button"
              onClick={() => setIsOpen(open => !open)}
              className="pointer-events-auto inline-flex h-11 items-center border border-white/30 px-5 text-[11px] font-medium tracking-[0.16em] text-white uppercase transition-colors hover:bg-white/10"
            >
              {isOpen ? 'Close the side' : 'Open the side'}
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c0e14] via-[#0c0e14]/75 to-transparent pt-8">
            <div className="container pb-5">
              {active ? (
                <ul className="mb-3 grid gap-px bg-white/10 sm:grid-cols-2">
                  {active.items.map(item => (
                    <li key={item.title} className="flex items-start justify-between gap-4 bg-[#0c0e14]/90 px-3 py-2.5">
                      <span className="text-[13px] font-light text-white/80">{item.title}</span>
                      <span className="text-primary shrink-0 font-mono text-xs">×{item.qty}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {obVanSystems.map(system => {
                  const isSelected = system.id === activeId
                  return (
                    <button
                      key={system.id}
                      type="button"
                      onClick={() => selectSystem(system)}
                      className={cn(
                        'shrink-0 border px-3 py-2 text-left transition-colors',
                        isSelected ? 'border-primary bg-primary text-white' : 'border-white/15 bg-[#0c0e14]/70 text-white/80 hover:border-white/40',
                      )}
                    >
                      <span className="block font-mono text-sm leading-none tabular-nums">×{systemCount(system)}</span>
                      <span className="mt-1.5 block text-[10px] tracking-[0.14em] uppercase">{system.label}</span>
                    </button>
                  )
                })}
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
            {obVanSpecs.map(spec => (
              <div key={spec.label} className="border-border grid grid-cols-1 gap-1 border-b py-4 sm:grid-cols-5 sm:gap-4 sm:pe-8">
                <dt className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase sm:col-span-2">{spec.label}</dt>
                <dd className="text-sm font-light sm:col-span-3">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  )
}
