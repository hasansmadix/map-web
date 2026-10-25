'use client'

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type Table as TanStackTable,
  type VisibilityState,
} from '@tanstack/react-table'
import clsx from 'clsx'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
  Search,
  Settings2,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import SkeletonTable from './skeleton-table'
import ApiError from '@/components/shared/api-error'

type Density = 'comfortable' | 'compact'

type DataTableMessages = {
  searchPlaceholder?: string
  columns?: string
  page?: string
  of?: string
  total?: string
  noData?: string
  filters?: string
  showResults?: string
  view?: string
  density?: string
  comfortable?: string
  compact?: string
  rowsPerPage?: string
}

type DataTableProps<TData, TValue> = {
  tableId?: string
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  error?: Error | null
  refetch?: () => void
  emptyMessage?: string
  emptyState?: React.ReactNode
  pageIndex: number
  pageSize: number
  totalRows: number
  totalPages: number
  canNextPage: boolean
  canPrevPage: boolean
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  pageSizeOptions?: number[]
  enableClientSorting?: boolean
  enableGlobalFilter?: boolean
  onGlobalFilterChange?: (value: string) => void
  initialGlobalFilter?: string
  manualFiltering?: boolean
  enableRowSelection?: boolean
  onSelectionChange?: (rows: TData[]) => void
  onRowClick?: (row: TData) => void
  getRowId?: (row: TData, index: number) => string
  toolbarLeft?: React.ReactNode
  toolbarRight?: React.ReactNode
  compact?: boolean
  stickyHeader?: boolean
  className?: string
  messages?: DataTableMessages
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100, 200, 500, 1000]
const microLabelClassName = 'text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase'

function columnLabel<TData>(column: ReturnType<TanStackTable<TData>['getAllLeafColumns']>[number]) {
  const header = column.columnDef.header
  return typeof header === 'string' ? header : column.id
}

