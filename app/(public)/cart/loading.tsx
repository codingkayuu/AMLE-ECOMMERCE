export default function CartLoading() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-12 animate-pulse">
            <div className="h-10 w-32 bg-slate-200 rounded-xl mb-8" />

            <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 flex gap-6">
                            <div className="w-24 h-24 bg-slate-100 rounded-2xl" />
                            <div className="flex-1 space-y-3">
                                <div className="h-5 w-48 bg-slate-100 rounded" />
                                <div className="h-4 w-24 bg-slate-50 rounded" />
                                <div className="h-6 w-20 bg-slate-200 rounded" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100 h-fit space-y-6">
                    <div className="h-6 w-32 bg-slate-100 rounded" />
                    <div className="space-y-3">
                        <div className="h-4 w-full bg-slate-50 rounded" />
                        <div className="h-4 w-full bg-slate-50 rounded" />
                        <div className="h-6 w-full bg-slate-200 rounded" />
                    </div>
                    <div className="h-14 w-full bg-green-200 rounded-2xl" />
                </div>
            </div>
        </div>
    )
}
