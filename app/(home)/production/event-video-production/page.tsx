import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { serviceContent } from '@/components/website/services/event-video-production.data'
import { ServiceLinePage } from '@/components/website/services/service-line-page'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'Event Video Production Dubai | Conference & Corporate Filming | MAP',
    description:
      'Event filming in Dubai. Conferences, launches, exhibitions, and ceremonies, cut into films you can send after the day.',
    pathname: '/production/event-video-production',
    keywords: [
      'event video production dubai',
      'conference video production dubai',
      'corporate event filming dubai',
      'event videography dubai',
    ],
  })
}

export default function EventVideoProductionPage() {
  return <ServiceLinePage pathname="/production/event-video-production" content={serviceContent} />
}
