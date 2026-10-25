import type { LucideIcon } from 'lucide-react'
import { bodyCopyClassName, displayTitleClassName, kickerRuleClassName } from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'

export interface PageFeatureItem {
  icon: LucideIcon
  title: string
  description?: string
  desc?: string
}

interface PageFeaturesGridProps {
  title: string
  description?: string
  items: PageFeatureItem[]
  cols?: 2 | 3 | 4
}

export function PageFeaturesGrid({ title, description, items, cols = 3 }: PageFeaturesGridProps) {
  const gridClass =
    cols === 2
      ? 'sm:grid-cols-2'
      : cols === 4
        ? 'sm:grid-cols-2 lg:grid-cols-4'
        : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className="space-y-8">
      <div className="space-y-5">
        <div className={kickerRuleClassName} aria-hidden />
        <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>{title}</h2>
        {description ? <p className={cn(bodyCopyClassName, 'max-w-3xl text-sm md:text-base')}>{description}</p> : null}
      </div>
      <ul className={cn('border-border bg-border grid grid-cols-1 gap-px border', gridClass)}>
        {items.map((item, index) => {
          const Icon = item.icon
          return (
            <li key={item.title} className="bg-background p-6 md:p-8">
              <div className="text-primary mb-6 text-sm font-light tabular-nums">{String(index + 1).padStart(2, '0')}</div>
              <Icon className="text-primary mb-4 size-5" strokeWidth={1.5} />
              <h3 className="text-lg font-light tracking-[-0.02em]">{item.title}</h3>
              <p className={cn(bodyCopyClassName, 'mt-2 text-sm')}>{item.description ?? item.desc ?? ''}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
