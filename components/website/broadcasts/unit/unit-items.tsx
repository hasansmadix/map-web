import type { BroadcastUnitItem } from '@/types/broadcasts/broadcasts.types'
import { BroadcastUnitItemGroup } from '@/types/broadcasts/broadcast.enums'
import { formatGroup } from './unit-utils'
import { bodyCopyClassName, displayTitleClassName, eyebrowClassName } from '@/components/website/common/marketing-styles'
import { cn } from '@/lib/utils'

interface UnitItemsProps {
  groupedItems: Record<string, BroadcastUnitItem[]>
}

export function UnitItems({ groupedItems }: UnitItemsProps) {
  const groups = Object.entries(groupedItems)

  return (
    <section>
      <p className={eyebrowClassName}>
        <span className="bg-primary h-px w-8" aria-hidden />
        On board
      </p>
      <h2 className={cn(displayTitleClassName, 'text-3xl md:text-4xl')}>Equipment</h2>
      <p className={cn(bodyCopyClassName, 'mt-4 max-w-2xl text-base')}>What this unit carries. Quantities are what ships with it.</p>
      <div className="mt-12 space-y-12">
        {groups.map(([group, items]) => (
          <div key={group}>
            <h3 className="text-primary mb-4 text-[11px] font-medium tracking-[0.16em] uppercase">
              {group === 'OTHER' ? 'Other' : formatGroup(group as BroadcastUnitItemGroup)}
            </h3>
            <ul className="border-border border-t">
              {items.map((item, index) => (
                <li key={`${item.title}-${index}`} className="border-border flex items-start justify-between gap-6 border-b py-4">
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    {item.notes ? <p className="text-muted-foreground mt-1 text-sm font-light">{item.notes}</p> : null}
                  </div>
                  {item.qty != null && item.qty > 0 ? (
                    <span className="text-primary shrink-0 font-mono text-xs tabular-nums">×{item.qty}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
