import { bodyCopyClassName, displayTitleClassName, kickerRuleClassName, microLabelClassName } from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  highlightedText?: string
  description?: string
  Icon?: React.ElementType
  BadgeText?: string
}

export default function SectionHeader({ title, highlightedText, description, Icon, BadgeText }: SectionHeaderProps) {
  return (
    <div className="space-y-5">
      <div className={kickerRuleClassName} aria-hidden />
      {Icon && BadgeText ? <span className={microLabelClassName}>{BadgeText}</span> : null}
      <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>
        {title}
        {highlightedText ? <span className="text-primary"> {highlightedText}</span> : null}
      </h2>
      {description ? <p className={cn(bodyCopyClassName, 'max-w-2xl text-base')}>{description}</p> : null}
    </div>
  )
}
