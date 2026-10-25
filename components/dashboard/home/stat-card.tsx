import Link from 'next/link';
import { ChevronRight, FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  href: string;
  value: number;
  icon: typeof FileText;
}

function StatCard({ title, value, href, icon: Icon }: StatCardProps) {
  const displayValue = Number.isFinite(value) ? value.toLocaleString() : '—';

  return (
    <Card className="group relative overflow-hidden shadow-none">
      <span className="bg-primary absolute inset-x-0 top-0 h-px" aria-hidden />
      <CardHeader className="relative pb-2">
        <CardTitle className="text-muted-foreground text-[11px] font-medium tracking-[0.16em] uppercase">{title}</CardTitle>
        <CardAction>
          <div className="text-primary ring-border grid size-10 place-items-center ring-1">
            <Icon className="size-5 shrink-0" strokeWidth={1.5} />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="relative space-y-2">
        <div className="text-primary text-3xl font-light tracking-tight tabular-nums">{displayValue}</div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground -mx-2 w-fit px-2"
        >
          <Link href={href} className="inline-flex items-center gap-1">
            View
            <ChevronRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default StatCard;
