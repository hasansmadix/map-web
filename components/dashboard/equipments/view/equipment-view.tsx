'use client'

import { PageHeader } from '@/components/dashboard/page-header'
import ApiError from '@/components/shared/api-error'
import HtmlViewer from '@/components/shared/html-viewer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useEquipmentById } from '@/hooks/api/equipments/use-equipments'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { EquipmentType } from '@/types/equipments/equipment.enum'
import type { IEquipment } from '@/types/equipments/equipment.type'
import { Package, Pencil } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import EquipmentSpecs from './equipment-specs'
import EquipmentViewSkeleton from './equipment-view-skeleton'

const TYPE_LABEL: Record<string, string> = {
  [EquipmentType.CAMERA]: 'Camera',
  [EquipmentType.LENS]: 'Lens',
  [EquipmentType.LIGHT]: 'Light',
  [EquipmentType.AUDIO]: 'Audio',
  [EquipmentType.ACCESSORY]: 'Accessory',
}

function collectMedia(equipment: IEquipment) {
  const gallery = [...(equipment.gallery || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map(item => item.path)
  return [...new Set([equipment.coverPath, ...gallery].map(path => path?.trim()).filter((path): path is string => Boolean(path)))]
}

function MediaStage({ urls, alt }: { urls: string[]; alt: string }) {
  const [active, setActive] = useState(0)
  const index = Math.min(active, Math.max(0, urls.length - 1))
  const current = urls[index]

  if (!current) {
    return (
      <div className="border-border bg-muted/30 text-muted-foreground flex aspect-[16/9] flex-col items-center justify-center gap-3 border border-dashed">
        <Package className="size-12 opacity-40" strokeWidth={1} />
        <span className="text-xs font-light">No image</span>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="border-border bg-muted/30 relative aspect-[16/9] overflow-hidden border">
        <Image
          src={current}
          alt={alt}
          fill
          priority={index === 0}
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          unoptimized={current.includes('supabase.co') || current.startsWith('http')}
        />
        {urls.length > 1 ? (
          <span className="bg-background/85 text-foreground absolute end-3 bottom-3 px-2 py-1 text-[11px] tracking-[0.12em] tabular-nums">
            {index + 1} / {urls.length}
          </span>
        ) : null}
      </div>
      {urls.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {urls.map((url, i) => (
            <button
              key={`${url}-${i}`}
              type="button"
              aria-current={i === index}
              onClick={() => setActive(i)}
              className={cn(
                'relative aspect-[4/3] w-20 shrink-0 overflow-hidden border transition',
                i === index ? 'border-primary' : 'border-border opacity-60 hover:opacity-100',
              )}
            >
              <Image src={url} alt="" fill sizes="80px" className="object-cover" unoptimized={url.includes('supabase.co') || url.startsWith('http')} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function Fact({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div className="border-border border-b px-5 py-4 last:border-b-0">
      <dt className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">{label}</dt>
      <dd className="mt-1 text-sm font-medium">{value}</dd>
    </div>
  )
}

function EquipmentRecord({ equipment }: { equipment: IEquipment }) {
  const urls = useMemo(() => collectMedia(equipment), [equipment])

  return (
    <div className="space-y-6">
      <PageHeader
        title={equipment.name}
        description={equipment.summary}
        backHref="/dashboard/equipments"
        backLabel="Equipment"
        meta={
          <>
            <Badge variant="outline">{TYPE_LABEL[equipment.equipmentType] || equipment.equipmentType}</Badge>
            <Badge variant={equipment.isPublished ? 'default' : 'secondary'}>{equipment.isPublished ? 'Published' : 'Draft'}</Badge>
            {equipment.isFeatured ? <Badge variant="outline">Featured</Badge> : null}
          </>
        }
        actions={
          <Button asChild>
            <Link href={`/dashboard/equipments/${equipment.id}`}>
              <Pencil className="size-4" />
              Edit
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-8">
        <div className="min-w-0 space-y-6">
          <MediaStage urls={urls} alt={equipment.name} />
          {equipment.description ? (
            <section className="border-border bg-card border">
              <h2 className="border-border text-muted-foreground border-b px-5 py-3.5 text-[11px] font-medium tracking-[0.16em] uppercase">
                Description
              </h2>
              <div className="px-5 py-5">
                <HtmlViewer content={equipment.description} />
              </div>
            </section>
          ) : null}
          <EquipmentSpecs specs={equipment.specs} />
        </div>

        <aside className="border-border bg-card lg:sticky lg:top-[calc(var(--app-header-height)+1.5rem)] border">
          <h2 className="border-border text-muted-foreground border-b px-5 py-3.5 text-[11px] font-medium tracking-[0.16em] uppercase">
            Record
          </h2>
          <dl>
            <Fact label="Brand" value={equipment.brand?.name} />
            <Fact label="Category" value={equipment.category?.name} />
            <Fact label="Slug" value={equipment.slug} />
            <Fact label="Status" value={equipment.status} />
            <Fact label="Added" value={equipment.createdAt ? formatDate(equipment.createdAt) : null} />
            <Fact label="Updated" value={equipment.updatedAt ? formatDate(equipment.updatedAt) : null} />
          </dl>
        </aside>
      </div>
    </div>
  )
}

function EquipmentView({ equipmentId }: { equipmentId: string | number }) {
  const { equipment, isLoading, isError, error, refetch } = useEquipmentById(equipmentId)

  if (isLoading) return <EquipmentViewSkeleton />
  if (isError || !equipment) return <ApiError errorMessage={error || 'Failed to load equipment'} refetchFunction={refetch} />

  return <EquipmentRecord equipment={equipment} />
}

export default EquipmentView
