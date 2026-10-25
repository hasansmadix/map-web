import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { BroadcastServicePage } from '@/components/website/broadcasting/broadcast-service-page'
import { sportsBroadcastingService } from '@/components/website/broadcasting/service-pages.data'
import { offeringSchema } from '@/utils/seo/schema/broadcasts/offering-schema'

const pathname = '/broadcasting/sports-broadcasting'
const description = 'Sports broadcasting for matches, sessions, and tournaments. Multi-camera coverage and replay, housed in an OB van or a flypack.'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'Sports Broadcasting | MAP',
    description,
    pathname,
  })
}

export default async function SportsBroadcastingPage() {
  const jsonLd = await offeringSchema({
    name: 'Sports broadcasting',
    description,
    pathname,
    breadcrumbs: [
      { name: 'Home', url: '' },
      { name: 'Broadcasting', url: '/broadcasting' },
      { name: 'Sports broadcasting', url: pathname },
    ],
  })

  return (
    <>
      <script id="sports-broadcasting-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <BroadcastServicePage content={sportsBroadcastingService} />
    </>
  )
}
