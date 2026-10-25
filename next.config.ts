import type { NextConfig } from 'next';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'mfxqxyqtbfolsyqmnbyv.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'hfzwowomsvrllqetjzei.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'maproduction.ae',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },

  async redirects() {
    return legacyRedirects
  },
};

interface LegacyRedirect {
  source: string
  destination: string
  permanent: true
  has?: { type: 'query'; key: string; value: string }[]
}

function redirect(source: string, destination: string): LegacyRedirect {
  return { source, destination, permanent: true }
}

function productDestination(slug: string) {
  if (slug.includes('zeiss')) return '/equipment-rental/zeiss'
  if (slug.includes('arri')) return '/equipment-rental/arri'
  if (slug.includes('sony')) return '/equipment-rental/sony'
  if (slug.includes('canon')) return '/equipment-rental/canon'
  return '/equipment-rental/camera-rental'
}

function collectionDestination(slug: string) {
  if (slug.includes('lens')) return '/equipment-rental/lens-rental'
  return '/equipment-rental/camera-rental'
}

const shopifyPages: Record<string, string> = {
  '/pages/contact': '/contact',
  '/pages/about-us': '/about',
  '/pages/media-production-dubai': '/production',
  '/pages/corporate-video-production-services-uae': '/production/corporate-video-production',
  '/pages/commercial-video-production-uae': '/production/commercial-video-production',
  '/pages/music-video-production-dubai': '/production',
  '/pages/short-film-production-uae-saudi-arabia': '/production',
  '/pages/documentary-production-uae-saudi-arabia': '/production',
  '/pages/event-coverage-video-production-uae-saudi-arabia': '/production/event-video-production',
  '/pages/social-media-content-production-uae-saudi-arabia': '/production',
  '/pages/educational-video-production-uae-saudi-arabia': '/production',
  '/pages/broadcasting-services': '/broadcasting',
  '/pages/live-event-broadcasting-uae-saudi-arabia-middle-east': '/broadcasting/live-production',
  '/pages/tv-broadcasting-services-uae-saudi-arabia-middle-east': '/broadcasting',
  '/pages/sports-broadcasting-services-uae-saudi-arabia-middle-east': '/broadcasting/sports-broadcasting',
  '/pages/ob-van-services-uae-saudi-arabia-middle-east': '/broadcasting/ob-vans',
  '/pages/satellite-broadcasting-services-uae-saudi-arabia-middle-east': '/broadcasting/transmission',
  '/pages/event-management-uae-middle-east': '/production/event-video-production',
  '/pages/professional-photography-services-uae': '/production',
  '/pages/equipment-rental-uae': '/equipment-rental',
  '/pages/rental-terms-conditions': '/legal/terms',
  '/pages/html-sitemap': '/',
  '/pages/html-sitemap-products': '/equipment-rental',
  '/pages/html-sitemap-collections': '/equipment-rental',
  '/pages/html-sitemap-blogs': '/blog',
  '/pages/html-sitemap-articles': '/blog',
  '/pages/html-sitemap-pages': '/',
}

const shopifyCollections = [
  'cinema-cameras-uae',
  'dslr-cameras-rental-uae',
  'mirrorless-cameras-rental-uae',
  'broadcast-cameras-rental-uae',
  'studio-cameras-rental-uae',
  'action-cameras-rental-uae',
  'lenses-rental-uae',
  'cinema-lenses-rental-uae',
  'dslr-lenses-rental-uae',
  'prime-lenses-rental-uae',
  'zoom-lenses-rental-uae',
  'mirrorless-lenses-rental-uae',
  'broadcast-lenses-rental-uae',
]

