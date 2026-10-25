import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero, type BreadcrumbItemType } from '@/components/website/common/page-hero'
import { CTASection } from '@/components/website/common/cta-section'
import { bodyCopyClassName, displayTitleClassName, textLinkClassName } from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'
import { comparisonFacts, listUnits } from '@/content/broadcast-units'
import { fleetByKind, unitPath, type BroadcastUnitKind } from '@/content/broadcast-units/schema'

export function FleetIndex({ kind, content }: { kind: BroadcastUnitKind; content: FleetIndexContent }) {
  const units = listUnits(kind)
  const fleet = fleetByKind[kind]

  return (
    <div className="bg-background min-h-screen">
      <PageHero
        eyebrow={fleet.singular}
        title={content.title}
        description={content.lead}
        breadcrumbs={content.breadcrumbs}
        buttons={[
          { text: 'Request a proposal', href: content.ctaHref },
          { text: content.sibling.text, href: content.sibling.href, variant: 'outline' },
        ]}
      />

      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>Published units</h2>
          <p className={cn(bodyCopyClassName, 'mt-4 max-w-2xl')}>Figures come from the unit record. A blank field means the record does not state that number.</p>
          <ul className="mt-12 grid gap-6">
            {units.map(unit => {
              const facts = comparisonFacts(unit)
              return (
                <li key={unit.slug} className="border-border border">
                  <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                      <h3 className={cn(displayTitleClassName, 'text-2xl md:text-3xl')}>{unit.title}</h3>
                      <p className={cn(bodyCopyClassName, 'mt-4 text-sm')}>{unit.summary}</p>
                      <Link href={unitPath(unit)} className={cn(textLinkClassName, 'mt-6')}>
                        Specification
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                    <dl className="border-border grid gap-4 border-t pt-6 sm:grid-cols-2 lg:col-span-7 lg:border-t-0 lg:border-s lg:pt-0 lg:pl-8">
                      {facts.map(fact => (
                        <div key={fact.label}>
                          <dt className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">{fact.label}</dt>
                          <dd className="mt-2 text-sm font-light">{fact.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <CTASection title={content.ctaTitle} description={content.ctaDescription} buttons={[{ text: 'Request a proposal', href: content.ctaHref }]} offices={[]} />
    </div>
  )
}

interface FleetIndexContent {
  title: string
  lead: string
  breadcrumbs: BreadcrumbItemType[]
  sibling: { text: string; href: string }
  ctaHref: string
  ctaTitle: string
  ctaDescription: string
}
