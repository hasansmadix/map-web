import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { marketingButtonClassName } from '@/components/website/common/marketing-styles';
import { cn } from '@/lib/utils';

interface EquipmentEnquiryProps {
  name: string;
  facts: { label: string; value: string }[];
}

export function EquipmentEnquiry({ name, facts }: EquipmentEnquiryProps) {
  return (
    <aside className="border-border bg-card border lg:sticky lg:top-28 lg:self-start">
      <div className="border-border border-b p-6">
        <p className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">Hire</p>
        <p className="mt-3 text-lg font-medium tracking-tight">{name}</p>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed font-light">
          Tell us the dates and the production. MAP will confirm availability and send a written quote.
        </p>
      </div>
      {facts.length > 0 ? (
        <dl className="border-border border-b">
          {facts.map(fact => (
            <div key={fact.label} className="border-border flex items-baseline justify-between gap-4 border-b px-6 py-3 last:border-b-0">
              <dt className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">{fact.label}</dt>
              <dd className="text-end text-sm font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <div className="p-6">
        <Link href="/contact" className={cn(marketingButtonClassName.primary, 'group w-full')}>
          Request this item
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <ul className="text-muted-foreground border-border space-y-2 border-t p-6 text-sm font-light">
        <li>Held at Dubai Production City</li>
        <li>Quoted before the hire</li>
        <li>Crew available with the kit</li>
      </ul>
    </aside>
  );
}
