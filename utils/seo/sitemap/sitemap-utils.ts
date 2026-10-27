import { intentsService } from '@/services/intents/intents.service'
import { articlesService } from '@/services/articles.service'
import { equipmentsService } from '@/services/equipments/equipments.service'
import { listPublished } from '@/content/broadcast-units'
import { unitPath } from '@/content/broadcast-units/schema'
import { MetadataRoute } from 'next'
import seoConfig from '@/utils/seo/meta/seo.config'

const requestedPageSize = Number.parseInt(process.env.MAX_LOCS_PER_SITEMAP || '100', 10)

/** Public list endpoints reject a page larger than 100. */
export const maxLocsPerSitemap = Number.isFinite(requestedPageSize)
  ? Math.min(Math.max(requestedPageSize, 1), 100)
  : 100

export const sitemapEntities = ['static', 'production', 'broadcasts', 'intents', 'equipment', 'blog'] as const

export type SitemapEntity = (typeof sitemapEntities)[number]

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>

interface SitemapEntry {
  url: string
  priority: number
  changeFrequency: ChangeFrequency
  lastModified?: string
}

const staticEntries: SitemapEntry[] = [
  { url: '/', priority: 1, changeFrequency: 'weekly' },
  { url: '/about', priority: 0.7, changeFrequency: 'weekly' },
  { url: '/contact', priority: 0.7, changeFrequency: 'weekly' },
  { url: '/blog', priority: 0.8, changeFrequency: 'daily' },
  { url: '/legal/privacy', priority: 0.3, changeFrequency: 'weekly' },
  { url: '/legal/terms', priority: 0.3, changeFrequency: 'weekly' },
]

const productionEntries: SitemapEntry[] = [
  '/production',
  '/production/commercial-video-production',
  '/production/corporate-video-production',
  '/production/event-video-production',
  '/production/live-event-production',
  '/production/studio-video-production',
].map(url => ({
  url,
  priority: url === '/production' ? 0.9 : 0.8,
  changeFrequency: 'weekly' as const,
}))

const broadcastEntries: SitemapEntry[] = [
  '/broadcasting',
  '/broadcasting/outside-broadcast',
  '/broadcasting/live-production',
  '/broadcasting/sports-broadcasting',
  '/broadcasting/transmission',
  '/broadcasting/technical-crew',
  '/broadcasting/ob-vans',
  '/broadcasting/flypacks',
  '/broadcasting/studios',
  ...listPublished().map(unit => unitPath(unit)),
].map(url => ({
  url,
  priority: url === '/broadcasting' ? 0.9 : 0.8,
  changeFrequency: 'weekly' as const,
}))

function sliceEntries(entries: SitemapEntry[], page: number) {
  const start = (page - 1) * maxLocsPerSitemap
  return {
    urls: entries.slice(start, start + maxLocsPerSitemap).map(toSitemapUrl),
    count: entries.length,
  }
}

function toSitemapUrl(entry: SitemapEntry): MetadataRoute.Sitemap[number] {
  return {
    url: entry.url,
    lastModified: entry.lastModified ? new Date(entry.lastModified) : new Date(),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }
}

export function isSitemapEntity(entity: string): entity is SitemapEntity {
  return (sitemapEntities as readonly string[]).includes(entity)
}

export async function sitemapPage(entity: string, page: number): Promise<{ urls: MetadataRoute.Sitemap; count: number } | null> {
  if (!isSitemapEntity(entity) || page < 1) return null

  switch (entity) {
    case 'static':
      return sliceEntries(staticEntries, page)
    case 'production':
      return sliceEntries(productionEntries, page)
    case 'broadcasts':
      return sliceEntries(broadcastEntries, page)
    case 'intents':
      return intentPage(page)
    case 'equipment':
      return equipmentPage(page)
    case 'blog':
      return blogPage(page)
  }
}

async function intentPage(page: number) {
  const entries: SitemapEntry[] = [
    { url: '/equipment-rental', priority: 0.9, changeFrequency: 'daily' },
  ]

  try {
    const slugs = await intentsService.getAllSlugsForSitemap()
    for (const item of slugs) {
      if (!item.slug || item.type === 'HUB') continue
      entries.push({
        url: `/equipment-rental/${item.slug}`,
        priority: 0.8,
        changeFrequency: 'daily',
        lastModified: item.updatedAt,
      })
    }
  } catch {
    // The hub stays listed when the catalogue is unreachable.
  }

  return sliceEntries(entries, page)
}

async function equipmentPage(page: number) {
  try {
    const response = await equipmentsService.getAllPublic({ page, limit: maxLocsPerSitemap })
    const items = response.data ?? []
    return {
      urls: items
        .filter(item => item.slug)
        .map(item =>
          toSitemapUrl({
            url: `/equipments/${item.slug}`,
            priority: 0.6,
            changeFrequency: 'weekly',
            lastModified: item.updatedAt,
          }),
        ),
      count: response.pagination?.total ?? items.length,
    }
  } catch {
    return { urls: [], count: 0 }
  }
}

async function blogPage(page: number) {
  try {
    const response = await articlesService.getAll({ page, limit: maxLocsPerSitemap })
    const posts = response.data ?? []
    return {
      urls: posts
        .filter(post => post.slug)
        .map(post =>
          toSitemapUrl({
            url: `/blog/${post.slug}`,
            priority: 0.8,
            changeFrequency: 'daily',
            lastModified: post.updatedAt || post.createdAt,
          }),
        ),
      count: response.pagination?.total ?? posts.length,
    }
  } catch {
    return { urls: [], count: 0 }
  }
}

export function absoluteUrl(path: string) {
  const base = seoConfig.siteURL.replace(/\/$/, '')
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized}`
}

export function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, char => {
    switch (char) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      default:
        return '&apos;'
    }
  })
}

export function generateSitemapXml(urls: MetadataRoute.Sitemap): string {
  const urlsXml = urls
    .filter(url => url.url)
    .map(url => {
      const lastModified = url.lastModified instanceof Date ? url.lastModified : new Date(url.lastModified ?? Date.now())
      return `
       <url>
         <loc>${escapeXml(absoluteUrl(url.url))}</loc>
         <lastmod>${lastModified.toISOString()}</lastmod>
         <changefreq>${url.changeFrequency}</changefreq>
         <priority>${url.priority}</priority>
       </url>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              ${urlsXml}
            </urlset>`
}
