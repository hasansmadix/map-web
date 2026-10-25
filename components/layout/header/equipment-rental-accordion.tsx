'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SheetClose } from '@/components/ui/sheet';
import { useEquipmentNav } from './equipment-rental-nav';

export function MobileEquipmentAccordion({ onLinkClick }: { onLinkClick?: () => void }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data } = useEquipmentNav();
  const categories = data?.categories ?? [];
  const brands = data?.brands ?? [];

  const handleLinkClick = () => {
    onLinkClick?.();
    setIsOpen(false);
  };

  return (
    <div className="space-y-1.5">
      <button
        className={cn(
          'group flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3.5',
          'bg-accent/30 hover:bg-accent hover:text-primary',
          'hover:border-accent-foreground/10 border border-transparent',
          'text-sm font-semibold transition-all duration-200',
          'focus-visible:ring-primary/20 focus-visible:ring-2 focus-visible:outline-none',
          isOpen && 'bg-accent text-primary border-accent-foreground/10',
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="equipment-accordion-content"
      >
        <div className="flex items-center gap-2.5">
          <Search className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
          <span>Equipment Rental</span>
        </div>
        <ChevronDown
          className={cn(
            'text-muted-foreground h-4 w-4 flex-none transition-all duration-300 ease-in-out',
            isOpen ? 'text-primary rotate-180' : 'group-hover:text-primary',
          )}
          aria-hidden="true"
        />
      </button>
      <div
        id="equipment-accordion-content"
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="space-y-3 pt-1 pr-2 pl-4">
          <div>
            <p className="text-muted-foreground px-3 py-1 text-[11px] font-medium tracking-[0.16em] uppercase">Categories</p>
            <SheetClose asChild>
              <Link href="/equipment-rental" onClick={handleLinkClick} className="hover:bg-accent hover:text-primary flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium">
                <span className="bg-muted-foreground/40 h-1.5 w-1.5 rounded-full" />
                All equipment
              </Link>
            </SheetClose>
            {categories.map(item => (
              <SheetClose key={item.href} asChild>
                <Link href={item.href} onClick={handleLinkClick} className="hover:bg-accent hover:text-primary flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium">
                  <span className="bg-muted-foreground/40 h-1.5 w-1.5 rounded-full" />
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </div>
          {brands.length > 0 ? (
            <div>
              <p className="text-muted-foreground px-3 py-1 text-[11px] font-medium tracking-[0.16em] uppercase">Brands</p>
              {brands.map(item => (
                <SheetClose key={item.href} asChild>
                  <Link href={item.href} onClick={handleLinkClick} className="hover:bg-accent hover:text-primary flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium">
                    <span className="bg-muted-foreground/40 h-1.5 w-1.5 rounded-full" />
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
