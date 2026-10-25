import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { BroadcastServicePage } from '@/components/website/broadcasting/broadcast-service-page'
import { technicalCrewService } from '@/components/website/broadcasting/service-pages.data'
import { offeringSchema } from '@/utils/seo/schema/broadcasts/offering-schema'

const pathname = '/broadcasting/technical-crew'
const description = 'Broadcast engineers, camera operators, vision and replay operators, and technical leads. Crew with a MAP unit, or for a visiting production.'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'Broadcast Engineering and Technical Crew | MAP',
    description,
    pathname,
  })
}

export default async function TechnicalCrewPage() {
  const jsonLd = await offeringSchema({
    name: 'Broadcast engineering and technical crew',
    description,
    pathname,
    breadcrumbs: [
      { name: 'Home', url: '' },
      { name: 'Broadcasting', url: '/broadcasting' },
      { name: 'Technical crew', url: pathname },
    ],
  })

  return (
    <>
      <script id="technical-crew-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <BroadcastServicePage content={technicalCrewService} />
    </>
  )
}
