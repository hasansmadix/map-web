import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  bodyCopyClassName,
  displayTitleClassName,
  eyebrowClassName,
  textLinkClassName,
} from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'

export function HomeIntro() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className={eyebrowClassName}>
            <span className="bg-primary h-px w-8" aria-hidden />
            The organisation
          </p>
          <h2 className={cn(displayTitleClassName, 'mb-6 text-3xl md:text-4xl')}>
            One floor for the shoot and the broadcast
          </h2>
          <p className={cn(bodyCopyClassName, 'mb-8 text-base')}>
            Commercials, corporate films, studio sessions, and outside broadcasts are planned as one
            engagement. Crew, cameras, and post-production come from B29, Dubai Production City.
          </p>
          <Link href="/about" className={textLinkClassName}>
            About MAP
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="relative lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src="/about-image.jpg"
              alt="MAP production studio"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="bg-primary absolute -bottom-6 hidden size-24 md:block ltr:-left-6" aria-hidden />
        </div>
      </div>
    </section>
  )
}
