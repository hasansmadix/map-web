import { Skeleton } from '@/components/ui/skeleton'

export function BlogSectionSkeleton() {
  return (
    <div>
      <Skeleton className="mb-12 h-12 w-full rounded-none" />
      <Skeleton className="mb-6 aspect-[16/8] w-full rounded-none" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="border-border border">
            <Skeleton className="aspect-[3/2] w-full rounded-none" />
            <div className="space-y-3 p-6">
              <Skeleton className="h-3 w-20 rounded-none" />
              <Skeleton className="h-5 w-4/5 rounded-none" />
              <Skeleton className="h-4 w-full rounded-none" />
              <Skeleton className="h-3 w-24 rounded-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
