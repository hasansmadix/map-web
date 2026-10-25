import Image from 'next/image'
import type { GalleryItem } from '@/types/common.types'
import { displayTitleClassName, eyebrowClassName } from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'

interface UnitGalleryProps {
  gallery: (GalleryItem & { alt?: string })[]
  unitTitle: string
  unitSlug: string
}

export function UnitGallery({ gallery, unitTitle, unitSlug }: UnitGalleryProps) {
  const images = [...gallery].sort((a, b) => a.order - b.order)

  return (
    <section>
      <p className={eyebrowClassName}>
        <span className="bg-primary h-px w-8" aria-hidden />
        Gallery
      </p>
      <h2 className={cn(displayTitleClassName, 'mb-10 text-3xl md:text-4xl')}>The unit</h2>
      <ul className="border-border bg-border grid grid-cols-1 gap-px border sm:grid-cols-2 lg:grid-cols-3">
        {images.map((item, index) => (
          <li key={`${item.path}-${item.order}`} className={cn('bg-card relative aspect-[4/3]', index === 0 && images.length > 1 && 'sm:col-span-2 sm:aspect-[16/8] lg:col-span-2')}>
            <Image
              src={item.path}
              alt={item.alt || `${unitTitle || unitSlug} ${index + 1}`}
              fill
              className="object-cover"
              sizes={index === 0 ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, 50vw'}
              unoptimized={item.path.includes('supabase.co')}
              priority={index === 0}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
