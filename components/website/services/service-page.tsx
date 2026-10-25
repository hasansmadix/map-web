import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PageHero, type BreadcrumbItemType } from '@/components/website/common/page-hero'
import { PageFaq, type FaqItem } from '@/components/website/common/page-faq'
import { CTASection } from '@/components/website/common/cta-section'
import {
  bodyCopyClassName,
  displayTitleClassName,
  eyebrowClassName,
  eyebrowOnDarkClassName,
  textLinkClassName,
} from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'

export interface ServiceOffering {
  icon: LucideIcon
  title: string
  description: string
  href?: string
}

export interface ServicePageContent {
  eyebrow: string
  title: string
  lead: string
  breadcrumbs?: BreadcrumbItemType[]
  primary: { text: string; href: string }
  secondary?: { text: string; href: string }
  intro: { eyebrow: string; title: string; paragraphs: string[] }
  offerings: {
    eyebrow: string
    title: string
    lead: string
    variant: 'list' | 'cards'
    items: ServiceOffering[]
  }
  notes?: { eyebrow: string; title: string; lead: string; items: string[] }
  reasons: { eyebrow: string; title: string; lead: string; items: { title: string; description: string }[] }
  audiences?: { eyebrow: string; title: string; lead: string; items: { icon: LucideIcon; title: string; description: string }[] }
  process?: { eyebrow: string; title: string; lead: string; steps: { step: string; title: string; description: string }[] }
  faq: FaqItem[]
  related: { title: string; links: { text: string; href: string }[] }
  cta: { title: string; description: string; button: string; href: string }
}

