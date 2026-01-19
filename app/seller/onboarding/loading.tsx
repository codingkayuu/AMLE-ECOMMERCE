export default function OnboardingLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-slate-50 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl animate-pulse space-y-8">
                <div className="flex justify-center gap-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 bg-slate-200 rounded-xl" />
                            <div className="w-12 h-2 bg-slate-100 rounded" />
                        </div>
                    ))}
                </div>
                <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-50 space-y-8">
                    <div className="space-y-3">
                        <div className="h-8 w-56 bg-slate-200 rounded-lg" />
                        <div className="h-5 w-72 bg-slate-100 rounded" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="h-14 bg-slate-100 rounded-2xl" />
                        <div className="h-14 bg-slate-100 rounded-2xl" />
                    </div>
                    <div className="h-32 bg-slate-50 rounded-2xl" />
                    <div className="flex justify-end">
                        <div className="h-14 w-40 bg-green-200 rounded-3xl" />
                    </div>
                </div>
            </div>
        </div>
    )
}
