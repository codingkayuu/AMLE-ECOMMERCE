'use client'

import React, { useEffect, useState } from 'react'
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Edit3,
    Trash2,
    Package,
    ArrowUpDown,
    ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import { format } from 'date-fns'

export default function SellerProductsPage() {
    const { user } = useAuth() as any
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        async function fetchProducts() {
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
                    const { data, error } = await supabase
                        .from('products')
                        .select('*')
                        .eq('store_id', store.id)
                        .order('created_at', { ascending: false })

                    if (error) throw error
                    setProducts(data || [])
                }
            } catch (err) {
                console.error('Error fetching products:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [user])

    const filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">My Products</h1>
                    <p className="text-slate-500 font-medium">Manage and monitor your store inventory.</p>
                </div>
                <Link
                    href="/seller/dashboard/products/new"
                    className="flex items-center gap-2 px-6 py-4 bg-green-600 text-white font-black rounded-3xl shadow-xl shadow-green-200 hover:bg-green-700 hover:scale-[1.03] transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" /> Add New Product
                </Link>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-green-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search products by name or category..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 bg-white shadow-sm focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-2xl text-slate-600 font-bold hover:bg-slate-50 transition-all shadow-sm">
                    <Filter className="w-5 h-5" /> Filters
                </button>
            </div>

            {/* Product List */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4 text-slate-400">
                        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
                        <p className="font-bold">Syncing your catalogue...</p>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-xs font-black uppercase tracking-widest">
                                    <th className="px-8 py-5">Product</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5">Price</th>
                                    <th className="px-8 py-5">Stock</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden relative border border-slate-200 shadow-sm">
                                                    {product.images?.[0] ? (
                                                        <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-300"><Package className="w-6 h-6" /></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 text-sm">{product.title}</p>
                                                    <p className="text-xs text-slate-400 font-medium">{product.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`
                        px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest
                        ${product.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}
                      `}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="font-black text-slate-800 text-sm">${product.price.toFixed(2)}</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className={`font-bold text-sm ${product.stock < 5 ? 'text-red-500' : 'text-slate-600'}`}>
                                                {product.stock} in stock
                                            </p>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2.5 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-blue-600">
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                                <button className="p-2.5 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-green-600">
                                                    <Edit3 className="w-5 h-5" />
                                                </button>
                                                <button className="p-2.5 hover:bg-white hover:shadow-md rounded-xl transition-all text-slate-400 hover:text-red-600">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-20 flex flex-col items-center justify-center text-center space-y-6">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center animate-bounce">
                            <Package className="w-10 h-10 text-slate-200" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-slate-800">Your catalogue is empty</h3>
                            <p className="text-slate-500 max-w-sm mx-auto font-medium">Time to show the world what you've got! Start by listing your first amazing product.</p>
                        </div>
                        <Link
                            href="/seller/dashboard/products/new"
                            className="flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-black rounded-2xl shadow-xl shadow-green-100 hover:bg-green-700 transition-all"
                        >
                            List My First Product
                        </Link>
                    </div>
                )}
            </div>

        </div>
    )
}
