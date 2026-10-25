import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { serviceContent } from '@/components/website/services/corporate-video-production.data'
import { ServiceLinePage } from '@/components/website/services/service-line-page'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'Corporate Video Production Dubai | Business & Company Videos | MAP',
    description:
      'Corporate films in Dubai. Company profiles, internal communications, and sales films for organisations across the UAE and the Gulf.',
    pathname: '/production/corporate-video-production',
    keywords: [
      'corporate video production dubai',
      'business video production dubai',
      'company video production dubai',
      'company video dubai',
      'corporate film production dubai',
    ],
  })
}

export default function CorporateVideoProductionPage() {
  return <ServiceLinePage pathname="/production/corporate-video-production" content={serviceContent} />
}
