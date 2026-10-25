import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { serviceContent } from '@/components/website/services/commercial-video-production.data'
import { ServiceLinePage } from '@/components/website/services/service-line-page'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'Commercial Video Production Dubai | Advertising & Branded Content | MAP',
    description:
      'Commercial production in Dubai. Broadcast spots, digital ads, and branded films for agencies and brands across the UAE and the Gulf.',
    pathname: '/production/commercial-video-production',
    keywords: [
      'commercial video production dubai',
      'advertising video production dubai',
      'branded content production dubai',
      'TV commercial production dubai',
      'advertising agency dubai',
    ],
  })
}

export default function CommercialVideoProductionPage() {
  return <ServiceLinePage pathname="/production/commercial-video-production" content={serviceContent} />
}
