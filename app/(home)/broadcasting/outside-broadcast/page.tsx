import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { BroadcastServicePage } from '@/components/website/broadcasting/broadcast-service-page'
import { outsideBroadcastService } from '@/components/website/broadcasting/service-pages.data'
import { offeringSchema } from '@/utils/seo/schema/broadcasts/offering-schema'

const pathname = '/broadcasting/outside-broadcast'
const description = 'Outside broadcast production for ceremonies, concerts, and open sites. MAP surveys the venue, brings the vehicle and crew, and runs the programme.'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'Outside Broadcast Production | MAP',
    description,
    pathname,
  })
}

export default async function OutsideBroadcastPage() {
  const jsonLd = await offeringSchema({
    name: 'Outside broadcast production',
    description,
    pathname,
    breadcrumbs: [
      { name: 'Home', url: '' },
      { name: 'Broadcasting', url: '/broadcasting' },
      { name: 'Outside broadcast', url: pathname },
    ],
  })

  return (
    <>
      <script id="outside-broadcast-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <BroadcastServicePage content={outsideBroadcastService} />
    </>
  )
}
