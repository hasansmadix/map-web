import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { coreBusinessUnits } from '@/components/website/home/home-page.data'
import {
  displayTitleClassName,
  eyebrowOnDarkClassName,
  marketingButtonClassName,
  outlineOnInkClassName,
} from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'

export function HomeHero() {
  return (
    <section className="relative -mt-0 flex min-h-svh flex-col bg-foreground text-white">
      <div className="absolute inset-0 overflow-hidden">
        <Image src="/hero.webp" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-foreground via-foreground/85 to-foreground/40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-foreground to-transparent" />
        <div className="tech-pattern-dark absolute inset-0 opacity-10" />
      </div>

      <div className="relative z-10 container flex flex-1 items-center pt-32 pb-16">
        <div className="max-w-3xl">
          <p className={eyebrowOnDarkClassName}>
            <span className="bg-primary h-px w-8" aria-hidden />
            Dubai Production City
          </p>
          <h1 className={cn(displayTitleClassName, 'mb-6 text-4xl text-white md:text-6xl lg:text-7xl')}>
            Film, broadcast, and production
          </h1>
          <p className="mb-10 max-w-2xl text-base leading-relaxed font-light text-white/75 md:text-lg">
            MAP produces programmes for companies, institutions, and live events. Equipment, crews, and
            outside broadcast are based at B29, Dubai Production City.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/equipment-rental" className={cn(marketingButtonClassName.primary, 'group')}>
              Rent equipment
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/contact?subject=rfq" className={cn(outlineOnInkClassName, 'group')}>
              Request a proposal
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-foreground/60 backdrop-blur-sm">
          <ul className="container grid grid-cols-1 sm:grid-cols-3">
          {coreBusinessUnits.map((unit, index) => {
            const Icon = unit.icon
            return (
              <li
                key={unit.href}
                className={cn('border-white/10 py-5', index > 0 && 'sm:border-s sm:ps-6')}
              >
                <Link
                  href={unit.href}
                  className="group flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white"
                >
                  <Icon className="text-primary size-5 shrink-0" strokeWidth={1.25} />
                  {unit.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
