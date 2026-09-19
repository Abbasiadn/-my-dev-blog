// components/BlogSkeleton.tsx
export default function BlogSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-border rounded w-1/4 mb-8" />
      <div className="grid gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-border rounded-lg p-6">
            <div className="h-6 bg-border rounded w-3/4 mb-4" />
            <div className="h-4 bg-border rounded w-full mb-2" />
            <div className="h-4 bg-border rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