const shopifyProducts = [
  'canon-eos-c300-iii-cinema-camera-rental-in-uae',
  'canon-eos-c300-mark-ii-cinema-camera-rental-in-uae',
  'canon-eos-r-mirrorless-camera-rental-in-uae',
  'sony-pmw-f55-cinealta-4k-digital-cinema-camera-rental-in-uae',
  'sony-pmw-f5-cinealta-digital-cinema-camera-rental-in-uae',
  'sony-alpha-a7s-iii-camera-rental-in-uae',
  'sony-fx3-cinema-line-camera-rental-in-uae',
  'sony-fx6-cinema-camera-rental-in-uae',
  'sony-rialto-extension-system-rental-in-uae',
  'sony-venice-cinealta-6k-camera-rental-in-uae',
  'red-dsmc2-helium-8k-s35-camera-rental-in-uae',
  'arri-alexa-mini-lf-camera-rental-in-uae',
  'arri-alexa-35-camera-rental-uae',
  'gopro-hero-5-rental-uae',
  'gopro-hero-7-rental-uae',
  'gopro-hero-9-rental-uae',
  'gopro-hero-11-rental-uae',
  'gopro-hero-12-rental-uae',
  'zeiss-supreme-25mm-t1-5-uae',
  'zeiss-supreme-25mm-t1-5-rental-uae',
  'zeiss-supreme-29mm-t1-5-uae',
  'zeiss-supreme-35mm-t1-5-uae',
  'zeiss-supreme-50mm-t1-5-uae',
  'zeiss-supreme-85mm-t1-5-uae',
  'zeiss-supreme-100mm-t1-5-uae',
  'zeiss-supreme-135mm-t1-5-uae',
  'zeiss-super-speed-lens-18mm-rental-uae',
  'zeiss-super-speed-lens-25mm-rental-uae',
  'zeiss-super-speed-lens-35mm-rental-uae',
  'zeiss-super-speed-lens-50mm-rental-uae',
  'zeiss-super-speed-lens-85mm-rental-uae',
  'arri-signature-prime-18mm-t1-8-uae',
  'arri-signature-prime-25mm-t1-8-uae',
  'arri-signature-prime-35mm-t1-8-uae',
  'arri-signature-prime-lens-47mm-t1-8-uae',
  'arri-signature-prime-lens-75mm-t1-8-uae',
  'arri-signature-prime-lens-125mm-t1-8-uae',
]

const shopifyArticles = [
  '/blogs/news',
  '/blogs/articles',
  '/blogs/articles/future-of-media-production-middle-east',
  '/blogs/articles/professional-media-production-for-brand-building',
  '/blogs/articles/the-power-of-corporate-videos',
  '/blogs/articles/event-video-coverage-benefits',
]

const legacyRedirects: LegacyRedirect[] = [
  redirect('/commercial-video-production', '/production/commercial-video-production'),
  redirect('/corporate-video-production', '/production/corporate-video-production'),
  redirect('/event-video-production', '/production/event-video-production'),
  redirect('/live-event-production', '/production/live-event-production'),
  redirect('/studio-video-production', '/production/studio-video-production'),
  redirect('/services', '/production'),
  redirect('/services/:path*', '/production/:path*'),
  {
    source: '/broadcasts',
    has: [{ type: 'query', key: 'type', value: 'OBVAN' }],
    destination: '/broadcasting/ob-vans',
    permanent: true,
  },
  {
    source: '/broadcasts',
    has: [{ type: 'query', key: 'type', value: 'FLIGHT_CASE' }],
    destination: '/broadcasting/flypacks',
    permanent: true,
  },
  redirect('/broadcasts', '/broadcasting'),
  redirect('/broadcasting/portable-broadcast-systems', '/broadcasting/flypacks'),
  redirect('/sitemap/services/:index', '/sitemap/production/:index'),
  ...Object.entries(shopifyPages).map(([source, destination]) => redirect(source, destination)),
  ...shopifyCollections.map(slug => redirect(`/collections/${slug}`, collectionDestination(slug))),
  ...shopifyProducts.map(slug => redirect(`/products/${slug}`, productDestination(slug))),
  ...shopifyArticles.map(source => redirect(source, '/blog')),
  redirect('/privacy', '/legal/privacy'),
  redirect('/terms', '/legal/terms'),
  redirect('/policies/privacy-policy', '/legal/privacy'),
  redirect('/policies/terms-of-service', '/legal/terms'),
  redirect('/policies/refund-policy', '/legal/terms'),
  redirect('/collections', '/equipment-rental'),
  redirect('/search', '/equipment-rental'),
  redirect('/cart', '/equipment-rental'),
  redirect('/checkout', '/contact?subject=rfq'),
  redirect('/account/login', '/login'),
  redirect('/account/:path*', '/login'),
]

export default withBundleAnalyzer(nextConfig);
