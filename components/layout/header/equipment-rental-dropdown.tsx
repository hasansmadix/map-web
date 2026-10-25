'use client';

import Link from 'next/link';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useEquipmentNav, type EquipmentNavItem } from './equipment-rental-nav';
import {
  headerMenuDescriptionClass,
  headerMenuItemClass,
  headerMenuPanelClass,
  headerMenuTitleClass,
  headerNavTriggerClass,
} from './nav-styles';

export function EquipmentRentalDropdown({ onDark = false }: { onDark?: boolean }) {
  const { data } = useEquipmentNav();
  const categories = data?.categories ?? [];
  const brands = data?.brands ?? [];
  const wide = brands.length > 0;

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={headerNavTriggerClass(onDark)}>Equipment Rental</NavigationMenuTrigger>
      <NavigationMenuContent
        className={cn(
          wide ? 'left-[calc(50%-18rem)]! w-[36rem]!' : headerMenuPanelClass(onDark),
          'rounded-none! shadow-none!',
          onDark ? 'border-white/10 bg-foreground! text-white!' : 'bg-popover text-popover-foreground',
        )}
      >
        <div
          className={cn(
            'max-h-[calc(100dvh-var(--spacing-navbar-height))] overflow-y-auto p-3',
            wide ? 'grid w-[36rem] grid-cols-2' : 'w-80',
          )}
        >
          <EquipmentColumn onDark={onDark} label="Categories" items={categories} overview />
          {wide ? (
            <div className={cn('min-w-0', onDark ? 'border-l border-white/10' : 'border-border border-l')}>
              <EquipmentColumn onDark={onDark} label="Brands" items={brands} />
            </div>
          ) : null}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function EquipmentColumn({
  onDark,
  label,
  items,
  overview = false,
}: {
  onDark: boolean;
  label: string;
  items: EquipmentNavItem[];
  overview?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className={cn('px-3 py-2 text-[11px] font-medium tracking-[0.16em] uppercase', onDark ? 'text-white/45' : 'text-muted-foreground')}>
        {label}
      </p>
      <ul>
        {overview ? (
          <li>
            <NavigationMenuLink asChild>
              <Link className={headerMenuItemClass(onDark)} href="/equipment-rental">
                <div className={headerMenuTitleClass(onDark)}>All equipment</div>
                <p className={headerMenuDescriptionClass(onDark)}>The rental catalogue</p>
              </Link>
            </NavigationMenuLink>
          </li>
        ) : null}
        {items.map(item => (
          <li key={item.href}>
            <NavigationMenuLink asChild>
              <Link className={headerMenuItemClass(onDark)} href={item.href}>
                <div className={headerMenuTitleClass(onDark)}>{item.label}</div>
                {item.description ? <p className={headerMenuDescriptionClass(onDark)}>{item.description}</p> : null}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
