import Link from 'next/link';
import type { IntentLinkItem } from '@/types/intents/intent.type';

interface IntentSmartBadgesProps {
  smartBadges: IntentLinkItem[];
}

export function IntentSmartBadges({ smartBadges }: IntentSmartBadgesProps) {
  if (!smartBadges?.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {smartBadges.map(badge => (
        <Link
          key={badge.url}
          href={badge.url}
          className="border-border text-foreground/80 hover:border-primary hover:text-primary inline-flex h-9 shrink-0 items-center border px-4 text-[11px] font-medium tracking-[0.14em] whitespace-nowrap uppercase transition-colors"
        >
          {badge.linkLabel}
        </Link>
      ))}
    </div>
  );
}
