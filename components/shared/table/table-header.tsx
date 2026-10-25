'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePageSlot } from '@/components/dashboard/page-slot'
import { Loader2, Plus, X } from 'lucide-react'
import { memo, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export interface FilterInfo {
  key: string
  label: string
  value: string
  onRemove?: () => void
}

export interface TableHeaderProps {
  title: string
  total: number
  currentPage: number
  totalPages: number
  isLoading: boolean
  searchTerm?: string
  filters: FilterInfo[]
  onClearAllFilters: () => void
  onClearSearch?: () => void
  onAdd?: () => void
  addButtonText: string
  entityName: string
  entityNamePlural?: string
  toolbarRight?: ReactNode
}

type TableTargets = {
  filters: Element | null
  filterCount: Element | null
}

function TableHeaderComponent({
  title,
  total,
  isLoading,
  searchTerm,
  filters,
  onClearAllFilters,
  onClearSearch,
  onAdd,
  addButtonText,
  entityName,
  entityNamePlural,
  toolbarRight,
}: TableHeaderProps) {
  const anchorRef = useRef<HTMLSpanElement>(null)
  const actionsTarget = usePageSlot('actions')
  const countTarget = usePageSlot('count')
  const [tableTargets, setTableTargets] = useState<TableTargets | undefined>(undefined)

  useLayoutEffect(() => {
    const root = anchorRef.current?.parentElement
    const table = root?.querySelector('[data-slot="data-table"]')
    setTableTargets({
      filters: table?.querySelector('[data-slot="data-table-active-filters"]') ?? null,
      filterCount: table?.querySelector('[data-slot="data-table-filter-count"]') ?? null,
    })
  }, [])

  const activeFilters = filters.filter(filter => Boolean(filter.value))
  const hasSearch = Boolean(searchTerm)
  const hasActiveFilters = hasSearch || activeFilters.length > 0
  const displayEntityName = entityNamePlural || `${entityName}s`

  const actions = onAdd || toolbarRight ? (
    <>
      {toolbarRight}
      {onAdd ? (
        <Button onClick={onAdd} className="gap-2">
          <Plus className="size-4" />
          {addButtonText}
        </Button>
      ) : null}
    </>
  ) : null

  const count = isLoading && total === 0 ? (
    <Loader2 className="size-4 animate-spin" aria-hidden />
  ) : (
    <span className="tabular-nums" aria-label={`${total} ${displayEntityName}`}>
      {total}
    </span>
  )

  const foundText = `${total} ${total === 1 ? 'result' : 'results'} found`

  const activeFiltersBar = hasActiveFilters ? (
    <div className="flex flex-wrap items-center gap-2" aria-live="polite">
      <span className="text-muted-foreground me-1 inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.16em] uppercase tabular-nums">
        {isLoading ? <Loader2 className="size-3 animate-spin" aria-hidden /> : null}
        {activeFilters.length > 0 ? 'Filters' : foundText}
      </span>
      {hasSearch ? (
        <span className="border-primary/40 bg-primary/5 text-foreground inline-flex h-8 items-center gap-1.5 border ps-3 pe-1 text-xs font-light">
          <span className="text-muted-foreground">Search:</span>
          <span className="max-w-48 truncate">{searchTerm}</span>
          {onClearSearch ? (
            <button
              type="button"
              onClick={onClearSearch}
              aria-label="Clear search"
              className="text-muted-foreground hover:text-foreground hover:bg-primary/10 flex size-6 cursor-pointer items-center justify-center transition-colors"
            >
              <X className="size-3" aria-hidden />
            </button>
          ) : (
            <span className="w-2" />
          )}
        </span>
      ) : null}
      {activeFilters.map(filter => (
        <span
          key={filter.key}
          className="border-primary/40 bg-primary/5 text-foreground inline-flex h-8 items-center gap-1.5 border ps-3 pe-1 text-xs font-light"
        >
          <span className="text-muted-foreground">{filter.label}:</span>
          <span className="max-w-48 truncate">{filter.value}</span>
          {filter.onRemove ? (
            <button
              type="button"
              onClick={filter.onRemove}
              aria-label={`Clear ${filter.label}`}
              className="text-muted-foreground hover:text-foreground hover:bg-primary/10 flex size-6 cursor-pointer items-center justify-center transition-colors"
            >
              <X className="size-3" aria-hidden />
            </button>
          ) : (
            <span className="w-2" />
          )}
        </span>
      ))}
      <button
        type="button"
        onClick={onClearAllFilters}
        className="text-primary hover:text-foreground ms-1 inline-flex h-8 cursor-pointer items-center text-[11px] font-medium tracking-[0.16em] uppercase underline-offset-4 transition-colors hover:underline"
      >
        Clear all
      </button>
      {activeFilters.length > 0 ? (
        <span className="text-muted-foreground ms-auto text-xs font-light tabular-nums">{foundText}</span>
      ) : null}
    </div>
  ) : null

  const filterCount = String(activeFilters.length + (hasSearch ? 1 : 0))
  const needsInlineHeader = actionsTarget === null || countTarget === null

  return (
    <>
      <span ref={anchorRef} hidden aria-hidden data-slot="table-header-anchor" />

      {actionsTarget && actions ? createPortal(actions, actionsTarget) : null}
      {countTarget ? createPortal(count, countTarget) : null}
      {tableTargets?.filters && activeFiltersBar ? createPortal(activeFiltersBar, tableTargets.filters) : null}
      {tableTargets?.filterCount && hasActiveFilters ? createPortal(filterCount, tableTargets.filterCount) : null}

      {needsInlineHeader ? (
        <div className={cn('flex flex-wrap items-center justify-between gap-3 pb-3')} aria-label={title}>
          {countTarget === null ? (
            <p className="text-muted-foreground text-sm font-light">
              {total} {displayEntityName} total
            </p>
          ) : (
            <span />
          )}
          {actionsTarget === null && actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
      ) : null}

      {tableTargets?.filters === null ? activeFiltersBar : null}
    </>
  )
}

export const TableHeader = memo(TableHeaderComponent)
