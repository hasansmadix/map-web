import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { textLinkClassName } from '@/components/website/common/marketing-styles';
import type { IntentLinkItem } from '@/types/intents/intent.type';

interface IntentInternalLinksProps {
  internalLinks: IntentLinkItem[];
}

export function IntentInternalLinks({ internalLinks }: IntentInternalLinksProps) {
  if (!internalLinks?.length) return null;

  const uniqueLinks = internalLinks.filter(
    (link, i, arr) => arr.findIndex(l => l.slug === link.slug && l.url === link.url) === i,
  );

  return (
    <ul className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      {uniqueLinks.map((link, index) => (
        <li key={`${link.slug}-${link.url}-${index}`}>
          <Link href={link.url} className={textLinkClassName}>
            {link.linkLabel}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
