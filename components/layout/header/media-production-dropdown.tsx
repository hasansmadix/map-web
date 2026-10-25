'use client';

import Link from 'next/link';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { mediaProductionNavItems } from './media-production-nav.data';
import {
  headerMenuDescriptionClass,
  headerMenuItemClass,
  headerMenuPanelClass,
  headerMenuTitleClass,
  headerNavTriggerClass,
} from './nav-styles';

export function MediaProductionDropdown({ onDark = false }: { onDark?: boolean }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={headerNavTriggerClass(onDark)}>Production</NavigationMenuTrigger>
      <NavigationMenuContent className={headerMenuPanelClass(onDark)}>
        <ul className="max-h-[calc(100dvh-var(--spacing-navbar-height))] w-80 overflow-y-auto p-1.5">
          {mediaProductionNavItems.map(item => (
            <li key={item.href}>
              <NavigationMenuLink asChild>
                <Link className={headerMenuItemClass(onDark)} href={item.href}>
                  <div className={headerMenuTitleClass(onDark)}>{item.label}</div>
                  {item.description ? <p className={headerMenuDescriptionClass(onDark)}>{item.description}</p> : null}
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
          <li className={onDark ? 'mt-1 border-t border-white/10 pt-1' : 'border-border/50 mt-1 border-t pt-1'}>
            <NavigationMenuLink asChild>
              <Link className={headerMenuItemClass(onDark)} href="/production">
                <div className={headerMenuTitleClass(onDark)}>All production</div>
                <p className={headerMenuDescriptionClass(onDark)}>Finished programmes and live engagements</p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link className={headerMenuItemClass(onDark)} href="/broadcasting">
                <div className={headerMenuTitleClass(onDark)}>Broadcasting operations</div>
                <p className={headerMenuDescriptionClass(onDark)}>Systems, crew, and live technical production</p>
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
