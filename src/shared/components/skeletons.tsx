import { Skeleton } from "@/shared/components/ui/skeleton"

export function AmbientSkeleton() {
  return (
    <div className="w-full">
      <div className="w-full min-h-[40vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-900/10">
        <div className="text-center space-y-4 p-4">
          <Skeleton className="h-12 w-48 mx-auto" />
          <Skeleton className="h-6 w-32 mx-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 md:-mt-16 space-y-4 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>

        <Skeleton className="h-40 w-full" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>

        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  )
}
