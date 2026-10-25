import Link from 'next/link'

import CustomPagination from '@/components/shared/pagination/custom-pagination'
import { articlesService } from '@/services/articles.service'
import { articlesSchema } from '@/utils/seo/schema/articles/articles-schema'
import { BlogArticleCard } from './blog-article-card'

interface BlogSectionProps {
  page: number
  limit: number
  search: string
  isFeatured?: boolean
}

export async function BlogSection({ page, limit, search, isFeatured }: BlogSectionProps) {
  let res
  try {
    res = await articlesService.getAll({
      search,
      page,
      limit,
      isFeatured,
    })
  } catch {
    return <p className="text-muted-foreground text-sm font-light">The blog could not be loaded.</p>
  }

  const articles = res.data || []
  const pagination = res.pagination
  const total = pagination?.total ?? articles.length
  const showLead = page === 1 && !search && articles.length > 1
  const lead = showLead ? articles[0] : null
  const rest = showLead ? articles.slice(1) : articles
  const jsonLd = articles.length > 0 ? await articlesSchema(articles, page) : null

  return (
    <>
      {jsonLd ? (
        <script
          id="blog-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      ) : null}

      <div className="border-border mb-12 flex flex-col gap-6 border-b pb-6 md:flex-row md:items-end md:justify-between">
        <p className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">
          {total} {total === 1 ? 'note' : 'notes'}
        </p>
        <form action="/blog" className="flex w-full max-w-md items-center gap-4">
          <label className="sr-only" htmlFor="blog-search">
            Search the blog
          </label>
          <input
            id="blog-search"
            name="search"
            defaultValue={search}
            placeholder="Search the blog"
            className="border-border text-foreground placeholder:text-muted-foreground h-12 w-full border-b bg-transparent text-sm outline-none"
          />
          <button type="submit" className="text-primary shrink-0 text-[11px] font-medium tracking-[0.16em] uppercase">
            Search
          </button>
        </form>
      </div>

      {search ? (
        <p className="text-muted-foreground mb-8 text-sm font-light">
          Results for “{search}”.{' '}
          <Link href="/blog" className="text-primary">
            Clear
          </Link>
        </p>
      ) : null}

      {articles.length === 0 ? (
        <div className="border-border border px-6 py-16">
          <p className="text-sm font-medium">{search ? 'No matching articles' : 'No articles yet'}</p>
          <p className="text-muted-foreground mt-2 text-sm font-light">
            {search ? 'Try another term, or return to the full blog.' : 'New notes will be published here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {lead ? <BlogArticleCard article={lead} priority variant="lead" /> : null}
          {rest.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((article, idx) => (
                <BlogArticleCard key={article.id} article={article} priority={!lead && idx < 3} />
              ))}
            </div>
          ) : null}
        </div>
      )}

      {pagination && articles.length > 0 ? (
        <CustomPagination
          currentPage={pagination.currentPage}
          totalCount={pagination.total}
          pageSize={pagination.limit}
          className="mt-12"
        />
      ) : null}
    </>
  )
}

export { BlogSectionSkeleton } from './blog-section-skeleton'
