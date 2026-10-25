import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { LegalDocument } from '@/components/website/legal/legal-document'
import { termsDocument } from '@/components/website/legal/legal.data'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'Terms of Service | MAP',
    description:
      'Terms for using the MAP Media Art Production website. A production, broadcast, or equipment hire is governed by its written proposal.',
    pathname: '/legal/terms',
    mainOverrides: {
      category: 'Legal',
    },
  })
}

export default function TermsPage() {
  return <LegalDocument document={termsDocument} related={{ href: '/legal/privacy', title: 'Privacy policy' }} />
}
