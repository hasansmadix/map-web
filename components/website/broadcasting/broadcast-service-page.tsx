import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero, type BreadcrumbItemType } from '@/components/website/common/page-hero'
import { PageFaq, type FaqItem } from '@/components/website/common/page-faq'
import { CTASection } from '@/components/website/common/cta-section'
import {
  bodyCopyClassName,
  displayTitleClassName,
  eyebrowClassName,
  textLinkClassName,
} from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'
import { operatingAreaStatement } from '@/content/broadcasting/coverage'

export function BroadcastServicePage({ content }: { content: BroadcastServiceContent }) {
  return (
    <div className="bg-background min-h-screen">
      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.lead}
        breadcrumbs={content.breadcrumbs}
        buttons={[
          { text: content.primary.text, href: content.primary.href },
          { text: content.sibling.text, href: content.sibling.href, variant: 'outline' },
        ]}
      />

      <section className="bg-background py-20 md:py-28">
        <div className="container grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className={eyebrowClassName}>
              <span className="bg-primary h-px w-8" aria-hidden />
              Who it is for
            </p>
            <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>{content.audience.title}</h2>
          </div>
          <p className={cn(bodyCopyClassName, 'lg:col-span-7 lg:col-start-6 text-base md:text-lg')}>{content.audience.body}</p>
        </div>
      </section>

      <section className="border-border bg-foreground border-y text-white">
        <div className="container py-20 md:py-28">
          <p className="mb-5 flex items-center gap-3 text-xs font-medium tracking-widest text-white/60 uppercase">
            <span className="bg-primary h-px w-8" aria-hidden />
            Scope
          </p>
          <h2 className={cn(displayTitleClassName, 'max-w-2xl text-3xl text-white md:text-4xl')}>{content.scope.title}</h2>
          <p className="mt-4 max-w-2xl text-base font-light text-white/70">{content.scope.lead}</p>
          <ul className="mt-12 border-t border-white/15">
            {content.scope.items.map(item => (
              <li key={item} className="border-b border-white/15 py-4 text-sm font-light text-white/85">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <p className={eyebrowClassName}>
            <span className="bg-primary h-px w-8" aria-hidden />
            {content.process.eyebrow}
          </p>
          <h2 className={cn(displayTitleClassName, 'max-w-2xl text-3xl md:text-4xl')}>{content.process.title}</h2>
          <p className={cn(bodyCopyClassName, 'mt-4 max-w-2xl')}>{content.process.lead}</p>
          <ol className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {content.process.steps.map(step => (
              <li key={step.step} className="bg-background p-6 md:p-8">
                <p className="text-primary font-mono text-xs">{step.step}</p>
                <h3 className="mt-4 text-lg font-medium">{step.title}</h3>
                <p className={cn(bodyCopyClassName, 'mt-3 text-sm')}>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-border border-t py-20 md:py-28">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className={eyebrowClassName}>
              <span className="bg-primary h-px w-8" aria-hidden />
              Systems
            </p>
            <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>{content.systems.title}</h2>
            <p className={cn(bodyCopyClassName, 'mt-4')}>{content.systems.lead}</p>
          </div>
          <ul className="border-border divide-border divide-y border-y lg:col-span-6 lg:col-start-7">
            {content.systems.links.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="group flex items-center justify-between gap-6 py-5">
                  <span>
                    <span className="block text-base font-medium">{link.text}</span>
                    <span className={cn(bodyCopyClassName, 'mt-1 block text-sm')}>{link.description}</span>
                  </span>
                  <ArrowRight className="text-primary size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {content.applications ? (
        <section className="bg-background py-20 md:py-28">
          <div className="container">
            <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>{content.applications.title}</h2>
            <ul className="mt-10 grid gap-8 md:grid-cols-2">
              {content.applications.items.map(item => (
                <li key={item.title}>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className={cn(bodyCopyClassName, 'mt-2 text-sm')}>{item.description}</p>
                  <Link href={item.href} className={cn(textLinkClassName, 'mt-4')}>
                    {item.link}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="border-border border-t py-16">
        <div className="container max-w-3xl">
          <p className={eyebrowClassName}>
            <span className="bg-primary h-px w-8" aria-hidden />
            Operating area
          </p>
          <p className={cn(bodyCopyClassName, 'text-base md:text-lg')}>{operatingAreaStatement}</p>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <PageFaq title="Questions" items={content.faq} />
        </div>
      </section>

      <section className="border-border border-t py-16">
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

      <CTASection title={content.cta.title} description={content.cta.description} buttons={[{ text: content.cta.button, href: content.cta.href }]} offices={[]} />
    </div>
  )
}

export interface BroadcastServiceContent {
  eyebrow: string
  title: string
  lead: string
  breadcrumbs: BreadcrumbItemType[]
  primary: { text: string; href: string }
  sibling: { text: string; href: string }
  audience: { title: string; body: string }
  scope: { title: string; lead: string; items: string[] }
  process: {
    eyebrow: string
    title: string
    lead: string
    steps: { step: string; title: string; description: string }[]
  }
  systems: { title: string; lead: string; links: { text: string; href: string; description: string }[] }
  applications?: { title: string; items: { title: string; description: string; href: string; link: string }[] }
  faq: FaqItem[]
  related: { text: string; href: string }[]
  cta: { title: string; description: string; button: string; href: string }
}
