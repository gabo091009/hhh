export function SkeletonLoader({ lines = 4 }: { lines?: number }) {
  return (
    <div className="space-y-6 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="skeleton w-10 h-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
