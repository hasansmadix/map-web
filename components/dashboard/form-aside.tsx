'use client'

import { LoadingButton } from '@/components/shared/buttons/loading-button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Save } from 'lucide-react'
import type { ReactNode } from 'react'

export function FormAside({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <aside className={cn('min-w-0 space-y-4 lg:sticky lg:top-[calc(var(--app-header-height)+1.5rem)]', className)}>
      {children}
    </aside>
  )
}

export function FormAsideCard({
  title,
  children,
  className,
}: {
  title?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('border-border bg-card border', className)}>
      {title ? (
        <h3 className="border-border text-muted-foreground border-b px-5 py-3.5 text-[11px] font-medium tracking-[0.16em] uppercase">
          {title}
        </h3>
      ) : null}
      {children}
    </section>
  )
}

export function FormSaveCard({
  isEdit,
  isDirty,
  isSaving,
  onCancel,
  onDiscard,
  createLabel = 'Create equipment',
}: {
  isEdit: boolean
  isDirty: boolean
  isSaving: boolean
  onCancel: () => void
  onDiscard: () => void
  createLabel?: string
}) {
  return (
    <FormAsideCard>
      <div className="space-y-3 p-5">
        <LoadingButton
          isLoading={isSaving}
          loadingText={isEdit ? 'Saving…' : 'Creating…'}
          defaultText={isEdit ? 'Save changes' : createLabel}
          icon={Save}
          disabled={isSaving || (isEdit && !isDirty)}
          className="w-full"
        />
        <div className="flex min-h-8 items-center justify-between gap-2">
          <p className="flex items-center gap-2 text-xs font-light">
            <span className={cn('size-1.5', isDirty ? 'bg-amber-500' : 'bg-emerald-500')} aria-hidden />
            <span className={isDirty ? 'text-foreground' : 'text-muted-foreground'}>
              {isEdit ? (isDirty ? 'Unsaved changes' : 'Saved') : 'New record'}
            </span>
          </p>
          {isEdit && isDirty ? (
            <Button type="button" variant="ghost" size="sm" disabled={isSaving} onClick={onDiscard}>
              Discard
            </Button>
          ) : (
            <Button type="button" variant="ghost" size="sm" disabled={isSaving} onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </FormAsideCard>
  )
}
