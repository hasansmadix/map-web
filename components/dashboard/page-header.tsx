'use client'

import { cn } from '@/lib/utils'
import { PageSlotTarget } from '@/components/dashboard/page-slot'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  meta?: ReactNode
  titleClassName?: string
  backHref?: string
  backLabel?: string
  actions?: ReactNode
  className?: string
  compact?: boolean
}

export function PageHeader({
  title,
  description,
  meta,
  titleClassName,
  backHref,
  backLabel = 'Back',
  actions,
  className,
  compact = false,
}: PageHeaderProps) {
  return (
    <header className={cn('map-page-header', compact && 'map-page-header--compact', className)}>
      {backHref ? (
        <Link href={backHref} className="map-page-back group">
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          {backLabel}
        </Link>
      ) : compact ? null : (
        <span className="map-page-rule" aria-hidden />
      )}

      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className={cn('map-page-title', compact && 'map-page-title--compact', titleClassName)}>{title}</h1>
            <PageSlotTarget name="count" className="map-page-count" />
          </div>
          {meta ? <div className="flex min-w-0 flex-wrap items-center gap-2">{meta}</div> : null}
          {description ? <p className="map-page-desc">{description}</p> : null}
        </div>

        <div className="map-page-actions">
          {actions}
          <PageSlotTarget name="actions" className="contents" />
        </div>
      </div>
    </header>
  )
}
