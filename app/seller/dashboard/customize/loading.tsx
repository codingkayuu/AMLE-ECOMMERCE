export default function CustomizeLoading() {
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-10 animate-pulse">
            <div className="space-y-3">
                <div className="h-10 w-56 bg-slate-200 rounded-xl" />
                <div className="h-5 w-80 bg-slate-100 rounded-lg" />
            </div>

            <div className="bg-white rounded-[3rem] p-12 border border-slate-100 space-y-8">
                <div className="h-48 bg-slate-100 rounded-[2rem]" />
                <div className="grid md:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-32 bg-slate-50 rounded-2xl" />
                    ))}
                </div>
            </div>
        </div>
    )
}
