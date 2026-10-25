import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { FleetIndex } from '@/components/website/broadcasting/fleet-index'
import { offeringSchema } from '@/utils/seo/schema/broadcasts/offering-schema'

const pathname = '/broadcasting/ob-vans'
const description = 'OB vans MAP publishes for outside broadcast. Open a vehicle for format, camera chains, vision mixing, and the equipment list.'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'OB Vans | MAP',
    description,
    pathname,
  })
}

export default async function ObVansPage() {
  const jsonLd = await offeringSchema({
    name: 'OB vans',
    description,
    pathname,
    breadcrumbs: [
      { name: 'Home', url: '' },
      { name: 'Broadcasting', url: '/broadcasting' },
      { name: 'OB vans', url: pathname },
    ],
  })

  return (
    <>
      <script id="ob-vans-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <FleetIndex
        kind="obvan"
        content={{
          title: 'OB vans',
          lead: 'Mobile production vehicles for sites that can park one and cable to the stage or the field. When the venue cannot, the flypack index is the other class.',
          breadcrumbs: [
            { label: 'Home', href: '/' },
            { label: 'Broadcasting', href: '/broadcasting' },
            { label: 'OB vans' },
          ],
          sibling: { text: 'Flypacks', href: '/broadcasting/flypacks' },
          ctaHref: '/contact?subject=ob-van',
          ctaTitle: 'Request a vehicle',
          ctaDescription: 'Send the venue and the date. MAP will confirm whether a published vehicle fits the programme.',
        }}
      />
    </>
  )
}
