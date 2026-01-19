export default function ProductsPageLoading() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse">
            <div className="h-10 w-44 bg-slate-200 rounded-xl mb-8" />

            <div className="flex gap-8">
                {/* Filters Sidebar */}
                <div className="hidden lg:block w-64 space-y-6">
                    <div className="h-6 w-24 bg-slate-100 rounded" />
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-10 bg-slate-50 rounded-xl" />
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {[...Array(9)].map((_, i) => (
                            <div key={i} className="bg-white rounded-3xl p-4 border border-slate-100 space-y-4">
                                <div className="aspect-square bg-slate-100 rounded-2xl" />
                                <div className="h-4 w-3/4 bg-slate-100 rounded" />
                                <div className="h-6 w-1/2 bg-slate-200 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
