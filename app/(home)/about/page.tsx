import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { generateAboutPageSchema } from '@/utils/seo/schema/about/about-schema'
import { AboutPageView } from '@/components/website/about/about-page'

export async function generateMetadata(): Promise<Metadata> {
  return createEnhancedMetadata({
    title: 'About Us | MAP Media Art Production',
    description:
      'MAP Media Art Production is a production house at B29, Dubai Production City. 25+ years of filming, broadcasting, and studio work across the UAE and the Gulf.',
    pathname: '/about',
    mainOverrides: {
      category: 'Company Profile',
    },
  })
}

export default async function AboutPage() {
  const jsonLd = await generateAboutPageSchema()

  return (
    <>
      <script
        id="about-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <AboutPageView />
    </>
  )
}
