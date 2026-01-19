export default function ProfileLoading() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12 animate-pulse">
            <div className="bg-white rounded-[3rem] p-12 border border-slate-100 space-y-10">
                <div className="flex items-center gap-8">
                    <div className="w-24 h-24 bg-slate-100 rounded-full" />
                    <div className="space-y-3">
                        <div className="h-8 w-48 bg-slate-200 rounded-xl" />
                        <div className="h-4 w-32 bg-slate-100 rounded" />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="h-14 bg-slate-50 rounded-2xl" />
                    <div className="h-14 bg-slate-50 rounded-2xl" />
                </div>

                <div className="flex justify-end">
                    <div className="h-14 w-40 bg-green-200 rounded-2xl" />
                </div>
            </div>
        </div>
    )
}
