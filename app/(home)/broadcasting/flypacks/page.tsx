import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { FleetIndex } from '@/components/website/broadcasting/fleet-index'
import { offeringSchema } from '@/utils/seo/schema/broadcasts/offering-schema'

const pathname = '/broadcasting/flypacks'
const description = 'Flypacks and portable flight-case broadcast systems for rooms reached by dock or lift. Compare format, cameras, and vision mixing.'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'Flypacks and Portable Broadcast Systems | MAP',
    description,
    pathname,
  })
}

export default async function FlypacksPage() {
  const jsonLd = await offeringSchema({
    name: 'Flypacks and portable broadcast systems',
    description,
    pathname,
    breadcrumbs: [
      { name: 'Home', url: '' },
      { name: 'Broadcasting', url: '/broadcasting' },
      { name: 'Flypacks', url: pathname },
    ],
  })

  return (
    <>
      <script id="flypacks-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <FleetIndex
        kind="flight-case"
        content={{
          title: 'Flypacks',
          lead: 'Flight-case broadcast systems for ballrooms, halls, and exhibition floors. A truck is the other class, when the site can park one.',
          breadcrumbs: [
            { label: 'Home', href: '/' },
            { label: 'Broadcasting', href: '/broadcasting' },
            { label: 'Flypacks' },
          ],
          sibling: { text: 'OB vans', href: '/broadcasting/ob-vans' },
          ctaHref: '/contact?subject=flypack',
          ctaTitle: 'Request a flypack',
          ctaDescription: 'Send the room and the run of show. MAP will confirm which flight-case system fits.',
        }}
      />
    </>
  )
}
