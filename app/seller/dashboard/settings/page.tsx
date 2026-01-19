'use client'

import React, { useEffect, useState } from 'react'
import {
    Store,
    User,
    MapPin,
    Bell,
    ShieldCheck,
    CreditCard,
    Save,
    Globe,
    Camera,
    Mail,
    Phone
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'react-hot-toast'
import ImageUpload from '@/components/ui/ImageUpload'

export default function SellerSettingsPage() {
    const { user } = useAuth() as any
    const [store, setStore] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [activeTab, setActiveTab] = useState('profile')

    useEffect(() => {
        async function fetchStore() {
            if (!user) return
            const { data } = await supabase
                .from('stores')
                .select('*')
                .eq('owner_id', user.id)
                .single()
            setStore(data)
            setLoading(false)
        }
        fetchStore()
    }, [user])

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            const { error } = await supabase
                .from('stores')
                .update({
                    name: store.name,
                    description: store.description,
                    category: store.category,
                    logo_url: store.logo_url,
                    banner_url: store.banner_url
                })
                .eq('id', store.id)

            if (error) throw error
            toast.success("Settings updated successfully!")
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setSaving(false)
        }
    }

    const TABS = [
        { id: 'profile', label: 'Store Profile', icon: Store },
        { id: 'business', label: 'Business Info', icon: ShieldCheck },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'payouts', label: 'Payouts', icon: CreditCard },
    ]

    if (loading) return (
        <div className="p-20 flex flex-col items-center justify-center gap-4 text-slate-400">
            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
            <p className="font-bold">Accessing secure settings...</p>
        </div>
    )

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500">

            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-slate-800 tracking-tight">Settings</h1>
                <p className="text-slate-500 font-medium">Control your store's appearance and business logic.</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-10">

                {/* Navigation Sidebar */}
                <div className="lg:col-span-1 space-y-2">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                        w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm transition-all
                        ${activeTab === tab.id
                                    ? 'bg-green-600 text-white shadow-xl shadow-green-100'
                                    : 'text-slate-400 hover:bg-white hover:text-slate-700'}
                    `}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-[3rem] p-10 md:p-14 border border-slate-100 shadow-sm">

                        {activeTab === 'profile' && (
                            <form onSubmit={handleUpdate} className="space-y-12">
                                <div className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-12">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Store Identity</label>
                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 mb-2">Display Name</label>
                                                    <input
                                                        value={store?.name}
                                                        onChange={(e) => setStore({ ...store, name: e.target.value })}
                                                        className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-green-500 transition-all outline-none font-bold"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-500 mb-2">Store Handle</label>
                                                    <div className="relative">
                                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">@</span>
                                                        <input
                                                            disabled
                                                            value={store?.username}
                                                            className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-100 bg-slate-100/50 text-slate-400 cursor-not-allowed font-bold"
                                                        />
                                                    </div>
                                                    <p className="text-[10px] text-slate-400 mt-2 ml-1 italic">Handle cannot be changed after launch.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Store Assets</label>
                                            <div className="relative group w-32 h-32">
                                                <div className="w-full h-full rounded-[2.5rem] bg-slate-100 border-4 border-white shadow-xl overflow-hidden relative">
                                                    {store?.logo_url ? (
                                                        <img src={store.logo_url} className="w-full h-full object-cover" alt="" />
                                                    ) : <Store className="w-10 h-10 m-auto mt-10 text-slate-300" />}
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                                        <Camera className="text-white w-8 h-8" />
                                                    </div>
                                                </div>
                                                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-xl shadow-lg">
                                                    <Camera className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-3">Store Story / Bio</label>
                                        <textarea
                                            rows={5}
                                            value={store?.description}
                                            onChange={(e) => setStore({ ...store, description: e.target.value })}
                                            className="w-full px-6 py-4 rounded-[2rem] border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-green-500 transition-all outline-none resize-none font-medium leading-relaxed"
                                        />
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                                    <p className="text-xs text-slate-400 font-medium max-w-xs">
                                        Your profile changes will be reflected globally across all buyer pages instantly.
                                    </p>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex items-center gap-2 px-10 py-4 bg-green-600 text-white font-black rounded-2xl shadow-xl shadow-green-100 hover:bg-green-700 transition-all active:scale-95 disabled:opacity-70"
                                    >
                                        {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
                                        Update Profile
                                    </button>
                                </div>
                            </form>
                        )}

                        {activeTab !== 'profile' && (
                            <div className="py-20 text-center space-y-4">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                                    <ShieldCheck className="w-10 h-10 text-slate-200" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter italic">Coming Soon</h3>
                                <p className="text-slate-500 max-w-xs mx-auto font-medium">We're building advanced business tools and secure payout integrations just for you.</p>
                            </div>
                        )}

                    </div>
                </div>

            </div>

        </div>
    )
}
