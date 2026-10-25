import { Suspense } from 'react';

import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta';
import type { Metadata } from 'next';
import { PageSection } from '@/components/website/common/page-section';
import { CTASection } from '@/components/website/common/cta-section';

import { HomeHero } from '@/components/website/home/home-hero';
import { HomeIntro } from '@/components/website/home/home-intro';
import { HomeEquipment } from '@/components/website/home/home-equipment';
import { HomeFeaturePanels } from '@/components/website/home/home-feature-panels';
import { HomeIndustries } from '@/components/website/home/home-industries';
import { WhatWeDoSection } from '@/components/website/home/what-we-do-section';
import { WorkflowSection } from '@/components/website/home/workflow-section';
import { ArticlesSection } from '@/components/website/home/articles/articles-section';

import { workflowSteps } from '@/components/website/home/home-page.data';

import SectionSkeleton from '@/components/shared/skeletons/section-skeletion';
import { homeSchema } from '@/utils/seo/schema/home/home-schema';

export async function generateMetadata(): Promise<Metadata> {
  const metaData = createEnhancedMetadata({
    title: 'MAP Media Art Production | Film, broadcast, and production',
    description:
      'MAP produces programmes for companies, institutions, and live events from B29, Dubai Production City. Equipment rental, outside broadcast, and full production across the UAE and the Gulf.',
    pathname: '/',
    mainOverrides: {
      category: 'media production',
    },
  });

  return metaData;
}

export default async function Page() {
  const jsonLd = await homeSchema();

  return (
    <div className="bg-background min-h-screen">
      <script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <HomeHero />
      <HomeIntro />
      <WhatWeDoSection />

      <HomeEquipment />
      <HomeFeaturePanels />
      <HomeIndustries />
      <WorkflowSection steps={workflowSteps} />

      <PageSection>
        <Suspense fallback={<SectionSkeleton />}>
          <ArticlesSection />
        </Suspense>
      </PageSection>

      <CTASection
        title="Tell us the date and the venue"
        description="MAP replies with the crew, the kit, and a written proposal."
        buttons={[{ text: 'Request a proposal', href: '/contact?subject=rfq' }]}
      />
    </div>
  );
}
