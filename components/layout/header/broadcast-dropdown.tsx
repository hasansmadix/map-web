'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import {
  headerMenuDescriptionClass,
  headerMenuItemClass,
  headerMenuTitleClass,
  headerNavTriggerClass,
} from './nav-styles';

const services = [
  { label: 'Overview', description: 'Services, fleet, and where MAP works', href: '/broadcasting' },
  { label: 'Outside broadcast', description: 'Mobile production engagements', href: '/broadcasting/outside-broadcast' },
  { label: 'Live production', description: 'Multi-camera switching and delivery', href: '/broadcasting/live-production' },
  { label: 'Sports', description: 'Matches, sessions, and tournaments', href: '/broadcasting/sports-broadcasting' },
  { label: 'Transmission', description: 'Contribution and distribution', href: '/broadcasting/transmission' },
  { label: 'Technical crew', description: 'Engineers and operators', href: '/broadcasting/technical-crew' },
]

const systems = [
  { label: 'OB vans', description: 'Published vehicles', href: '/broadcasting/ob-vans' },
  { label: 'Flypacks', description: 'Portable flight-case systems', href: '/broadcasting/flypacks' },
  { label: 'Studios', description: 'The Dubai studio facility', href: '/broadcasting/studios' },
]

export function BroadcastDropdown({ onDark = false }: { onDark?: boolean }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={headerNavTriggerClass(onDark)}>Broadcast</NavigationMenuTrigger>
      <NavigationMenuContent
        className={cn(
          'left-[calc(50%-18rem)]! w-[36rem]! rounded-none! shadow-none!',
          onDark ? 'border-white/10 bg-foreground! text-white!' : 'bg-popover text-popover-foreground',
        )}
      >
        <div className="grid w-[36rem] max-h-[calc(100dvh-var(--spacing-navbar-height))] grid-cols-2 overflow-y-auto p-3">
          <div className="min-w-0">
            <p className={cn('px-3 py-2 text-[11px] font-medium tracking-[0.16em] uppercase', onDark ? 'text-white/45' : 'text-muted-foreground')}>Services</p>
            <ul>
              {services.map(item => (
                <li key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link className={headerMenuItemClass(onDark)} href={item.href}>
                      <div className={headerMenuTitleClass(onDark)}>{item.label}</div>
                      <p className={headerMenuDescriptionClass(onDark)}>{item.description}</p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </div>
          <div className={cn('min-w-0', onDark ? 'border-l border-white/10' : 'border-border border-l')}>
            <p className={cn('px-3 py-2 text-[11px] font-medium tracking-[0.16em] uppercase', onDark ? 'text-white/45' : 'text-muted-foreground')}>Systems</p>
            <ul>
              {systems.map(item => (
                <li key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link className={headerMenuItemClass(onDark)} href={item.href}>
                      <div className={headerMenuTitleClass(onDark)}>{item.label}</div>
                      <p className={headerMenuDescriptionClass(onDark)}>{item.description}</p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
