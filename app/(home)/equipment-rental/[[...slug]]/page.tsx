import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { intentsService } from '@/services/intents/intents.service';
import { equipmentCategoriesService } from '@/services/equipments/equipment-categories.service';
import { equipmentBrandsService } from '@/services/equipments/equipment-brands.service';
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta';
import { IntentBreadcrumb } from '@/components/website/intents/intent-breadcrumb';
import { IntentInternalLinks } from '@/components/website/intents/intent-internal-links';
import { IntentFAQ } from '@/components/website/intents/intent-faq';
import { IntentSmartBadges } from '@/components/website/intents/intent-smart-badges';
import { IntentEquipmentFilters } from '@/components/website/intents/intent-equipment-filters';
import { IntentEquipmentGrid } from '@/components/website/intents/intent-equipment-grid';
import { CTASection } from '@/components/website/common/cta-section';
import { displayTitleClassName } from '@/components/website/common/marketing-styles';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';
import { EquipmentGridSkeleton } from '@/components/website/equipments/equipment-grid-skeleton';
import SafeHtmlContent from '@/components/shared/safe-html-content';

interface Props {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const slugPart = slug?.[0];
  let intent;
  try {
    intent = slugPart ? await intentsService.getBySlug(slugPart) : await intentsService.getHub();
  } catch {
    return { title: 'Equipment Rental' };
  }
  const keywords = intent.metaKeywords
    ? (typeof intent.metaKeywords === 'string' ? intent.metaKeywords.split(',') : intent.metaKeywords)
    : [];
  return createEnhancedMetadata({
    title: intent.metaTitle || intent.h1 || 'Equipment Rental',
    description: intent.metaDescription || '',
    keywords: Array.isArray(keywords) ? keywords : [],
    pathname: slugPart ? `/equipment-rental/${slugPart}` : '/equipment-rental',
  });
}

export default async function EquipmentRentalIntentPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const search = await searchParams;
  const slugPart = slug?.[0];

  let intent;
  try {
    intent = slugPart ? await intentsService.getBySlug(slugPart) : await intentsService.getHub();
  } catch {
    notFound();
  }

  const searchParamsRecord = Object.fromEntries(
    Object.entries(search).filter(([, v]) => typeof v === 'string') as [string, string][],
  );

  const [{ data: categoriesData }, { data: brandsData }] = await Promise.all([
    equipmentCategoriesService.getAllPublic({ limit: 100 }),
    equipmentBrandsService.getAllPublic({ limit: 100 }),
  ]);
  const categoriesList = categoriesData || [];
  const brandsList = brandsData || [];

  return (
    <div className="bg-background min-h-screen">
      <section className="pt-[4.5rem]">
        <div className="container pt-8 pb-8 md:pt-12 md:pb-10">
          <IntentBreadcrumb breadcrumbs={intent.breadcrumbs} />
          <header className="mt-6 max-w-3xl">
            <h1 className={cn(displayTitleClassName, 'text-3xl md:text-5xl')}>
              {intent.h1 || 'Equipment rental'}
            </h1>
            <div className="bg-primary mt-5 h-px w-12" aria-hidden />
            {intent.subHeading ? (
              <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed font-light md:text-lg">
                {intent.subHeading}
              </p>
            ) : null}
          </header>
          {intent.smartBadges?.length > 0 ? (
            <div className="mt-8">
              <IntentSmartBadges smartBadges={intent.smartBadges} />
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-border bg-background/95 sticky top-[4.5rem] z-40 border-y backdrop-blur-md">
        <div className="container">
          <IntentEquipmentFilters categories={categoriesList} brands={brandsList} />
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <Suspense
          key={JSON.stringify({ ...intent.equipmentFilters, ...searchParamsRecord })}
          fallback={<EquipmentGridSkeleton />}
        >
          <IntentEquipmentGrid
            equipmentFilters={intent.equipmentFilters}
            searchParams={searchParamsRecord}
          />
        </Suspense>

        {intent.content ? (
          <SafeHtmlContent
            content={intent.content}
            className="prose-headings:font-medium mt-16 border-t pt-12"
            size="sm"
          />
        ) : null}

        {intent.internalLinks?.length > 0 ? (
          <div className="border-border mt-16 border-t pt-12">
            <h2 className="mb-6 text-sm font-medium tracking-[0.16em] uppercase">Related</h2>
            <IntentInternalLinks internalLinks={intent.internalLinks} />
          </div>
        ) : null}

        <div className="border-border mt-16 border-t pt-12">
          <IntentFAQ intent={intent} />
        </div>
      </section>

      <CTASection
        title="Request a proposal"
        description="Share the dates and the kit list. MAP will confirm availability from the stores in Dubai and send a written quote."
        buttons={[{ text: 'Contact', href: '/contact' }]}
      />
    </div>
  );
}
