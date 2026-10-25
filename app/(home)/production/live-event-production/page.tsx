import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { serviceContent } from '@/components/website/services/live-event-production.data'
import { ServiceLinePage } from '@/components/website/services/service-line-page'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'Live Event Production | MAP',
    description:
      'MAP owns the live programme for the room and the remote audience. The broadcast operation, vehicles, and crew are specified separately.',
    pathname: '/production/live-event-production',
    keywords: [
      'live event production dubai',
      'conference live production dubai',
      'live streaming dubai',
      'conference broadcasting dubai',
      'OB van dubai',
    ],
  })
}

export default function LiveEventProductionPage() {
  return <ServiceLinePage pathname="/production/live-event-production" content={serviceContent} />
}
