import type { IntentType } from '@/types/intents/intent.type';

export const INTENT_TYPE_LABEL: Record<IntentType, string> = {
  HUB: 'Hub',
  CLUSTER: 'Cluster',
  CATEGORY: 'Category',
  BRAND: 'Brand',
  MODEL: 'Model',
  OFFER: 'Offer',
  LOCATION: 'Location',
};

export const INTENT_TYPE_OPTIONS = (Object.keys(INTENT_TYPE_LABEL) as IntentType[]).map(value => ({
  value,
  label: INTENT_TYPE_LABEL[value],
}));

export function intentPath(type: string | undefined, slug: string | undefined) {
  if (type === 'HUB') return '/equipment-rental';
  const page = slug?.trim();
  return page ? `/equipment-rental/${page}` : '/equipment-rental';
}
