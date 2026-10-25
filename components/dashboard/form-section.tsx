import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface FormSectionProps {
  title: string
  description?: string
  icon: LucideIcon
  children: ReactNode
  headerActions?: ReactNode
  className?: string
}

export function FormSection({
  title,
  description,
  icon: Icon,
  children,
  headerActions,
  className,
}: FormSectionProps) {
  return (
    <section className={cn('map-form-section', className)}>
      <div className="map-form-section__header">
        <div className="flex min-w-0 items-center gap-3">
          <div className="map-form-section__icon">
            <Icon className="size-5" aria-hidden />
          </div>
          <div className="min-w-0 space-y-0.5">
            <h3 className="map-form-section__title">{title}</h3>
            {description ? <p className="text-muted-foreground text-xs leading-relaxed">{description}</p> : null}
          </div>
        </div>
        {headerActions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{headerActions}</div> : null}
      </div>
      <div className="map-form-section__body">{children}</div>
    </section>
  )
}

interface FormActionsProps {
  children: ReactNode
  className?: string
}

export function FormActions({ children, className }: FormActionsProps) {
  return <div className={cn('map-form-actions', className)}>{children}</div>
}
