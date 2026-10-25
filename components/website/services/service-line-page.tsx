import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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
import { offeringSchema } from '@/utils/seo/schema/broadcasts/offering-schema'

export async function ServiceLinePage({ content, pathname }: { content: ServiceLineContent; pathname: string }) {
  const jsonLd = await offeringSchema({
    name: content.title,
    description: content.lead,
    pathname,
    breadcrumbs: content.breadcrumbs.map((item, index) => ({
      name: item.label,
      url: item.href ?? (index === content.breadcrumbs.length - 1 ? pathname : '/'),
    })),
  })

  return (
    <div className="bg-background min-h-screen">
      <script
        id="service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.lead}
        breadcrumbs={content.breadcrumbs}
        buttons={[
          { text: content.primary.text, href: content.primary.href },
          ...(content.secondary
            ? [{ text: content.secondary.text, href: content.secondary.href, variant: 'outline' as const }]
            : []),
        ]}
      />

      <section className="bg-foreground text-white">
        <div className="container grid grid-cols-1 md:grid-cols-3">
          {content.facts.map(fact => (
            <div
              key={fact.label}
              className="border-t border-white/15 py-10 first:border-t-0 md:border-t-0 md:border-s md:px-10 md:py-14 md:first:border-s-0 md:first:ps-0"
            >
              <p className={cn(displayTitleClassName, 'text-2xl text-white md:text-3xl')}>{fact.value}</p>
              <p className="mt-3 text-[11px] font-medium tracking-[0.16em] text-white/50 uppercase">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      <nav aria-label={content.navLabel} className="border-border bg-background/95 sticky top-[4.5rem] z-30 border-b backdrop-blur">
        <ul className="container flex gap-8 overflow-x-auto whitespace-nowrap">
          {content.sections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-muted-foreground hover:border-primary hover:text-foreground flex h-14 items-center gap-2 border-b-2 border-transparent text-[11px] font-medium tracking-[0.14em] uppercase transition-colors"
              >
                <span className="text-primary font-mono">{String(index + 1).padStart(2, '0')}</span>
                {section.nav}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {content.sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={cn('scroll-mt-36 py-20 md:py-28', index % 2 === 1 && 'border-border bg-muted border-y')}
        >
          <div className="container grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:sticky lg:top-40 lg:col-span-5">
              <p className="text-muted-foreground mb-8 font-mono text-xs">
                <span className="text-primary">{String(index + 1).padStart(2, '0')}</span>
                <span> / {String(content.sections.length).padStart(2, '0')}</span>
              </p>
              <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>{section.title}</h2>
              <p className={cn(bodyCopyClassName, 'mt-5 text-base')}>{section.description}</p>
              {section.href && section.link ? (
                <Link href={section.href} className={cn(textLinkClassName, 'mt-8')}>
                  {section.link}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : null}
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <h3 className="text-muted-foreground mb-2 text-xs font-medium tracking-[0.16em] uppercase">Typical scope</h3>
              <ul className="border-border border-t">
                {section.scope.map((item, scopeIndex) => (
                  <li key={item} className="border-border flex items-baseline gap-5 border-b py-5">
                    <span className="text-primary w-6 shrink-0 font-mono text-xs">{String(scopeIndex + 1).padStart(2, '0')}</span>
                    <span className="text-base font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-foreground relative overflow-hidden py-20 text-white md:py-28">
        <div className="tech-pattern-dark absolute inset-0 opacity-10" />
        <div className="relative container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className={eyebrowOnDarkClassName}>
              <span className="bg-primary h-px w-8" aria-hidden />
              {content.standards.eyebrow}
            </p>
            <h2 className={cn(displayTitleClassName, 'text-3xl text-white md:text-4xl')}>{content.standards.title}</h2>
            <p className="mt-4 text-base font-light text-white/60">{content.standards.lead}</p>
          </div>
          <ul className="grid grid-cols-1 gap-px self-center border border-white/10 bg-white/10 sm:grid-cols-2 lg:col-span-7">
            {content.standards.items.map((item, index) => (
              <li key={item} className="flex items-start gap-4 bg-[#12141c]/90 px-6 py-5">
                <span className="text-primary font-mono text-xs">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-sm font-light text-white/85">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <div className="mb-12 max-w-2xl">
            <p className={eyebrowClassName}>
              <span className="bg-primary h-px w-8" aria-hidden />
              {content.practice.eyebrow}
            </p>
            <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>{content.practice.title}</h2>
            <p className={cn(bodyCopyClassName, 'mt-4 text-base')}>{content.practice.lead}</p>
          </div>
          <ul className="border-border border-t">
            {content.practice.items.map((item, index) => (
              <li key={item.title} className="border-border grid grid-cols-1 gap-2 border-b py-6 md:grid-cols-12 md:items-baseline md:gap-8">
                <span className="text-primary font-mono text-xs md:col-span-1">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="text-lg font-medium tracking-tight md:col-span-4">{item.title}</h3>
                <p className={cn(bodyCopyClassName, 'text-sm md:col-span-7')}>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-foreground relative overflow-hidden py-20 text-white md:py-28">
        <div className="tech-pattern-dark absolute inset-0 opacity-10" />
        <div className="relative container">
          <div className="mb-14 max-w-2xl">
            <p className={eyebrowOnDarkClassName}>
              <span className="bg-primary h-px w-8" aria-hidden />
              {content.process.eyebrow}
            </p>
            <h2 className={cn(displayTitleClassName, 'text-3xl text-white md:text-4xl')}>{content.process.title}</h2>
            <p className="mt-4 max-w-xl text-base font-light text-white/60">{content.process.lead}</p>
          </div>
          <ol className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {content.process.steps.map((step, index) => (
              <li key={step.step} className="lg:pe-8">
                <div className="mb-6 flex items-center gap-4">
                  <span className="border-primary text-primary flex size-10 shrink-0 items-center justify-center border font-mono text-xs">
                    {step.step}
                  </span>
                  {index < content.process.steps.length - 1 ? (
                    <span className="hidden h-px flex-1 bg-white/15 lg:block" aria-hidden />
                  ) : null}
                </div>
                <h3 className="mb-2 text-lg font-medium">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <PageFaq title="Engagement questions" items={content.faq} />
        </div>
      </section>

      <section className="border-border bg-background border-t py-16">
        <div className="container">
          <h2 className="mb-6 text-sm font-medium tracking-[0.16em] uppercase">Related</h2>
          <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            {content.related.map(link => (
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

export interface ServiceLineContent {
  navLabel: string
  eyebrow: string
  title: string
  lead: string
  breadcrumbs: BreadcrumbItemType[]
  primary: { text: string; href: string }
  secondary?: { text: string; href: string }
  facts: { value: string; label: string }[]
  sections: ServiceLineSection[]
  standards: { eyebrow: string; title: string; lead: string; items: string[] }
  practice: { eyebrow: string; title: string; lead: string; items: { title: string; description: string }[] }
  process: { eyebrow: string; title: string; lead: string; steps: { step: string; title: string; description: string }[] }
  faq: FaqItem[]
  related: { text: string; href: string }[]
  cta: { title: string; description: string; button: string; href: string }
}

interface ServiceLineSection {
  id: string
  nav: string
  title: string
  description: string
  scope: string[]
  href?: string
  link?: string
}
