import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { LegalDocument } from '@/components/website/legal/legal-document'
import { privacyDocument } from '@/components/website/legal/legal.data'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'Privacy Policy | MAP',
    description:
      'How MAP Media Art Production collects, uses, and keeps personal information submitted through this website and through an enquiry.',
    pathname: '/legal/privacy',
    mainOverrides: {
      category: 'Legal',
    },
  })
}

export default function PrivacyPage() {
  return <LegalDocument document={privacyDocument} related={{ href: '/legal/terms', title: 'Terms of service' }} />
}
