import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { displayTitleClassName } from '@/components/website/common/marketing-styles'

interface CTAButton {
  text: string
  href: string
}

interface CTASectionOffice {
  name: string
  location: string
}

interface CTASectionProps {
  title: string
  description: string
  buttons: CTAButton[]
  offices?: CTASectionOffice[]
  titleClassName?: string
  descriptionClassName?: string
}

const DEFAULT_OFFICES: CTASectionOffice[] = [
  { name: 'Dubai Production City', location: 'B29, Dubai Production City, United Arab Emirates' },
]

export function CTASection({
  title,
  description,
  buttons,
  offices = DEFAULT_OFFICES,
  titleClassName,
  descriptionClassName,
}: CTASectionProps) {
  const primaryButton = buttons[0]

  return (
    <>
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="tech-pattern-dark absolute inset-0 opacity-20" />
      <div className="relative container py-20 md:py-24">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-5">
            <div className="h-px w-12 bg-white" aria-hidden />
            <h2 className={cn(displayTitleClassName, 'text-3xl text-white md:text-5xl', titleClassName)}>{title}</h2>
            <p className={cn('max-w-xl text-base font-light leading-relaxed text-white/85', descriptionClassName)}>
              {description}
            </p>
          </div>
          {primaryButton ? (
            <Link
              href={primaryButton.href}
              className="group inline-flex h-12 w-fit items-center justify-center gap-3 bg-foreground px-7 text-xs font-medium tracking-[0.18em] text-background uppercase transition-colors hover:bg-foreground/90"
            >
              {primaryButton.text}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : null}
        </div>

      </div>
    </section>
    {offices.length > 0 ? (
      <div className="bg-background">
        <div className={cn('container grid grid-cols-1 gap-8 py-10', offices.length > 1 && 'md:grid-cols-2')}>
          {offices.map(office => (
            <div key={office.name}>
              <h3 className="text-sm font-medium tracking-[0.16em] uppercase">{office.name}</h3>
              <p className="text-muted-foreground mt-2 text-sm font-light">{office.location}</p>
            </div>
          ))}
        </div>
      </div>
    ) : null}
    </>
  )
}