export function ServicePage({ content, children }: { content: ServicePageContent; children?: ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.lead}
        breadcrumbs={content.breadcrumbs}
        buttons={[
          { text: content.primary.text, href: content.primary.href },
          ...(content.secondary ? [{ text: content.secondary.text, href: content.secondary.href, variant: 'outline' as const }] : []),
        ]}
      />

      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <p className={eyebrowClassName}>
            <span className="bg-primary h-px w-8" aria-hidden />
            {content.intro.eyebrow}
          </p>
          <h2 className={cn(displayTitleClassName, 'max-w-4xl text-3xl md:text-4xl')}>{content.intro.title}</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-16">
            {content.intro.paragraphs.map(paragraph => (
              <p key={paragraph} className={cn(bodyCopyClassName, 'text-base')}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <Offerings offerings={content.offerings} />

      {children}

      {content.notes ? (
        <section className="bg-background py-20 md:py-28">
          <div className="container">
            <div className="mb-10 max-w-3xl">
              <p className={eyebrowClassName}>
                <span className="bg-primary h-px w-8" aria-hidden />
                {content.notes.eyebrow}
              </p>
              <h2 className={cn(displayTitleClassName, 'mb-4 text-3xl md:text-4xl')}>{content.notes.title}</h2>
              <p className={cn(bodyCopyClassName, 'text-base')}>{content.notes.lead}</p>
            </div>
            <ul className="border-border grid grid-cols-1 border sm:grid-cols-2">
              {content.notes.items.map(item => (
                <li key={item} className="border-border flex items-start gap-4 border-b px-6 py-5 sm:odd:border-e">
                  <Check className="text-primary mt-0.5 size-4 shrink-0" strokeWidth={1.25} />
                  <span className="text-sm font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="border-y border-border bg-muted py-20 md:py-28">
        <div className="container">
          <div className="mb-12 max-w-2xl">
            <p className={eyebrowClassName}>
              <span className="bg-primary h-px w-8" aria-hidden />
              {content.reasons.eyebrow}
            </p>
            <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>{content.reasons.title}</h2>
            <p className={cn(bodyCopyClassName, 'mt-4 text-base')}>{content.reasons.lead}</p>
          </div>
          <ul className="border-border bg-border grid grid-cols-1 gap-px border sm:grid-cols-2">
            {content.reasons.items.map((item, index) => (
              <li key={item.title} className="bg-card p-8">
                <span className="text-primary font-mono text-xs">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-4 text-lg font-medium tracking-tight">{item.title}</h3>
                <p className={cn(bodyCopyClassName, 'mt-2 text-sm')}>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {content.audiences ? (
        <section className="bg-background py-20 md:py-28">
          <div className="container">
            <div className="mb-12 max-w-2xl">
              <p className={eyebrowClassName}>
                <span className="bg-primary h-px w-8" aria-hidden />
                {content.audiences.eyebrow}
              </p>
              <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>{content.audiences.title}</h2>
              <p className={cn(bodyCopyClassName, 'mt-4 text-base')}>{content.audiences.lead}</p>
            </div>
            <ul className="grid grid-cols-1 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
              {content.audiences.items.map(item => {
                const Icon = item.icon
                return (
                  <li key={item.title} className="border-border flex items-start gap-4 border-b py-6 sm:pe-8">
                    <Icon className="text-primary mt-0.5 size-5 shrink-0" strokeWidth={1.25} />
                    <div>
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <p className={cn(bodyCopyClassName, 'mt-1 text-sm')}>{item.description}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {content.process ? <ProcessBand process={content.process} /> : null}

      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <PageFaq items={content.faq} />
        </div>
      </section>

      <section className="border-t border-border bg-background py-16">
        <div className="container">
          <h2 className="mb-6 text-sm font-medium tracking-[0.16em] uppercase">{content.related.title}</h2>
          <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            {content.related.links.map(link => (
              <li key={link.href}>
                <Link href={link.href} className={textLinkClassName}>
                  {link.text}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title={content.cta.title}
        description={content.cta.description}
        buttons={[{ text: content.cta.button, href: content.cta.href }]}
      />
    </div>
  )
}

function Offerings({ offerings }: { offerings: ServicePageContent['offerings'] }) {
  return (
    <section className="border-y border-border bg-muted py-20 md:py-28">
      <div className="container">
        <div className="mb-12 max-w-2xl">
          <p className={eyebrowClassName}>
            <span className="bg-primary h-px w-8" aria-hidden />
            {offerings.eyebrow}
          </p>
          <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>{offerings.title}</h2>
          <p className={cn(bodyCopyClassName, 'mt-4 text-base')}>{offerings.lead}</p>
        </div>
        {offerings.variant === 'list' ? <OfferingList items={offerings.items} /> : <OfferingCards items={offerings.items} />}
      </div>
    </section>
  )
}

function OfferingList({ items }: { items: ServiceOffering[] }) {
  return (
    <ul className="border-border border-t">
      {items.map((item, index) => {
        const Icon = item.icon
        const inner = (
          <>
            <span className="text-primary font-mono text-xs">{String(index + 1).padStart(2, '0')}</span>
            <div className="md:col-span-4">
              <div className="mb-3 flex items-center gap-3">
                <Icon className="text-primary size-5" strokeWidth={1.25} />
                <h3 className="text-xl font-medium tracking-tight md:text-2xl">{item.title}</h3>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed font-light md:col-span-6">{item.description}</p>
            <ArrowRight className="text-muted-foreground size-4 md:col-span-1 md:justify-self-end" />
          </>
        )
        const className =
          'group border-border grid grid-cols-1 items-center gap-4 border-b py-8 transition-colors hover:bg-white md:grid-cols-12 md:px-6'
        return (
          <li key={item.title}>
            {item.href ? (
              <Link href={item.href} className={className}>
                {inner}
              </Link>
            ) : (
              <div className={className}>{inner}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function OfferingCards({ items }: { items: ServiceOffering[] }) {
  return (
    <ul className="border-border bg-border grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <li key={item.title} className="bg-card hover:bg-muted p-8 transition-colors md:p-10">
            <div className="mb-10 flex items-start justify-between">
              <Icon className="text-primary size-7" strokeWidth={1.25} />
              <span className="text-muted-foreground font-mono text-xs">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="mb-3 text-lg font-medium tracking-tight">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-light">{item.description}</p>
          </li>
        )
      })}
    </ul>
  )
}

function ProcessBand({ process }: { process: NonNullable<ServicePageContent['process']> }) {
  return (
    <section className="relative overflow-hidden bg-foreground py-20 text-white md:py-28">
      <div className="tech-pattern-dark absolute inset-0 opacity-10" />
      <div className="relative z-10 container">
        <div className="mb-14 max-w-2xl">
          <p className={eyebrowOnDarkClassName}>
            <span className="bg-primary h-px w-8" aria-hidden />
            {process.eyebrow}
          </p>
          <h2 className={cn(displayTitleClassName, 'text-3xl text-white md:text-4xl')}>{process.title}</h2>
          <p className="mt-4 max-w-2xl text-base font-light text-white/60">{process.lead}</p>
        </div>
        <ol className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {process.steps.map((step, index) => (
            <li key={step.step} className="lg:pe-8">
              <div className="mb-6 flex items-center gap-4">
                <span className="border-primary text-primary flex size-10 shrink-0 items-center justify-center border font-mono text-xs">
                  {step.step}
                </span>
                {index < process.steps.length - 1 ? <span className="hidden h-px flex-1 bg-white/15 lg:block" aria-hidden /> : null}
              </div>
              <h3 className="mb-2 text-lg font-medium">{step.title}</h3>
              <p className="text-sm leading-relaxed text-white/60">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
