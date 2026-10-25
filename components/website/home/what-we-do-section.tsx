import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { coreBusinessUnits } from './home-page.data'
import { displayTitleClassName, eyebrowClassName } from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'

export function WhatWeDoSection() {
  return (
    <section className="border-y border-border bg-muted py-24 md:py-32">
      <div className="container">
        <div className="mb-14 max-w-2xl">
          <p className={eyebrowClassName}>
            <span className="bg-primary h-px w-8" aria-hidden />
            Capabilities
          </p>
          <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>
            Equipment, broadcasting, and production
          </h2>
          <p className="text-muted-foreground mt-4 text-base font-light leading-relaxed">
            Hire the kit, commission the broadcast, or hand MAP the whole programme.
          </p>
        </div>
        <div className="border-border bg-border grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-3">
          {coreBusinessUnits.map((unit, index) => {
            const Icon = unit.icon
            return (
              <Link
                key={unit.href}
                href={unit.href}
                className="group bg-card hover:bg-foreground flex flex-col p-8 transition-colors md:p-10"
              >
                <div className="mb-10 flex items-start justify-between">
                  <Icon className="text-primary size-8" strokeWidth={1.25} />
                  <span className="text-muted-foreground font-mono text-xs transition-colors group-hover:text-white/40">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mb-3 text-lg font-medium tracking-tight transition-colors group-hover:text-white">{unit.title}</h3>
                <p className="text-muted-foreground mb-8 text-sm leading-relaxed font-light transition-colors group-hover:text-white/65">{unit.description}</p>
                <ArrowRight className="text-primary mt-auto size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
