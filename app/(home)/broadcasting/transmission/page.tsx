import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { BroadcastServicePage } from '@/components/website/broadcasting/broadcast-service-page'
import { transmissionService } from '@/components/website/broadcasting/service-pages.data'
import { offeringSchema } from '@/utils/seo/schema/broadcasts/offering-schema'

const pathname = '/broadcasting/transmission'
const description = 'Broadcast contribution and distribution from the venue to the destinations in the brief. The path is specified per engagement.'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'Broadcast Transmission and Contribution | MAP',
    description,
    pathname,
  })
}

export default async function TransmissionPage() {
  const jsonLd = await offeringSchema({
    name: 'Broadcast transmission and contribution',
    description,
    pathname,
    breadcrumbs: [
      { name: 'Home', url: '' },
      { name: 'Broadcasting', url: '/broadcasting' },
      { name: 'Transmission', url: pathname },
    ],
  })

  return (
    <>
      <script id="transmission-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <BroadcastServicePage content={transmissionService} />
    </>
  )
}
