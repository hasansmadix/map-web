import { generateSitemapXml, sitemapPage } from '@/utils/seo/sitemap/sitemap-utils'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(_request: Request, props: { params: Promise<{ entity: string; index: string }> }) {
  const { entity, index } = await props.params
  const page = Number.parseInt(index.replace(/\.xml$/, ''), 10)

  if (!Number.isInteger(page) || page < 1) {
    return new NextResponse('Not found', { status: 404 })
  }

  const result = await sitemapPage(entity, page)
  if (!result || result.urls.length === 0) {
    return new NextResponse('Not found', { status: 404 })
  }

  return new NextResponse(generateSitemapXml(result.urls), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
