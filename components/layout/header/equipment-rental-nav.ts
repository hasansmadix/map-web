'use client';

import { useQuery } from '@tanstack/react-query';
import { intentsService } from '@/services/intents/intents.service';

export interface EquipmentNavItem {
  label: string;
  href: string;
  description?: string;
}

const typeDescription: Record<string, string> = {
  CLUSTER: 'Category',
  CATEGORY: 'Category',
  BRAND: 'Brand',
  MODEL: 'Model',
  OFFER: 'Offer',
  LOCATION: 'Location',
};

export function useEquipmentNav() {
  return useQuery({
    queryKey: ['header', 'equipment-rental-nav'],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const [hub, slugs] = await Promise.all([
        intentsService.getHub(),
        intentsService.getAllSlugsForSitemap(),
      ]);
      const typeBySlug = new Map(slugs.map(item => [item.slug, item.type]));
      const seen = new Set<string>();
      const categories: EquipmentNavItem[] = [];
      const brands: EquipmentNavItem[] = [];

      function add(link: { slug: string; linkLabel: string; url: string }, preferCategory = false) {
        if (!link.url || link.url === '/equipment-rental' || seen.has(link.url)) return;
        seen.add(link.url);
        const type = typeBySlug.get(link.slug);
        const item = {
          label: link.linkLabel,
          href: link.url,
          description: type ? typeDescription[type] : undefined,
        };
        if (preferCategory || type === 'CLUSTER' || type === 'CATEGORY') categories.push(item);
        else brands.push(item);
      }

      for (const badge of hub.smartBadges ?? []) add(badge, true);
      for (const link of hub.internalLinks ?? []) add(link);

      return { categories, brands };
    },
  });
}
