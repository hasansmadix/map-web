import { notFound, permanentRedirect } from 'next/navigation'
import { getUnit } from '@/content/broadcast-units'
import { unitPath } from '@/content/broadcast-units/schema'

const reservedSlugs = new Set(['ob-van-preview', 'studio-preview'])

export default async function LegacyUnitRedirect({ params }: { params: Promise<{ unitSlug: string }> }) {
  const { unitSlug } = await params
  if (reservedSlugs.has(unitSlug)) notFound()

  const unit = getUnit(unitSlug)
  if (!unit) notFound()

  permanentRedirect(unitPath(unit))
}
