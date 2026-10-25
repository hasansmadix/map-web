import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { serviceContent } from '@/components/website/services/studio-video-production.data'
import { ServiceLinePage } from '@/components/website/services/service-line-page'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'Studio Video Production Dubai | Green Screen & Interview Filming | MAP',
    description:
      'Studio production in Dubai. Interviews, green screen, and product filming in a controlled room, finished in-house.',
    pathname: '/production/studio-video-production',
    keywords: [
      'studio video production dubai',
      'studio filming dubai',
      'green screen dubai',
      'interview filming dubai',
      'video studio dubai',
    ],
  })
}

export default function StudioVideoProductionPage() {
  return <ServiceLinePage pathname="/production/studio-video-production" content={serviceContent} />
}
