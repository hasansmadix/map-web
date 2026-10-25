import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { PageHero } from '@/components/website/common/page-hero'
import { bodyCopyClassName, displayTitleClassName, eyebrowClassName, textLinkClassName } from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'
import { legalUpdated, type LegalDocument as LegalDocumentContent } from './legal.data'

export function LegalDocument({ document, related }: { document: LegalDocumentContent; related: { href: string; title: string } }) {
  return (
    <div className="bg-background min-h-screen">
      <PageHero
        eyebrow={document.eyebrow}
        title={document.title}
        description={document.lead}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: document.title },
        ]}
        buttons={[]}
      />

      <section className="bg-background py-16 md:py-24">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="space-y-12 lg:sticky lg:top-28">
              <nav aria-label="Contents">
                <Contents sections={document.sections} />
              </nav>
              <Related related={related} />
            </div>
          </aside>

          <article className="lg:col-span-8 lg:col-start-5">
            <p className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">
              Last updated <time dateTime="2026-10">{legalUpdated}</time>
            </p>
            <p className={cn(bodyCopyClassName, 'mt-6 text-lg')}>{document.intro}</p>

            <details className="border-border group mt-10 border lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-[11px] font-medium tracking-[0.16em] uppercase [&::-webkit-details-marker]:hidden">
                Contents
                <ChevronDown className="text-muted-foreground size-4 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <div className="border-border border-t px-5 py-4">
                <Contents sections={document.sections} labelled={false} />
              </div>
            </details>

            <div className="border-border mt-12 border-t">
              {document.sections.map((section, index) => (
                <section key={section.id} id={section.id} className="border-border scroll-mt-28 grid grid-cols-1 gap-3 border-b py-10 md:grid-cols-[4rem_1fr]">
                  <span className="text-primary font-mono text-xs md:pt-1.5">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 className={cn(displayTitleClassName, 'mb-3 text-xl md:text-2xl')}>{section.title}</h2>
                    <div className="space-y-4">
                      {section.paragraphs.map(paragraph => (
                        <p key={paragraph} className={cn(bodyCopyClassName, 'text-base')}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </section>
              ))}
            </div>

            <div className="bg-foreground mt-14 p-8 text-white md:p-10">
              <p className="text-[11px] font-medium tracking-[0.16em] text-white/50 uppercase">Questions</p>
              <h2 className={cn(displayTitleClassName, 'mt-3 text-2xl text-white')}>Write to MAP</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed font-light text-white/70">
                Privacy and legal requests are answered by email. The office is at B29, Dubai Production City.
              </p>
              <a href="mailto:info@maproduction.ae" className="mt-6 inline-flex text-sm font-medium text-white underline-offset-4 hover:underline">
                info@maproduction.ae
              </a>
            </div>

            <div className="mt-12 lg:hidden">
              <Related related={related} />
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

function Related({ related }: { related: { href: string; title: string } }) {
  return (
    <div>
      <p className={eyebrowClassName}>
        <span className="bg-primary h-px w-8" aria-hidden />
        Related
      </p>
      <Link href={related.href} className={textLinkClassName}>
        {related.title}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}

function Contents({ sections, labelled = true }: { sections: LegalDocumentContent['sections']; labelled?: boolean }) {
  return (
    <div>
      {labelled ? (
        <p className={eyebrowClassName}>
          <span className="bg-primary h-px w-8" aria-hidden />
          Contents
        </p>
      ) : null}
      <ol className="border-border border-s">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="border-border text-muted-foreground hover:border-primary hover:text-foreground -ms-px flex gap-3 border-s border-transparent py-2 ps-4 text-sm font-light transition-colors"
            >
              <span className="text-primary font-mono text-xs">{String(index + 1).padStart(2, '0')}</span>
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
