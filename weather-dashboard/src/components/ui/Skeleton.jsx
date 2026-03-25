// Skeleton shapes used across the dashboard during loading states

export function SkeletonCard({ className = '' }) {
  return <div className={`skeleton ${className}`} />
}

export function SkeletonText({ width = 'w-full', height = 'h-4' }) {
  return <div className={`skeleton ${width} ${height}`} />
}

export function StatCardSkeleton() {
  return (
    <div className="card p-5 space-y-3">
      <SkeletonText width="w-1/3" height="h-3" />
      <SkeletonText width="w-1/2" height="h-8" />
      <SkeletonText width="w-2/3" height="h-3" />
    </div>
  )
}

export function ChartSkeleton({ height = 'h-48' }) {
  return (
    <div className={`card p-5 ${height}`}>
      <div className="skeleton w-full h-full" />
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="card-highlight p-8 space-y-4">
      <SkeletonText width="w-40" height="h-4" />
      <SkeletonText width="w-64" height="h-14" />
      <SkeletonText width="w-48" height="h-5" />
      <div className="flex gap-4 pt-2">
        <SkeletonText width="w-24" height="h-8" />
        <SkeletonText width="w-24" height="h-8" />
      </div>
    </div>
  )
}
