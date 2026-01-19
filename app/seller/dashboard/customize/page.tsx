'use client'

import React from 'react'
import { Settings, Palette, Eye, Layout, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function StoreCustomizePage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Top Bar */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <Link href="/seller/dashboard" className="p-2 hover:bg-slate-100 rounded-lg transition">
                        <ArrowLeft className="w-5 h-5 text-slate-500" />
                    </Link>
                    <h1 className="text-xl font-bold text-slate-800">Customize Store</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition">
                        <Eye className="w-5 h-5" /> Preview
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-200 hover:bg-green-700 transition">
                        <Save className="w-5 h-5" /> Save Changes
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-8 grid lg:grid-cols-3 gap-8">

                {/* Sidebar Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Palette className="w-4 h-4" /> Visual Style
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-3">Primary Brand Color</label>
                                <div className="flex gap-3">
                                    {['#16a34a', '#2563eb', '#7c3aed', '#db2777', '#ea580c'].map(color => (
                                        <button
                                            key={color}
                                            className={`w-10 h-10 rounded-full border-2 border-white shadow-sm ring-2 ring-transparent hover:ring-slate-200 transition-all`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-3">Navigation Style</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="p-3 border-2 border-green-500 bg-green-50 rounded-2xl text-xs font-bold text-green-700 text-center">Minimalist</button>
                                    <button className="p-3 border-2 border-slate-100 bg-slate-50 rounded-2xl text-xs font-bold text-slate-400 text-center">Bold Centered</button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Layout className="w-4 h-4" /> Layout Sections
                        </h3>
                        <div className="space-y-3">
                            {['Hero Banner', 'Featured Products', 'About Us Section', 'Customer Reviews', 'Store Policies'].map(section => (
                                <div key={section} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group cursor-move">
                                    <span className="text-sm font-semibold text-slate-700">{section}</span>
                                    <Settings className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition" />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Live Preview Area */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 min-h-[800px] flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                            <Palette className="w-10 h-10 text-slate-300" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800">Preview Mode</h2>
                        <p className="text-slate-500 mt-2 max-w-xs">This is where your store's live preview will appear as you change settings.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
