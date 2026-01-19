'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    ShoppingBag,
    ListOrdered,
    Palette,
    Settings,
    LogOut,
    ChevronRight,
    Store
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const NAV_ITEMS = [
    { name: 'Overview', href: '/seller/dashboard', icon: LayoutDashboard },
    { name: 'My Products', href: '/seller/dashboard/products', icon: ShoppingBag },
    { name: 'Orders', href: '/seller/dashboard/orders', icon: ListOrdered },
    { name: 'Customize Store', href: '/seller/dashboard/customize', icon: Palette },
    { name: 'Settings', href: '/seller/dashboard/settings', icon: Settings },
]

export default function DashboardSidebar() {
    const pathname = usePathname()
    const { signOut } = useAuth() as any

    return (
        <aside className="w-72 bg-white border-r border-slate-100 h-screen sticky top-0 flex flex-col">
            {/* Brand Header */}
            <div className="p-8 pb-4">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200 group-hover:scale-105 transition-transform">
                        <Store className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-800 tracking-tight">Seller Hub</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group
                ${isActive
                                    ? 'bg-green-600 text-white shadow-xl shadow-green-100 translate-x-1'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}
              `}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-green-600'}`} />
                                <span className="font-bold text-sm tracking-wide">{item.name}</span>
                            </div>
                            {isActive && <ChevronRight className="w-4 h-4 text-white/70" />}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer / User Profile Area */}
            <div className="p-4 mt-auto">
                <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 space-y-3">
                    <button
                        onClick={signOut}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-all"
                    >
                        <LogOut className="w-5 h-5" /> Sign Out
                    </button>
                </div>
            </div>
        </aside>
    )
}
