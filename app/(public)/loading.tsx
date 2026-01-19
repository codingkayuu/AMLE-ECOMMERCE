export default function HomeLoading() {
    return (
        <div className="min-h-screen animate-pulse">
            {/* Hero Skeleton */}
            <div className="h-[70vh] bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                <div className="text-center space-y-6">
                    <div className="h-16 w-96 bg-slate-200 rounded-2xl mx-auto" />
                    <div className="h-6 w-72 bg-slate-100 rounded-lg mx-auto" />
                    <div className="h-14 w-48 bg-green-200 rounded-full mx-auto" />
                </div>
            </div>

            {/* Products Grid Skeleton */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="h-10 w-48 bg-slate-200 rounded-xl mb-8" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-white rounded-3xl p-4 border border-slate-100 space-y-4">
                            <div className="aspect-square bg-slate-100 rounded-2xl" />
                            <div className="h-4 w-3/4 bg-slate-100 rounded" />
                            <div className="h-6 w-1/2 bg-slate-200 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
