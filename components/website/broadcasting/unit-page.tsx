import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PageBreadcrumb } from '@/components/website/common/page-hero'
import { CTASection } from '@/components/website/common/cta-section'
import { UnitQuickStats } from '@/components/website/broadcasts/unit/unit-quick-stats'
import { UnitVisual } from '@/components/website/broadcasts/unit/unit-visual'
import { UnitGallery } from '@/components/website/broadcasts/unit/unit-gallery'
import { UnitItems } from '@/components/website/broadcasts/unit/unit-items'
import { UnitSpecifications } from '@/components/website/broadcasts/unit/unit-specifications'
import {
  displayTitleClassName,
  eyebrowOnDarkClassName,
  marketingButtonClassName,
  outlineOnInkClassName,
  textLinkClassName,
} from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'
import { footerData } from '@/components/layout/footer/footer.data'
import { getUnit, groupUnitItems, listUnits } from '@/content/broadcast-units'
import { fleetByKind, unitPath, type BroadcastUnitKind } from '@/content/broadcast-units/schema'
import { offeringSchema } from '@/utils/seo/schema/broadcasts/offering-schema'

export function BroadcastUnitView({ slug, kind }: { slug: string; kind: BroadcastUnitKind }) {
  const unit = getUnit(slug)
  if (!unit || unit.kind !== kind) notFound()

  const fleet = fleetByKind[unit.kind]
  const groups = Object.fromEntries(groupUnitItems(unit).map(entry => [entry.group, entry.items]))
  const siblings = listUnits(unit.kind).filter(item => item.slug !== unit.slug)
  const specs = Object.fromEntries(Object.entries(unit.specs).filter(([key]) => key !== 'useCases'))
  const preview = unit.kind === 'obvan'
    ? { href: '/broadcasting/units/ob-van-preview', text: 'View a layout' }
    : unit.kind === 'studio'
      ? { href: '/broadcasting/units/studio-preview', text: 'View a layout' }
      : null

  return (
    <UnitFrame
      unit={unit}
      fleet={fleet}
      groups={groups}
      siblings={siblings}
      specs={specs}
      preview={preview}
    />
  )
}

async function UnitFrame({
  unit,
  fleet,
  groups,
  siblings,
  specs,
  preview,
}: {
  unit: NonNullable<ReturnType<typeof getUnit>>
  fleet: (typeof fleetByKind)[BroadcastUnitKind]
  groups: Record<string, NonNullable<ReturnType<typeof getUnit>>['items']>
  siblings: NonNullable<ReturnType<typeof getUnit>>[]
  specs: Record<string, unknown>
  preview: { href: string; text: string } | null
}) {
  const jsonLd = await offeringSchema({
    name: unit.title,
    description: unit.meta.description,
    pathname: unitPath(unit),
    breadcrumbs: [
      { name: 'Home', url: '' },
      { name: 'Broadcasting', url: '/broadcasting' },
      { name: fleet.label, url: fleet.href },
      { name: unit.title, url: unitPath(unit) },
    ],
  })

  return (
    <div className="bg-background min-h-screen">
      <script id={`unit-${unit.slug}-jsonld`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <section className="relative overflow-hidden bg-foreground text-white">
        <div className="tech-pattern-dark absolute inset-0 opacity-10" />
        <div className="relative pt-[4.5rem]">
          <PageBreadcrumb
            items={[
              { label: 'Broadcasting', href: '/broadcasting' },
              { label: fleet.label, href: fleet.href },
              { label: unit.title },
            ]}
          />
          <div className="container pt-8 pb-14 md:pt-10 md:pb-16">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <p className={eyebrowOnDarkClassName}>
                  <span className="bg-primary h-px w-8" aria-hidden />
                  {fleet.singular}
                </p>
                <h1 className={cn(displayTitleClassName, 'mb-6 max-w-3xl text-3xl text-white md:text-5xl')}>{unit.title}</h1>
                <p className="max-w-2xl text-base leading-relaxed font-light text-white/70 md:text-lg">{unit.summary}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href={`/contact?subject=broadcasting&unit=${unit.slug}`} className={cn(marketingButtonClassName.primary, 'group')}>
                    Request this unit
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href={fleet.href} className={outlineOnInkClassName}>
                    All {fleet.label.toLowerCase()}
                  </Link>
                </div>
                <p className="mt-6 text-sm font-light text-white/60">
                  <a className="underline-offset-4 hover:underline" href={`tel:${footerData.contact.phone.replace(/\s/g, '')}`}>{footerData.contact.phone}</a>
                  <span className="px-2" aria-hidden>·</span>
                  <a className="underline-offset-4 hover:underline" href={`mailto:${footerData.contact.email}`}>{footerData.contact.email}</a>
                </p>
              </div>
              <div className="lg:col-span-5 lg:pt-8">
                <p className="mb-3 text-[11px] font-medium tracking-[0.16em] text-white/45 uppercase">Diagram, not a photograph</p>
                <UnitVisual unit={unit} />
              </div>
            </div>
            <UnitQuickStats unit={unit} />
          </div>
        </div>
      </section>

      <div className="container space-y-20 py-20 md:space-y-28 md:py-28">
        {unit.gallery.length > 0 ? (
          <UnitGallery
            gallery={unit.gallery.map(image => ({ path: image.src, alt: image.alt, order: image.order }))}
            unitTitle={unit.title}
            unitSlug={unit.slug}
          />
        ) : null}
        <UnitSpecifications specs={specs} />
        {unit.specs.useCases && unit.specs.useCases.length > 0 ? (
          <section>
            <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>Use cases on this record</h2>
            <ul className="border-border mt-8 border-t">
              {unit.specs.useCases.map(useCase => (
                <li key={useCase} className="border-border border-b py-4 text-sm font-light">{useCase}</li>
              ))}
            </ul>
          </section>
        ) : null}
        {unit.items.length > 0 ? <UnitItems groupedItems={groups} /> : null}
        {preview ? (
          <p className="text-sm font-light">
            <Link href={preview.href} className={textLinkClassName}>
              {preview.text}
              <ArrowRight className="size-4" />
            </Link>
            <span className="text-muted-foreground"> This layout is not a photograph of the unit, and it is not indexed.</span>
          </p>
        ) : null}
        {siblings.length > 0 ? (
          <section>
            <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>Other {fleet.label.toLowerCase()}</h2>
            <ul className="mt-8 flex flex-col gap-4">
              {siblings.map(sibling => (
                <li key={sibling.slug}>
                  <Link href={unitPath(sibling)} className={textLinkClassName}>
                    {sibling.title}
                    <ArrowRight className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <CTASection
        title={`Request ${unit.title}`}
        description="Tell us the date and the venue. MAP will confirm whether this unit fits the programme. The request does not reserve it."
        buttons={[{ text: 'Request this unit', href: `/contact?subject=broadcasting&unit=${unit.slug}` }]}
        offices={[]}
      />
    </div>
  )
}
