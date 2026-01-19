'use client'

import React, { useEffect, useState } from 'react'
import {
    Search,
    Filter,
    Eye,
    Package,
    Truck,
    CheckCircle2,
    Clock,
    ArrowUpRight,
    User,
    Calendar
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { format } from 'date-fns'

export default function SellerOrdersPage() {
    const { user } = useAuth() as any
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('all')

    useEffect(() => {
        async function fetchOrders() {
            if (!user) return
            setLoading(true)
            try {
                // First get store id
                const { data: store } = await supabase
                    .from('stores')
                    .select('id')
                    .eq('owner_id', user.id)
                    .single()

                if (store) {
                    // Note: This assumes an 'orders' table exists or is linked to products
                    // For now, we'll fetch from a generic orders table that has store_id
                    // In a real scenario, orders might be linked via order_items
                    const { data, error } = await supabase
                        .from('orders')
                        .select('*, order_items!inner(product:products!inner(store_id))')
                        .eq('order_items.product.store_id', store.id)
                        .order('created_at', { ascending: false })

                    if (error) {
                        // If orders table doesn't exist yet, we show empty
                        console.warn("Orders table might be missing or schema differs", error)
                        setOrders([])
                    } else {
                        setOrders(data || [])
                    }
                }
            } catch (err) {
                console.error('Error fetching orders:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [user])

    const TABS = [
        { id: 'all', label: 'All Orders' },
        { id: 'pending', label: 'Pending' },
        { id: 'shipped', label: 'Shipped' },
        { id: 'delivered', label: 'Delivered' },
    ]

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">Orders</h1>
                    <p className="text-slate-500 font-medium">Track and manage your customer sales.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Live Updates</span>
                    </div>
                </div>
            </div>

            {/* Tabs & Filters */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                        px-6 py-2.5 rounded-xl text-sm font-black transition-all whitespace-nowrap
                        ${activeTab === tab.id
                                    ? 'bg-green-600 text-white shadow-lg shadow-green-100'
                                    : 'text-slate-400 hover:text-slate-600'}
                    `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-green-600" />
                        <input
                            type="text"
                            placeholder="Search Order ID..."
                            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-100 bg-white focus:border-green-500 transition-all outline-none text-sm font-medium"
                        />
                    </div>
                    <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-500 hover:text-slate-800 shadow-sm">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4 text-slate-400">
                        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
                        <p className="font-bold">Loading your sales...</p>
                    </div>
                ) : orders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                    <th className="px-8 py-6">Order ID</th>
                                    <th className="px-8 py-6">Customer</th>
                                    <th className="px-8 py-6">Date</th>
                                    <th className="px-8 py-6">Amount</th>
                                    <th className="px-8 py-6">Status</th>
                                    <th className="px-8 py-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {orders.map(order => (
                                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <span className="font-black text-slate-800 text-sm">#ORD-{order.id.slice(0, 6).toUpperCase()}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <span className="font-bold text-slate-600 text-sm">Customer Name</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <Calendar className="w-4 h-4" />
                                                <span className="text-sm font-medium">{format(new Date(order.created_at), 'MMM dd, yyyy')}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="font-black text-slate-800 text-sm">${order.total_amount.toFixed(2)}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 w-fit">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{order.status || 'Pending'}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2.5 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-green-600">
                                                <Eye className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-32 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center shadow-inner">
                            <Package className="w-10 h-10 text-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-slate-800">No orders yet</h3>
                            <p className="text-slate-500 max-w-sm mx-auto font-medium">Your first sale is just around the corner. Make sure your products look their best!</p>
                        </div>
                        <Link
                            href="/seller/dashboard/products"
                            className="flex items-center gap-2 px-8 py-4 bg-slate-800 text-white font-black rounded-2xl shadow-xl shadow-slate-200 hover:bg-slate-900 transition-all active:scale-95"
                        >
                            Manage Inventory <ArrowUpRight className="w-5 h-5" />
                        </Link>
                    </div>
                )}
            </div>

        </div>
    )
}
