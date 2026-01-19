export default function OrdersLoading() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-pulse">
            <div className="flex justify-between items-center">
                <div className="space-y-3">
                    <div className="h-10 w-36 bg-slate-200 rounded-xl" />
                    <div className="h-5 w-64 bg-slate-100 rounded-lg" />
                </div>
                <div className="h-10 w-32 bg-slate-100 rounded-2xl" />
            </div>

            <div className="flex gap-4">
                <div className="flex gap-2 p-1.5 bg-white rounded-2xl border border-slate-100">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-10 w-24 bg-slate-100 rounded-xl" />
                    ))}
                </div>
                <div className="flex-1" />
                <div className="w-64 h-12 bg-slate-100 rounded-2xl" />
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8">
                <div className="space-y-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex items-center gap-8">
                            <div className="h-4 w-24 bg-slate-100 rounded" />
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-slate-100 rounded-full" />
                                <div className="h-4 w-28 bg-slate-100 rounded" />
                            </div>
                            <div className="h-4 w-24 bg-slate-100 rounded" />
                            <div className="h-4 w-16 bg-slate-100 rounded" />
                            <div className="h-6 w-20 bg-orange-100 rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