function useCompactFilters() {
  const [isCompact, setIsCompact] = React.useState(false)

  React.useEffect(() => {
    const query = window.matchMedia('(max-width: 1023px)')
    const onChange = () => setIsCompact(query.matches)
    onChange()
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return isCompact
}

function DataTableViewMenu<TData>({
  table,
  density,
  onDensityChange,
  labels,
}: {
  table: TanStackTable<TData>
  density: Density
  onDensityChange: (density: Density) => void
  labels: { view: string; density: string; comfortable: string; compact: string; columns: string }
}) {
  const hideableColumns = table.getAllLeafColumns().filter(col => col.columnDef.enableHiding !== false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label={labels.view} title={labels.view} className="size-9 shrink-0">
          <Settings2 className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-96 w-60 overflow-auto">
        <DropdownMenuLabel className={microLabelClassName}>{labels.density}</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={density} onValueChange={value => onDensityChange(value as Density)}>
          <DropdownMenuRadioItem value="comfortable">{labels.comfortable}</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="compact">{labels.compact}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        {hideableColumns.length > 0 ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className={microLabelClassName}>{labels.columns}</DropdownMenuLabel>
            {hideableColumns.map(col => (
              <DropdownMenuCheckboxItem
                key={col.id}
                className="capitalize"
                checked={col.getIsVisible()}
                onCheckedChange={value => col.toggleVisibility(Boolean(value))}
                onSelect={event => event.preventDefault()}
              >
                {columnLabel(col)}
              </DropdownMenuCheckboxItem>
            ))}
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DataTable<TData, TValue>({
  tableId,
  columns,
  data,
  isLoading,
  error,
  refetch,
  emptyMessage = 'No data.',
  emptyState,
  pageIndex,
  pageSize,
  totalRows,
  totalPages,
  canNextPage,
  canPrevPage,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  enableClientSorting = true,
  enableGlobalFilter = false,
  onGlobalFilterChange,
  initialGlobalFilter = '',
  manualFiltering = false,
  enableRowSelection = false,
  onSelectionChange,
  onRowClick,
  getRowId,
  toolbarLeft,
  toolbarRight,
  compact = false,
  className,
  messages,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState(initialGlobalFilter)
  const [density, setDensity] = React.useState<Density>(compact ? 'compact' : 'comfortable')
  const [isFilterSheetOpen, setIsFilterSheetOpen] = React.useState(false)
  const isCompactFilters = useCompactFilters()
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const hasInitializedRef = React.useRef(false)

  const labels = {
    searchPlaceholder: messages?.searchPlaceholder ?? 'Search',
    columns: messages?.columns ?? 'Columns',
    of: messages?.of ?? 'of',
    noData: messages?.noData ?? emptyMessage,
    filters: messages?.filters ?? 'Filters',
    showResults: messages?.showResults ?? 'Show results',
    view: messages?.view ?? 'View',
    density: messages?.density ?? 'Density',
    comfortable: messages?.comfortable ?? 'Comfortable',
    compact: messages?.compact ?? 'Compact',
    rowsPerPage: messages?.rowsPerPage ?? 'Rows',
  }

  React.useEffect(() => {
    if (!enableGlobalFilter || toolbarLeft) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (target?.closest('input, textarea, select, [contenteditable="true"], [role="dialog"]')) return
      event.preventDefault()
      searchInputRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [enableGlobalFilter, toolbarLeft])

  const storageKey = tableId ? `dt:${tableId}` : undefined

  React.useEffect(() => {
    if (!storageKey || hasInitializedRef.current) return
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.columnVisibility) setColumnVisibility(parsed.columnVisibility)
        if (parsed.density === 'compact' || parsed.density === 'comfortable') setDensity(parsed.density)
        if (parsed.pageSize && pageSizeOptions.includes(parsed.pageSize) && parsed.pageSize !== pageSize) {
          onPageSizeChange(parsed.pageSize)
        }
      }
      hasInitializedRef.current = true
    } catch {
      hasInitializedRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey])

  React.useEffect(() => {
    if (!storageKey || !hasInitializedRef.current) return
    try {
      localStorage.setItem(storageKey, JSON.stringify({ columnVisibility, pageSize, density }))
    } catch {
      /* ignore */
    }
  }, [storageKey, columnVisibility, pageSize, density])

  const table = useReactTable({
    data,
    columns,
    getRowId,
    state: { sorting, columnVisibility, rowSelection, globalFilter },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    manualPagination: true,
    manualFiltering,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableClientSorting ? getSortedRowModel() : undefined,
    enableRowSelection,
  })

  React.useEffect(() => {
    if (!onSelectionChange) return
    const selected = table.getSelectedRowModel().rows.map(row => row.original)
    onSelectionChange(selected)
  }, [rowSelection, table, onSelectionChange])

  const headers = table.getHeaderGroups()[0]?.headers ?? []
  const rangeStart = totalRows === 0 ? 0 : (pageIndex - 1) * pageSize + 1
  const rangeEnd = Math.min(pageIndex * pageSize, totalRows)

  const searchNode = enableGlobalFilter ? (
    <div data-slot="data-table-search" className="group/search relative min-w-0 flex-1 lg:w-72 lg:flex-none xl:w-80">
      <Search className="text-muted-foreground pointer-events-none absolute start-3 top-1/2 z-10 size-3.5 -translate-y-1/2" />
      <Input
        ref={searchInputRef}
        type="search"
        placeholder={labels.searchPlaceholder}
        aria-label={labels.searchPlaceholder}
        value={globalFilter ?? ''}
        onChange={event => {
          const value = event.target.value
          setGlobalFilter(value)
          onGlobalFilterChange?.(value)
        }}
        className="ps-9 pe-9 [&::-webkit-search-cancel-button]:hidden"
      />
      {!globalFilter ? (
        <kbd
          aria-hidden
          className="border-border text-muted-foreground pointer-events-none absolute end-2.5 top-1/2 hidden h-5 min-w-5 -translate-y-1/2 items-center justify-center border px-1 font-sans text-[11px] group-focus-within/search:opacity-0 lg:flex"
        >
          /
        </kbd>
      ) : null}
      {globalFilter ? (
        <button
          type="button"
          aria-label="Clear search"
          className="text-muted-foreground hover:text-foreground absolute end-2 top-1/2 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center transition-colors"
          onClick={() => {
            setGlobalFilter('')
            onGlobalFilterChange?.('')
          }}
        >
          <X className="size-3.5" />
        </button>
      ) : null}
    </div>
  ) : null

  return (
    <div data-slot="data-table" className={clsx('min-w-0', className)}>
      <div
        data-slot="data-table-toolbar"
        className="bg-background/95 supports-[backdrop-filter]:bg-background/85 sticky top-(--app-header-height) z-20 -mx-1 flex items-center gap-2 px-1 py-2.5 backdrop-blur-md"
      >
        {toolbarLeft ? <div className="flex min-w-0 flex-1 flex-wrap items-end gap-2">{toolbarLeft}</div> : searchNode}

        {toolbarRight ? (
          <>
            {!isCompactFilters ? (
              <div data-slot="data-table-filters" className="flex min-w-0 flex-wrap items-center gap-2">
                {toolbarRight}
              </div>
            ) : null}

            <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="has-data-[slot=data-table-filter-count]:not-[&:has(:empty)]:border-primary/50 shrink-0 gap-2 px-3 lg:hidden"
                >
                  <SlidersHorizontal className="size-4" />
                  <span className="sr-only sm:not-sr-only">{labels.filters}</span>
                  <span
                    data-slot="data-table-filter-count"
                    className="bg-primary text-primary-foreground flex size-5 items-center justify-center text-[10px] tabular-nums empty:hidden"
                  />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="max-h-[85dvh] gap-0 p-0">
                <SheetHeader className="border-border border-b px-5 py-4">
                  <SheetTitle className="text-foreground text-lg font-light">{labels.filters}</SheetTitle>
                </SheetHeader>
                <div data-slot="data-table-filter-sheet" className="overflow-y-auto px-5 py-5">
                  {isCompactFilters ? toolbarRight : null}
                </div>
                <SheetFooter className="border-border border-t px-5 pt-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
                  <SheetClose asChild>
                    <Button className="h-12 w-full">{labels.showResults}</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </>
        ) : null}

        <div className="hidden flex-1 lg:block" />

        <DataTableViewMenu
          table={table}
          density={density}
          onDensityChange={setDensity}
          labels={labels}
        />
      </div>

      <div data-slot="data-table-active-filters" className="pb-3 empty:hidden" />

      <div data-slot="data-table-frame" className="border-border bg-card border">
        <Table className={clsx(density === 'compact' && '[&_td]:py-2 [&_th]:py-2')}>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {headers.map(header => {
                const canSort = enableClientSorting && header.column.getCanSort?.()
                const sorted = header.column.getIsSorted()
                return (
                  <TableHead
                    key={header.id}
                    aria-sort={sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : undefined}
                    className={clsx('group/th text-start select-none', canSort && 'hover:text-foreground cursor-pointer')}
                    onClick={() => {
                      if (canSort) header.column.toggleSorting(sorted === 'asc')
                    }}
                  >
                    <div className="inline-flex items-center gap-1.5">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {canSort ? (
                        sorted === 'asc' ? (
                          <ArrowUp className="text-primary size-3" aria-hidden />
                        ) : sorted === 'desc' ? (
                          <ArrowDown className="text-primary size-3" aria-hidden />
                        ) : (
                          <ArrowUpDown className="size-3 opacity-0 transition-opacity group-hover/th:opacity-60" aria-hidden />
                        )
                      ) : null}
                    </div>
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <SkeletonTable colCount={headers.length || 1} />
            ) : error ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={headers.length || 1} className="p-0! py-10!">
                  <ApiError errorMessage={error.message} refetchFunction={refetch} />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={clsx(
                    '[&>td:first-child]:border-s-2 [&>td:first-child]:border-s-transparent',
                    onRowClick && 'hover:[&>td:first-child]:border-s-primary cursor-pointer',
                    row.getIsSelected() && '[&>td:first-child]:border-s-primary',
                  )}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={headers.length || 1} className="py-16! whitespace-normal">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <span className="bg-primary h-px w-12" aria-hidden />
                    <p className="text-foreground text-lg font-light tracking-tight">{labels.noData}</p>
                    {emptyState ? <div className="text-muted-foreground max-w-md text-sm font-light">{emptyState}</div> : null}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="border-border flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t px-4 py-3">
          <p className="text-muted-foreground flex items-center gap-2 text-sm font-light tabular-nums">
            {totalRows ? (
              <>
                <span className="text-foreground">
                  {rangeStart}–{rangeEnd}
                </span>
                <span>{labels.of}</span>
                <span className="text-foreground">{totalRows}</span>
              </>
            ) : (
              <span>&nbsp;</span>
            )}
            {isLoading ? <Loader2 className="size-3.5 animate-spin" aria-hidden /> : null}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <div className="hidden items-center gap-2 sm:flex">
              <span className={microLabelClassName}>{labels.rowsPerPage}</span>
              <Select value={pageSize.toString()} onValueChange={value => onPageSizeChange(Number(value))}>
                <SelectTrigger className="h-9 w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map(size => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="size-9" onClick={() => onPageChange(1)} disabled={!canPrevPage}>
                <ChevronsLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-9"
                onClick={() => onPageChange(pageIndex - 1)}
                disabled={!canPrevPage}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-9"
                onClick={() => onPageChange(pageIndex + 1)}
                disabled={!canNextPage}
              >
                <ChevronRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-9"
                onClick={() => onPageChange(totalPages)}
                disabled={!canNextPage}
              >
                <ChevronsRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
