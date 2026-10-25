import { BroadcastType } from '@/types/broadcasts/broadcast.enums';

export const BROADCAST_TYPE_LABEL: Record<string, string> = {
  [BroadcastType.OBVAN]: 'OB van',
  [BroadcastType.FLIGHT_CASE]: 'Flight case',
};

export function broadcastTypeLabel(type?: string) {
  if (!type) return 'Unit';
  if (BROADCAST_TYPE_LABEL[type]) return BROADCAST_TYPE_LABEL[type];
  if (type.length <= 3) return type;
  return type.charAt(0) + type.slice(1).toLowerCase();
}

export function broadcastUnitPath(slug?: string) {
  const page = slug?.trim();
  return page ? `/broadcasting/units/${page}` : '/broadcasting/units';
}

export function groupLabel(value: string) {
  return value
    .split('_')
    .map(word => (word.length <= 3 ? word : word.charAt(0) + word.slice(1).toLowerCase()))
    .join(' ');
}
