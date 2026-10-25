import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/website/common/page-hero'
import { CTASection } from '@/components/website/common/cta-section'
import {
  bodyCopyClassName,
  displayTitleClassName,
  eyebrowClassName,
  textLinkClassName,
} from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'
import { operatingAreaStatement } from '@/content/broadcasting/coverage'
import { listUnits } from '@/content/broadcast-units'
import { fleetByKind, type BroadcastUnitKind } from '@/content/broadcast-units/schema'

const services = [
  { title: 'Outside broadcast', outcome: 'A mobile production engagement for a site that can take a vehicle.', href: '/broadcasting/outside-broadcast' },
  { title: 'Live production', outcome: 'Multi-camera switching, graphics, a record, and delivery of the live programme.', href: '/broadcasting/live-production' },
  { title: 'Sports broadcasting', outcome: 'Match and tournament coverage, built around replay and a competition clock.', href: '/broadcasting/sports-broadcasting' },
  { title: 'Transmission', outcome: 'Contribution from the venue and distribution to the destinations in the brief.', href: '/broadcasting/transmission' },
  { title: 'Technical crew', outcome: 'Engineers and operators, with a MAP unit or alongside a visiting production.', href: '/broadcasting/technical-crew' },
]

const applications = [
  { title: 'Sports and tournaments', href: '/broadcasting/sports-broadcasting', text: 'A competition workflow, not a conference run of show.' },
  { title: 'Concerts and live entertainment', href: '/broadcasting/outside-broadcast', text: 'Large shows that need a mobile control facility.' },
  { title: 'Conferences and exhibitions', href: '/broadcasting/live-production', text: 'A switched programme for the room and the remote audience.' },
  { title: 'Government and institutions', href: '/broadcasting/outside-broadcast', text: 'Ceremonies and official programmes on the same operation.' },
  { title: 'Television and studio', href: '/broadcasting/studios', text: 'A broadcast-ready room, specified separately from a filming session.' },
]

export function BroadcastHub() {
  const counts = (['obvan', 'flight-case', 'studio'] as BroadcastUnitKind[]).map(kind => {
    const units = listUnits(kind)
    const fleet = fleetByKind[kind]
    const lead = kind === 'obvan'
      ? units[0]?.specs.cameraChains
        ? `${units[0].specs.cameraChains} camera chains on ${units[0].title}.`
        : units[0]?.title
      : kind === 'studio'
        ? units[0] && 'areaSqm' in units[0].specs
          ? `${units[0].specs.areaSqm} m². ${units[0].title}.`
          : units[0]?.title
        : `${units.length} portable systems.`
    return { kind, href: fleet.href, label: fleet.label, count: units.length, lead }
  })

  return (
    <div className="bg-background min-h-screen">
      <PageHero
        eyebrow="Broadcasting"
        title="Broadcast production"
        description="Mobile units, flypacks, a Dubai studio, and the crews that run them. MAP produces live programmes for organisations across the UAE and the GCC."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Broadcasting' }]}
        buttons={[
          { text: 'Request a proposal', href: '/contact?subject=broadcasting' },
          { text: 'Fleet and systems', href: '#fleet', variant: 'outline' },
        ]}
      />

      <section className="bg-background py-20 md:py-28">
        <div className="container grid gap-6 lg:grid-cols-2">
          <article className="flex flex-col justify-between bg-foreground p-8 text-white md:p-12">
            <div>
              <p className="mb-5 flex items-center gap-3 text-xs font-medium tracking-widest text-white/60 uppercase">
                <span className="bg-primary h-px w-8" aria-hidden />
                Services
              </p>
              <h2 className={cn(displayTitleClassName, 'text-3xl text-white md:text-4xl')}>The engagement</h2>
              <p className="mt-4 max-w-md text-sm font-light text-white/70">What MAP is accountable for: the programme, the path, or the crew.</p>
            </div>
            <ul className="mt-10 border-t border-white/15">
              {services.map(service => (
                <li key={service.href} className="border-b border-white/15">
                  <Link href={service.href} className="group flex items-start justify-between gap-6 py-4">
                    <span>
                      <span className="block text-sm font-medium">{service.title}</span>
                      <span className="mt-1 block text-sm font-light text-white/60">{service.outcome}</span>
                    </span>
                    <ArrowRight className="mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </article>

          <article id="fleet" className="border-border flex scroll-mt-24 flex-col justify-between border p-8 md:p-12">
            <div>
              <p className={eyebrowClassName}>
                <span className="bg-primary h-px w-8" aria-hidden />
                Fleet and systems
              </p>
              <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>The equipment</h2>
              <p className={cn(bodyCopyClassName, 'mt-4 max-w-md text-sm')}>Specification pages for the systems MAP puts on a site. Counts come from the published fleet.</p>
            </div>
            <ul className="border-border mt-10 border-t">
              {counts.map(item => (
                <li key={item.kind} className="border-border border-b">
                  <Link href={item.href} className="group flex items-start justify-between gap-6 py-4">
                    <span>
                      <span className="block text-sm font-medium">{item.label}</span>
                      <span className={cn(bodyCopyClassName, 'mt-1 block text-sm')}>{item.count} published. {item.lead}</span>
                    </span>
                    <ArrowRight className="text-primary mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="border-border border-t py-20 md:py-28">
        <div className="container">
          <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>Truck or flypack</h2>
          <p className={cn(bodyCopyClassName, 'mt-4 max-w-2xl')}>The venue decides the system. MAP confirms it from the address before a date is held.</p>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-border border-b">
                  <th className="py-3 pr-6 font-medium">Decision</th>
                  <th className="py-3 pr-6 font-medium">Outside broadcast</th>
                  <th className="py-3 font-medium">Flypack</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Access', 'A park for the vehicle, cabled to the stage or the field', 'A dock or a lift into the room'],
                  ['Build', 'A production day', 'A few hours once the cases are in the room'],
                  ['Cameras', 'Scaled to the field or the ceremony', 'Set by the unit, from a conference rig upward'],
                  ['Programme', 'Sport, ceremonies, concerts, and open sites', 'Conferences, launches, and exhibitions'],
                ].map(row => (
                  <tr key={row[0]} className="border-border border-b">
                    <th className="text-muted-foreground py-4 pr-6 text-left text-[11px] font-medium tracking-[0.16em] uppercase">{row[0]}</th>
                    <td className="py-4 pr-6 font-light">{row[1]}</td>
                    <td className="py-4 font-light">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/broadcasting/outside-broadcast" className={textLinkClassName}>
              Outside broadcast
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/broadcasting/flypacks" className={textLinkClassName}>
              Flypacks
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>Applications</h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {applications.map(item => (
              <li key={item.title}>
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className={cn(bodyCopyClassName, 'mt-2 text-sm')}>{item.text}</p>
                <Link href={item.href} className={cn(textLinkClassName, 'mt-4')}>
                  Open
                  <ArrowRight className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-border border-t py-16">
        <div className="container max-w-3xl">
          <p className={eyebrowClassName}>
            <span className="bg-primary h-px w-8" aria-hidden />
            Operating area
          </p>
          <p className={cn(bodyCopyClassName, 'text-base md:text-lg')}>{operatingAreaStatement} This is a deployment area. It is not a list of offices.</p>
        </div>
      </section>

      <CTASection
        title="Request a proposal"
        description="Send the venue, the date, and the programme. MAP will reply with the service, the system, and a written proposal."
        buttons={[{ text: 'Request a proposal', href: '/contact?subject=broadcasting' }]}
        offices={[]}
      />
    </div>
  )
}
