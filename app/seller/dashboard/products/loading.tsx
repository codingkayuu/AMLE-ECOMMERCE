export default function ProductsLoading() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-pulse">
            <div className="flex justify-between items-center">
                <div className="space-y-3">
                    <div className="h-10 w-48 bg-slate-200 rounded-xl" />
                    <div className="h-5 w-72 bg-slate-100 rounded-lg" />
                </div>
                <div className="h-14 w-40 bg-green-200 rounded-3xl" />
            </div>

            <div className="flex gap-4">
                <div className="flex-1 h-14 bg-slate-100 rounded-2xl" />
                <div className="w-14 h-14 bg-slate-100 rounded-2xl" />
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8">
                <div className="space-y-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-40 bg-slate-100 rounded" />
                                <div className="h-3 w-24 bg-slate-50 rounded" />
                            </div>
                            <div className="h-6 w-20 bg-slate-100 rounded-full" />
                            <div className="h-4 w-16 bg-slate-100 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
