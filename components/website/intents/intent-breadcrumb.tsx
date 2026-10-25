import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Fragment } from 'react';
import type { IntentBreadcrumbItem as IntentBreadcrumbItemType } from '@/types/intents/intent.type';

interface IntentBreadcrumbProps {
  breadcrumbs: IntentBreadcrumbItemType[];
}

export function IntentBreadcrumb({ breadcrumbs }: IntentBreadcrumbProps) {
  if (!breadcrumbs?.length) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex-nowrap overflow-hidden text-[13px] text-muted-foreground">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <Fragment key={crumb.slug}>
              {index > 0 ? <BreadcrumbSeparator className="text-muted-foreground/40">/</BreadcrumbSeparator> : null}
              <BreadcrumbItem className={isLast ? 'min-w-0' : 'shrink-0'}>
                {isLast ? (
                  <BreadcrumbPage className="truncate font-normal text-foreground">{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild className="hover:text-foreground">
                    <Link href={crumb.url}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
