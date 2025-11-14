export default function Loading() {
  return (
    <section className="container">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>{' '}
        {/* h1 skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map(
            (
              _,
              i, // 3 skeletons
            ) => (
              <div key={i} className="bg-white border rounded-lg p-4">
                <div className="h-5 bg-gray-200 rounded mb-2 w-32"></div>{' '}
                {/* title */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
