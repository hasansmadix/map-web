import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { ServicesIndex } from '@/components/website/services/services-index'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'Production Services | Commercial, Corporate, Live and Studio | MAP',
    description:
      'MAP plans, crews, and delivers commercial, corporate, event, live, and studio programmes from Dubai Production City across the UAE and the Gulf.',
    pathname: '/production',
    keywords: [
      'video production dubai',
      'production company dubai',
      'filming services dubai',
      'corporate video production dubai',
      'video production company UAE',
    ],
  })
}

export default function ServicesPage() {
  return <ServicesIndex />
}
