import { absoluteUrl, escapeXml, maxLocsPerSitemap, sitemapEntities, sitemapPage } from '@/utils/seo/sitemap/sitemap-utils'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const sitemapIndexXml = await generateSitemapIndex()

  return new NextResponse(sitemapIndexXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

async function generateSitemapIndex(): Promise<string> {
  const sitemaps = []

  for (const entity of sitemapEntities) {
    const page = await sitemapPage(entity, 1)
    const count = page?.count ?? 0
    if (count < 1) continue

    const pages = Math.ceil(count / maxLocsPerSitemap)
    for (let id = 1; id <= pages; id += 1) {
      sitemaps.push(`
          <sitemap>
            <loc>${escapeXml(absoluteUrl(`/sitemap/${entity}/${id}.xml`))}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
          </sitemap>`)
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemaps.join('')}
  </sitemapindex>`
}
