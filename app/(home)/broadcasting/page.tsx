import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { BroadcastHub } from '@/components/website/broadcasting/broadcast-hub'
import { offeringSchema } from '@/utils/seo/schema/broadcasts/offering-schema'

const description = 'Outside broadcast, live multi-camera production, sports, transmission, and technical crew. OB vans, flypacks, and a Dubai studio for programmes across the GCC.'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'Broadcast Production for the UAE and GCC | MAP',
    description,
    pathname: '/broadcasting',
  })
}

export default async function BroadcastingPage() {
  const jsonLd = await offeringSchema({
    name: 'Broadcast production',
    description,
    pathname: '/broadcasting',
    breadcrumbs: [
      { name: 'Home', url: '' },
      { name: 'Broadcasting', url: '/broadcasting' },
    ],
  })

  return (
    <>
      <script id="broadcasting-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <BroadcastHub />
    </>
  )
}
