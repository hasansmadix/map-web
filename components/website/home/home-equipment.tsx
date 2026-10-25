import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { equipmentBrandLinks, equipmentCategoryLinks } from '@/components/website/home/home-page.data'
import {
  bodyCopyClassName,
  displayTitleClassName,
  eyebrowClassName,
  textLinkClassName,
} from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'

export function HomeEquipment() {
  return (
    <section className="border-border bg-background border-t py-24 md:py-32">
      <div className="container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className={eyebrowClassName}>
            <span className="bg-primary h-px w-8" aria-hidden />
            Rental
          </p>
          <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>Cameras, lenses, and light</h2>
          <p className={cn(bodyCopyClassName, 'mt-4 text-base')}>
            Camera, lens, and lighting rental, prepared at Dubai Production City.
          </p>
          <Link href="/equipment-rental" className={cn(textLinkClassName, 'mt-8')}>
            Browse the catalogue
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="lg:col-span-8">
          <ul className="border-border border-t">
            {equipmentCategoryLinks.map(link => (
              <li key={link.href} className="border-border border-b">
                <Link href={link.href} className="group flex items-center justify-between gap-6 py-5">
                  <span className="text-lg font-medium tracking-tight">{link.text}</span>
                  <ArrowRight className="text-primary size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {equipmentBrandLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} className={textLinkClassName}>
                  {link.text}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
