import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import DivHtml from '@/components/shared/div-html'
import { displayTitleClassName } from '@/components/website/common/marketing-styles'
import { cn, formatDate } from '@/lib/utils'
import type { Article } from '@/types/articles.types'
import { capitalizeEachWord } from '@/utils/format'

interface BlogArticleCardProps {
  article: Article
  priority?: boolean
  variant?: 'default' | 'lead'
}

export function BlogArticleCard({ article, priority = false, variant = 'default' }: BlogArticleCardProps) {
  const isLead = variant === 'lead'
  const href = `/blog/${article.slug}`
  const coverImage = article.image || FALLBACK_IMAGE
  const topic = toLabelList(article.topics)[0]
  const eyebrow = article.isFeatured ? 'Featured' : topic ? capitalizeEachWord(topic) : null
  const isUnoptimized =
    coverImage.includes('unsplash.com') || coverImage.includes('supabase.co') || coverImage.startsWith('http')

  return (
    <article className="h-full">
      <Link
        href={href}
        className={cn(
          'group border-border bg-background hover:border-primary/40 flex h-full flex-col border transition-colors',
          isLead && 'lg:grid lg:grid-cols-12',
        )}
      >
        <div
          className={cn(
            'bg-muted relative aspect-[3/2] overflow-hidden',
            isLead && 'lg:col-span-7 lg:aspect-auto lg:min-h-[32rem]',
          )}
        >
          <Image
            src={coverImage}
            alt=""
            fill
            sizes={isLead ? '(min-width: 1024px) 58vw, 100vw' : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            priority={priority}
            unoptimized={isUnoptimized}
          />
        </div>
        <div className={cn('flex flex-1 flex-col p-6', isLead && 'lg:col-span-5 lg:h-full lg:justify-center lg:p-12')}>
          {eyebrow ? (
            <p className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">{eyebrow}</p>
          ) : null}
          <h2 className={cn(displayTitleClassName, 'mt-3', isLead ? 'text-3xl md:text-4xl' : 'line-clamp-3 text-xl')}>
            {article.name}
          </h2>
          {article.excerpt ? (
            <div className={cn('text-muted-foreground mt-4 font-light', isLead ? 'line-clamp-4 text-base' : 'line-clamp-2 text-sm')}>
              <DivHtml html={article.excerpt} />
            </div>
          ) : null}
          <p className="text-muted-foreground mt-6 text-[11px] font-medium tracking-[0.16em] uppercase">
            {formatDate(article.createdAt)}
          </p>
          <span className="text-primary mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.14em] uppercase">
            Read
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  )
}

function toLabelList(value: unknown): string[] {
  if (!Array.isArray(value)) return []

  return value
    .map(entry => {
      if (typeof entry === 'string') return entry
      if (!entry || typeof entry !== 'object') return null

      const candidate = entry as { name?: unknown; slug?: unknown }
      if (typeof candidate.name === 'string') return candidate.name
      if (typeof candidate.slug === 'string') return candidate.slug
      return null
    })
    .filter((entry): entry is string => Boolean(entry))
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80&auto=format&fit=crop'
