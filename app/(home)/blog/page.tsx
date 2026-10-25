import { Suspense } from 'react';

import { BlogSection, BlogSectionSkeleton } from '@/components/website/blog/blog-section';
import { PageHero, PageSection } from '@/components/website/common/page-components';
import { CTASection } from '@/components/website/common/cta-section';
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta';

interface Props {
  searchParams?: Promise<{
    search?: string;
    page?: string;
    limit?: string;
    isFeatured?: string;
  }>;
}

export function generateMetadata() {
  return createEnhancedMetadata({
    title: 'Media Production Insights & Creative Blog | MAP Media Art Production',
    description:
      'Notes on film, broadcast, and studio production from MAP Media Art Production in Dubai.',
    pathname: '/blog',
    mainOverrides: {
      category: 'Media Production Insights',
    },
  });
}

export default async function BlogPage(props: Props) {
  const searchParams = await props.searchParams;

  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 12;
  const search = searchParams?.search || '';
  const isFeatured = searchParams?.isFeatured === 'true' ? true : undefined;

  return (
    <div className="bg-background min-h-screen">
      <PageHero
        eyebrow="Blog"
        title="Blog"
        description="Notes on production, broadcast, and the programmes MAP delivers for organisations."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blog' },
        ]}
        buttons={[]}
      />

      <PageSection>
        <Suspense
          key={`${page} | ${search} | ${isFeatured ? 'featured' : 'all'}`}
          fallback={<BlogSectionSkeleton />}
        >
          <BlogSection page={page} limit={limit} search={search} isFeatured={isFeatured} />
        </Suspense>
      </PageSection>

      <CTASection
        title="Request a proposal"
        description="Share the date, the format, and where the programme needs to play. MAP will reply with a crew and a written proposal."
        buttons={[{ text: 'Contact', href: '/contact' }]}
      />
    </div>
  );
}
