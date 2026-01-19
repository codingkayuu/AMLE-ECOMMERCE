import React from 'react'

export default function DashboardLoading() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-10">
            <div className="space-y-4">
                <div className="h-10 w-48 bg-slate-200 animate-pulse rounded-xl" />
                <div className="h-6 w-72 bg-slate-100 animate-pulse rounded-lg" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 space-y-4">
                        <div className="w-14 h-14 bg-slate-100 rounded-2xl animate-pulse" />
                        <div className="h-4 w-20 bg-slate-100 animate-pulse rounded" />
                        <div className="h-8 w-16 bg-slate-100 animate-pulse rounded-lg" />
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-100 h-[400px]">
                    <div className="h-8 w-40 bg-slate-100 animate-pulse rounded-lg mb-8" />
                    <div className="w-full h-full bg-slate-50/50 rounded-2xl animate-pulse" />
                </div>
                <div className="bg-slate-100 rounded-[3rem] h-[400px] animate-pulse" />
            </div>
        </div>
    )
}
