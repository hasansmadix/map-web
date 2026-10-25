import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, RadioTower, Video } from 'lucide-react'
import { broadcastingInfrastructure, productionServiceLinks } from '@/components/website/home/home-page.data'
import { textLinkClassName } from '@/components/website/common/marketing-styles'

export function HomeFeaturePanels() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="relative flex min-h-[22rem] flex-col justify-between overflow-hidden bg-foreground p-8 text-white md:p-12">
          <Image src="/hero.webp" alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-linear-to-t from-foreground via-foreground/80 to-foreground/30" />
          <div className="relative">
            <RadioTower className="text-primary mb-6 size-8" strokeWidth={1.25} />
            <h2 className="mb-4 text-2xl font-light tracking-[-0.03em] md:text-3xl">Broadcast production</h2>
            <p className="max-w-md text-sm leading-relaxed font-light text-white/70">
              Outside broadcast, live multi-camera production, and the OB vans that carry a programme.
            </p>
          </div>
          <ul className="relative mt-10 border-t border-white/15">
            {broadcastingInfrastructure.map(item => (
              <li key={item.href} className="border-b border-white/15">
                <Link href={item.href} className="group flex items-start justify-between gap-6 py-4">
                  <span>
                    <span className="block text-sm font-medium">{item.title}</span>
                    <span className="mt-1 block text-sm font-light text-white/60">{item.description}</span>
                  </span>
                  <ArrowRight className="mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex min-h-[22rem] flex-col justify-between border border-border bg-card p-8 md:p-12">
          <div>
            <Video className="text-primary mb-6 size-8" strokeWidth={1.25} />
            <h2 className="mb-4 text-2xl font-light tracking-[-0.03em] md:text-3xl">Production</h2>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed font-light">
              A finished programme: a commercial, a corporate film, the record of an event, a live show, or a studio day.
            </p>
          </div>
          <ul className="mt-10 space-y-3">
            {productionServiceLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} className={textLinkClassName}>
                  {link.text}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
