import { bodyCopyClassName, displayTitleClassName, kickerRuleClassName } from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'

interface PageUseCasesGridProps {
  title: string
  description?: string
  items: string[]
  cols?: 3 | 4 | 5
}

export function PageUseCasesGrid({ title, description, items, cols = 4 }: PageUseCasesGridProps) {
  const gridClass =
    cols === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : cols === 5 ? 'sm:grid-cols-2 lg:grid-cols-5' : 'sm:grid-cols-2 lg:grid-cols-4'

  return (
    <div className="space-y-8">
      <div className="space-y-5">
        <div className={kickerRuleClassName} aria-hidden />
        <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>{title}</h2>
        {description ? <p className={cn(bodyCopyClassName, 'max-w-3xl text-base')}>{description}</p> : null}
      </div>
      <ul className={cn('border-border bg-border grid grid-cols-1 gap-px border', gridClass)}>
        {items.map((item, index) => (
          <li key={item} className="bg-background flex items-start gap-4 p-5 md:p-6">
            <span className="text-primary text-sm font-light tabular-nums">{String(index + 1).padStart(2, '0')}</span>
            <span className="text-sm font-light">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
