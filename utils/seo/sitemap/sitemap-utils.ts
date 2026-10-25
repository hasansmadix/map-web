import { intentsService } from '@/services/intents/intents.service';
import { listPublished } from '@/content/broadcast-units';
import { unitPath } from '@/content/broadcast-units/schema';
import { MetadataRoute } from 'next';

const maxLocsPerSitemap = Number.parseInt(process.env.MAX_LOCS_PER_SITEMAP || '1000');

const broadcastPaths = [
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
]

export const productionPaths = [
  '/production',
  '/production/commercial-video-production',
  '/production/corporate-video-production',
  '/production/event-video-production',
  '/production/live-event-production',
  '/production/studio-video-production',
]

export async function generateBroadcastUrls(page: number = 1) {
  const start = (page - 1) * maxLocsPerSitemap
  const end = start + maxLocsPerSitemap
  return { urls: broadcastPaths.slice(start, end), count: broadcastPaths.length }
}

export async function generateIntentUrls(page: number = 1) {
  const items: { url: string; updatedAt: string }[] = [{ url: '/equipment-rental', updatedAt: new Date().toISOString() }];

  try {
    const slugs = await intentsService.getAllSlugsForSitemap();
    for (const item of slugs) {
      if (item.type === 'HUB') continue;
      items.push({ url: `/equipment-rental/${item.slug}`, updatedAt: item.updatedAt });
    }
  } catch {
    // Fallback: hub only
  }

  const start = (page - 1) * maxLocsPerSitemap;
  const end = start + maxLocsPerSitemap;
  const currentItems = items.slice(start, end);

  return { items: currentItems, count: items.length };
}

const siteURL = process.env.NEXT_PUBLIC_SITE_URL!;
export function generateSitemapXml(urls: MetadataRoute.Sitemap): string {
  const urlsXml = urls
    .map(
      url => `
       <url>
         <loc>${siteURL}${url.url}</loc>
         <lastmod>${
           typeof url.lastModified === 'string'
             ? url.lastModified
             : (url.lastModified ?? new Date())?.toISOString()
         }</lastmod>
         <changefreq>${url.changeFrequency}</changefreq>
         <priority>${url.priority}</priority>
       </url>
     `,
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
              ${urlsXml}
            </urlset>`;
}
