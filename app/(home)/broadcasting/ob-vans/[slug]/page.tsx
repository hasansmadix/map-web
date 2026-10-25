import type { Metadata } from 'next'
import { createEnhancedMetadata } from '@/utils/seo/meta/enhanced-meta'
import { BroadcastUnitView } from '@/components/website/broadcasting/unit-page'
import { getUnit, listUnits } from '@/content/broadcast-units'
import { unitPath } from '@/content/broadcast-units/schema'

export const dynamicParams = false

export function generateStaticParams() {
  return listUnits('obvan').map(unit => ({ slug: unit.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const unit = getUnit(slug)
  if (!unit || unit.kind !== 'obvan') return {}

  return createEnhancedMetadata({
    title: { absolute: unit.meta.title },
    description: unit.meta.description,
    pathname: unitPath(unit),
  })
}

export default async function ObVanUnitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <BroadcastUnitView slug={slug} kind="obvan" />
}
