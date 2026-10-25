import { bodyCopyClassName, displayTitleClassName, kickerRuleClassName } from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'

interface PageIntroProps {
  title: string
  paragraphs: string[]
}

export function PageIntro({ title, paragraphs }: PageIntroProps) {
  return (
    <div className="space-y-5">
      <div className={kickerRuleClassName} aria-hidden />
      <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>{title}</h2>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={cn(bodyCopyClassName, 'max-w-3xl text-sm md:text-base')}>
          {paragraph}
        </p>
      ))}
    </div>
  )
}
