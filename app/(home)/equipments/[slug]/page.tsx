import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { cache } from 'react';

import { equipmentsService } from '@/services/equipments/equipments.service';
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta';
import { capitalizeEachWord } from '@/utils/format';
import { EquipmentType } from '@/types/equipments/equipment.enum';
import type { IEquipment } from '@/types/equipments/equipment.type';
import { EquipmentGallery } from '@/components/website/equipments/view/equipment-gallery';
import { EquipmentSpecs } from '@/components/website/equipments/view/equipment-specs';
import { EquipmentEnquiry } from '@/components/website/equipments/equipment-enquiry';
import { singleEquipmentSchema } from '@/utils/seo/schema/equipments/single-equipment-schema';
import { CTASection } from '@/components/website/common/cta-section';
import { displayTitleClassName } from '@/components/website/common/marketing-styles';
import SafeHtmlContent from '@/components/shared/safe-html-content';
import { cn } from '@/lib/utils';

interface EquipmentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const loadEquipment = cache((slug: string) => equipmentsService.getBySlug(slug));

export async function generateMetadata({ params }: EquipmentPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const equipment = await loadEquipment(slug);

    const keywords = [
      equipment.name,
      equipment.brand?.name,
      equipment.category?.name,
      equipment.equipmentType,
      'equipment',
      'rental',
      'media production',
    ].filter(Boolean) as string[];

    return createEnhancedMetadata({
      title: { absolute: `${equipment.name} for Rent in UAE` },
      description:
        equipment.summary || equipment.description || `${equipment.name} - Professional equipment rental`,
      type: 'article',
      keywords,
      pathname: `/equipments/${equipment.slug}`,
      image: equipment.coverPath || undefined,
      mainOverrides: {
        category: equipment.equipmentType,
      },
      openGraphOverrides: {
        section: equipment.equipmentType,
        images:
          equipment.gallery && equipment.gallery.length > 0
            ? equipment.gallery.sort((a, b) => a.order - b.order).map(item => ({ url: item.path }))
            : equipment.coverPath,
      },
    });
  } catch {
    return {
      title: 'Equipment Not Found',
      description: 'Equipment not found',
    };
  }
}

export default async function EquipmentPage({ params }: EquipmentPageProps) {
  const { slug } = await params;
  let equipment: IEquipment | null = null;

  try {
    equipment = await loadEquipment(slug);
  } catch {
    equipment = null;
  }

  if (!equipment) notFound();

  const images =
    equipment.gallery && equipment.gallery.length > 0
      ? equipment.gallery.sort((a, b) => a.order - b.order).map(item => item.path)
      : equipment.coverPath
        ? [equipment.coverPath]
        : [];

  const jsonLd = await singleEquipmentSchema(equipment);
  const eyebrow = [equipment.brand?.name, equipment.category?.name, equipment.equipmentType ? capitalizeEachWord(equipment.equipmentType) : null]
    .filter(Boolean) as string[];
  const facts = [
    equipment.brand?.name ? { label: 'Brand', value: equipment.brand.name } : null,
    equipment.category?.name ? { label: 'Category', value: equipment.category.name } : null,
    equipment.equipmentType ? { label: 'Type', value: capitalizeEachWord(equipment.equipmentType) } : null,
  ].filter((fact): fact is { label: string; value: string } => fact !== null);

  return (
    <div className="bg-background min-h-screen">
      <script
        id="equipment-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <section className="pt-[4.5rem]">
        <div className="container pt-8 pb-2 md:pt-12">
          <nav aria-label="breadcrumb">
            <ol className="text-muted-foreground flex flex-nowrap items-center gap-2 overflow-hidden text-[13px]">
              <li className="shrink-0">
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li className="shrink-0" aria-hidden>
                /
              </li>
              <li className="shrink-0">
                <Link href="/equipment-rental" className="hover:text-foreground">
                  Equipment rental
                </Link>
              </li>
              <li className="shrink-0" aria-hidden>
                /
              </li>
              <li className="text-foreground min-w-0 truncate">{equipment.name}</li>
            </ol>
          </nav>

          <header className="mt-6 max-w-3xl">
            {eyebrow.length > 0 ? (
              <p className="text-muted-foreground mb-4 flex flex-wrap items-center gap-x-3 text-[11px] font-medium tracking-[0.16em] uppercase">
                {eyebrow.map((item, index) => (
                  <span key={`${item}-${index}`} className="flex items-center gap-3">
                    {index > 0 ? <span aria-hidden>/</span> : null}
                    {item}
                  </span>
                ))}
              </p>
            ) : null}
            <h1 className={cn(displayTitleClassName, 'text-3xl md:text-5xl')}>{equipment.name}</h1>
            <div className="bg-primary mt-5 h-px w-12" aria-hidden />
            {equipment.summary ? (
              <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed font-light md:text-lg">
                {equipment.summary}
              </p>
            ) : null}
          </header>
        </div>
      </section>

      <section className="container grid grid-cols-1 items-start gap-12 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
        <div className="min-w-0 space-y-14 md:space-y-16">
          {images.length > 0 ? <EquipmentGallery images={images} equipmentName={equipment.name} /> : null}
          {equipment.description ? (
            <div>
              <h2 className={cn(displayTitleClassName, 'mb-6 text-2xl md:text-3xl')}>About this item</h2>
              <SafeHtmlContent
                content={equipment.description}
                className="prose-headings:font-medium prose-p:font-light"
                size="sm"
              />
            </div>
          ) : null}
          <div>
            <h2 className={cn(displayTitleClassName, 'mb-6 text-2xl md:text-3xl')}>Specifications</h2>
            <EquipmentSpecs specs={equipment.specs} equipmentType={equipment.equipmentType as EquipmentType} />
          </div>
        </div>
        <EquipmentEnquiry name={equipment.name} facts={facts} />
      </section>

      <CTASection
        title="Request a proposal"
        description="Share the dates and the kit list. MAP will confirm availability from the stores in Dubai and send a written quote."
        buttons={[{ text: 'Contact', href: '/contact' }]}
      />
    </div>
  );
}
