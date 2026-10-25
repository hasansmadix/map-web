import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { BlogArticleCard } from '@/components/website/blog/blog-article-card'
import { displayTitleClassName, eyebrowClassName, textLinkClassName } from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'
import { articlesService } from '@/services/articles.service'

export async function ArticlesSection() {
  let articlesResponse

  try {
    articlesResponse = await articlesService.getAll({
      limit: 3,
    })
  } catch {
    articlesResponse = { data: [] }
  }

  const articles = articlesResponse.data || []

  if (articles.length === 0) return null

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className={eyebrowClassName}>
            <span className="bg-primary h-px w-8" aria-hidden />
            Blog
          </p>
          <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>Notes from the studio</h2>
        </div>
        <Link href="/blog" className={textLinkClassName}>
          Read the blog
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <BlogArticleCard key={article.id} article={article} priority={index < 2} />
        ))}
      </div>
    </div>
  )
}
