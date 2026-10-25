import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'
import {
  displayTitleClassName,
  eyebrowOnDarkClassName,
  marketingButtonClassName,
  outlineOnInkClassName,
} from '@/components/website/common/marketing-styles'

export interface BreadcrumbItemType {
  label: string
  href?: string
}

export interface HeroButton {
  text: string
  href: string
  variant?: 'default' | 'outline'
}

interface PageHeroProps {
  title: string
  description: string
  buttons: HeroButton[]
  breadcrumbs?: BreadcrumbItemType[]
  minHeight?: '55vh' | '60vh' | '40vh'
  eyebrow?: string
}

export function PageBreadcrumb({ items }: { items: BreadcrumbItemType[] }) {
  if (items.length === 0) return null

  return (
    <div className="border-b border-white/10">
      <Breadcrumb className="container flex h-11 items-center">
        <BreadcrumbList className="flex-nowrap overflow-hidden text-[13px] text-white/45">
          {items.map((item, index) => (
            <span key={`${item.label}-${index}`} className="contents">
              {index > 0 ? <BreadcrumbSeparator className="text-white/25" /> : null}
              <BreadcrumbItem className={item.href ? 'shrink-0' : 'min-w-0'}>
                {item.href ? (
                  <BreadcrumbLink asChild className="text-white/45 hover:text-white">
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="truncate text-white/70">{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export function PageHero({ title, description, buttons, breadcrumbs, eyebrow }: PageHeroProps) {
  const trail = breadcrumbs ?? []

  return (
    <section className="relative overflow-hidden bg-foreground text-white">
      <div className="tech-pattern-dark absolute inset-0 opacity-10" />
      <div className={cn('relative', trail.length > 0 ? 'pt-[4.5rem]' : 'pt-24 md:pt-28')}>
        <PageBreadcrumb items={trail} />
        <div className={cn('container', trail.length > 0 ? 'pt-8 pb-14 md:pt-14 md:pb-16' : 'pb-16 md:pb-20')}>
          <div className="max-w-3xl">
            <p className={eyebrowOnDarkClassName}>
              <span className="bg-primary h-px w-8" aria-hidden />
              {eyebrow ?? 'MAP'}
            </p>
            <h1 className={cn(displayTitleClassName, 'mb-6 text-3xl text-white md:text-5xl')}>{title}</h1>
            <p className="max-w-2xl text-base leading-relaxed font-light text-white/70 md:text-lg">{description}</p>
            {buttons.length > 0 ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {buttons.map(btn => (
                  <Link
                    key={btn.href + btn.text}
                    href={btn.href}
                    className={cn(btn.variant === 'outline' ? outlineOnInkClassName : marketingButtonClassName.primary, 'group')}
                  >
                    {btn.text}
                    {btn.variant !== 'outline' ? (
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    ) : null}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
