import { Skeleton } from '@/components/ui/skeleton';

export function EquipmentGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div key={idx} className="border-border border">
          <Skeleton className="aspect-[16/10] w-full rounded-none" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-3 w-24 rounded-none" />
            <Skeleton className="h-5 w-4/5 rounded-none" />
            <Skeleton className="h-4 w-full rounded-none" />
          </div>
        </div>
      ))}
    </div>
  );
}
