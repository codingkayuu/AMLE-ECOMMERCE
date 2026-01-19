export default function SettingsLoading() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-10 animate-pulse">
            <div className="space-y-3">
                <div className="h-10 w-36 bg-slate-200 rounded-xl" />
                <div className="h-5 w-72 bg-slate-100 rounded-lg" />
            </div>

            <div className="grid lg:grid-cols-4 gap-10">
                <div className="lg:col-span-1 space-y-2">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-14 bg-slate-100 rounded-2xl" />
                    ))}
                </div>

                <div className="lg:col-span-3">
                    <div className="bg-white rounded-[3rem] p-14 border border-slate-100">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="h-3 w-24 bg-slate-100 rounded" />
                                <div className="space-y-4">
                                    <div className="h-14 bg-slate-100 rounded-2xl" />
                                    <div className="h-14 bg-slate-100 rounded-2xl" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-3 w-24 bg-slate-100 rounded" />
                                <div className="w-32 h-32 bg-slate-100 rounded-[2.5rem]" />
                            </div>
                        </div>
                        <div className="mt-12 h-32 bg-slate-50 rounded-[2rem]" />
                    </div>
                </div>
            </div>
        </div>
    )
}
