import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { BroadcastServicePage } from '@/components/website/broadcasting/broadcast-service-page'
import { liveProductionService } from '@/components/website/broadcasting/service-pages.data'
import { offeringSchema } from '@/utils/seo/schema/broadcasts/offering-schema'

const pathname = '/broadcasting/live-production'
const description = 'Live multi-camera production: vision mixing, graphics, recording, and delivery. The system may be an OB van, a flypack, or the Dubai studio.'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'Live and Multi-Camera Production | MAP',
    description,
    pathname,
  })
}

export default async function LiveProductionPage() {
  const jsonLd = await offeringSchema({
    name: 'Live and multi-camera production',
    description,
    pathname,
    breadcrumbs: [
      { name: 'Home', url: '' },
      { name: 'Broadcasting', url: '/broadcasting' },
      { name: 'Live production', url: pathname },
    ],
  })

  return (
    <>
      <script id="live-production-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <BroadcastServicePage content={liveProductionService} />
    </>
  )
}
