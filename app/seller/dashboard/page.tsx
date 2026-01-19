'use client'

import React, { useEffect, useState } from 'react'
import {
    TrendingUp,
    Package,
    DollarSign,
    Eye,
    Plus,
    ArrowUpRight
} from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'

export default function SellerDashboardPage() {
    const { user } = useAuth() as any
    const [stats, setStats] = useState({
        products: 0,
        sales: 0,
        earnings: 0,
        views: 0
    })

    useEffect(() => {
        async function fetchStats() {
            if (!user) return
            // Placeholder stats fetching
            // we'll implement real counts later as we add products
        }
        fetchStats()
    }, [user])

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">Dashboard</h1>
                    <p className="text-slate-500 font-medium">Welcome back! Here's what's happening today.</p>
                </div>
                <Link
                    href="/seller/dashboard/products/new"
                    className="flex items-center gap-2 px-6 py-4 bg-green-600 text-white font-black rounded-3xl shadow-xl shadow-green-200 hover:bg-green-700 hover:scale-[1.03] transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" /> List New Product
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Sales', value: '$0.00', icon: DollarSign, color: 'text-green-600 bg-green-50' },
                    { label: 'Total Products', value: '0', icon: Package, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Store Views', value: '0', icon: Eye, color: 'text-indigo-600 bg-indigo-50' },
                    { label: 'Growth', value: '+0%', icon: TrendingUp, color: 'text-orange-600 bg-orange-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300">
                        <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center mb-6`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">{stat.label}</p>
                        <p className="text-3xl font-black text-slate-800 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 gap-8">
                {/* Recent Activity */}
                <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-slate-800">Recent Activity</h2>
                        <button className="text-green-600 font-bold text-sm hover:underline flex items-center gap-1">
                            View All <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 text-slate-400">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                            <Package className="w-10 h-10 opacity-20" />
                        </div>
                        <p className="font-bold text-lg text-slate-600">No recent activity yet</p>
                        <p className="text-sm max-w-xs mx-auto">Start by listing your first product to see orders and sales activity here.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
