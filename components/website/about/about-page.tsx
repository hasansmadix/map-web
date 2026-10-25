import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/website/common/page-hero'
import { PageFaq } from '@/components/website/common/page-faq'
import { CTASection } from '@/components/website/common/cta-section'
import {
  bodyCopyClassName,
  displayTitleClassName,
  eyebrowClassName,
  eyebrowOnDarkClassName,
  textLinkClassName,
} from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'
import { aboutFacts, aboutInternalLinks, aboutProcess, aboutPurpose, aboutStory, coreValues, faqItems } from './data'

export function AboutPageView() {
  return (
    <div className="bg-background min-h-screen">
      <PageHero
        eyebrow="Company"
        title="About MAP"
        description="A production organisation based in Dubai Production City, with twenty-five years of film, broadcast, and studio work across the Gulf."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
        buttons={[
          { text: 'Contact', href: '/contact' },
          { text: 'Production', href: '/production', variant: 'outline' },
        ]}
      />

      <section className="bg-background py-20 md:py-28">
        <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className={eyebrowClassName}>
              <span className="bg-primary h-px w-8" aria-hidden />
              {aboutStory.eyebrow}
            </p>
            <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>{aboutStory.title}</h2>
            <div className="mt-8 space-y-6">
              {aboutStory.paragraphs.map(paragraph => (
                <p key={paragraph} className={cn(bodyCopyClassName, 'text-base')}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="relative lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <Image
                src="/about-image.jpg"
                alt="MAP studio"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="bg-primary absolute -bottom-6 hidden size-24 md:block ltr:-left-6" aria-hidden />
          </div>
        </div>
      </section>

      <section className="bg-foreground text-white">
        <div className="container grid grid-cols-1 md:grid-cols-3">
          {aboutFacts.map(fact => (
            <div
              key={fact.label}
              className="border-t border-white/15 py-10 first:border-t-0 md:border-t-0 md:border-s md:px-10 md:py-16 md:first:border-s-0 md:first:ps-0"
            >
              <p className={cn(displayTitleClassName, 'text-3xl text-white md:text-4xl')}>{fact.value}</p>
              <p className="mt-3 text-[11px] font-medium tracking-[0.16em] text-white/50 uppercase">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="bg-foreground flex min-h-72 flex-col justify-between p-8 text-white md:p-12">
            <p className={eyebrowOnDarkClassName}>
              <span className="bg-primary h-px w-8" aria-hidden />
              {aboutPurpose.mission.eyebrow}
            </p>
            <div>
              <h2 className={cn(displayTitleClassName, 'text-3xl text-white md:text-4xl')}>{aboutPurpose.mission.title}</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed font-light text-white/70">{aboutPurpose.mission.text}</p>
            </div>
          </article>
          <article className="border-border flex min-h-72 flex-col justify-between border p-8 md:p-12">
            <p className={eyebrowClassName}>
              <span className="bg-primary h-px w-8" aria-hidden />
              {aboutPurpose.vision.eyebrow}
            </p>
            <div>
              <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>{aboutPurpose.vision.title}</h2>
              <p className={cn(bodyCopyClassName, 'mt-4 max-w-md text-sm')}>{aboutPurpose.vision.text}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="border-border bg-muted border-y py-20 md:py-28">
        <div className="container">
          <div className="mb-12 max-w-2xl">
            <p className={eyebrowClassName}>
              <span className="bg-primary h-px w-8" aria-hidden />
              Values
            </p>
            <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>Operating principles</h2>
          </div>
          <ul className="border-border bg-border grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <li key={value.title} className="bg-card hover:bg-muted p-8 transition-colors md:p-10">
                  <div className="mb-10 flex items-start justify-between">
                    <Icon className="text-primary size-6" strokeWidth={1.25} />
                    <span className="text-muted-foreground font-mono text-xs">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-lg font-medium tracking-tight">{value.title}</h3>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed font-light">{value.description}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden bg-foreground py-20 text-white md:py-28">
        <div className="tech-pattern-dark absolute inset-0 opacity-10" />
        <div className="relative container">
          <div className="mb-14 max-w-2xl">
            <p className={eyebrowOnDarkClassName}>
              <span className="bg-primary h-px w-8" aria-hidden />
              {aboutProcess.eyebrow}
            </p>
            <h2 className={cn(displayTitleClassName, 'text-3xl text-white md:text-4xl')}>{aboutProcess.title}</h2>
            <p className="mt-4 max-w-xl text-base font-light text-white/60">{aboutProcess.lead}</p>
          </div>
          <ol className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {aboutProcess.steps.map((step, index) => (
              <li key={step.step} className="lg:pe-8">
                <div className="mb-6 flex items-center gap-4">
                  <span className="border-primary text-primary flex size-10 shrink-0 items-center justify-center border font-mono text-xs">
                    {step.step}
                  </span>
                  {index < aboutProcess.steps.length - 1 ? <span className="hidden h-px flex-1 bg-white/15 lg:block" aria-hidden /> : null}
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
          <PageFaq items={faqItems} />
        </div>
      </section>

      <section className="border-border bg-background border-t py-16">
        <div className="container">
          <h2 className="mb-6 text-sm font-medium tracking-[0.16em] uppercase">Explore</h2>
          <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            {aboutInternalLinks.map(link => (
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
        title="Request a proposal"
        description="Share the date, the format, and where the programme needs to play. MAP will reply with a crew and a written proposal."
        buttons={[{ text: 'Contact', href: '/contact' }]}
      />
    </div>
  )
}
