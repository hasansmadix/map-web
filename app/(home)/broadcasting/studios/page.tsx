import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { FleetIndex } from '@/components/website/broadcasting/fleet-index'
import { offeringSchema } from '@/utils/seo/schema/broadcasts/offering-schema'

const pathname = '/broadcasting/studios'
const description = 'MAP’s broadcast studio facility in Dubai. Area, rooms, and the control inventory are on the unit page. Filming sessions are a separate production service.'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'Broadcast Studio | MAP',
    description,
    pathname,
  })
}

export default async function StudiosPage() {
  const jsonLd = await offeringSchema({
    name: 'Broadcast studio',
    description,
    pathname,
    breadcrumbs: [
      { name: 'Home', url: '' },
      { name: 'Broadcasting', url: '/broadcasting' },
      { name: 'Studios', url: pathname },
    ],
  })

  return (
    <>
      <script id="studios-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <FleetIndex
        kind="studio"
        content={{
          title: 'Broadcast studio',
          lead: 'A fixed studio and control inventory in Dubai. A filmed interview or green-screen day is the studio production service, not this specification.',
          breadcrumbs: [
            { label: 'Home', href: '/' },
            { label: 'Broadcasting', href: '/broadcasting' },
            { label: 'Studios' },
          ],
          sibling: { text: 'Studio sessions', href: '/production/studio-video-production' },
          ctaHref: '/contact?subject=studio-facility',
          ctaTitle: 'Ask about the studio',
          ctaDescription: 'Send the date and the programme. MAP will confirm whether Studio 1 is the right room. This is not a published day rate.',
        }}
      />
    </>
  )
}
