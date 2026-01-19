'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { User, Mail, Shield, Save, LogOut, ShoppingBag } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function ProfilePage() {
    const { user, signOut, loading } = useAuth()
    const router = useRouter()
    const [name, setName] = useState('')
    const [updating, setUpdating] = useState(false)

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
        if (user) {
            setName(user.user_metadata?.first_name || user.user_metadata?.full_name || '')
        }
    }, [user, loading, router])

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        setUpdating(true)
        try {
            const { error } = await supabase.auth.updateUser({
                data: { first_name: name, full_name: name }
            })

            if (error) throw error
            toast.success('Profile updated successfully')
        } catch (error) {
            toast.error(error.message || 'Error updating profile')
        } finally {
            setUpdating(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        )
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>
                    <p className="mt-2 text-slate-600">Manage your account settings and preferences.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-indigo-50 p-8 border-b border-indigo-100 flex items-center gap-6">
                        <div className="h-24 w-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-3xl font-bold border-4 border-white shadow-sm">
                             {name ? name[0].toUpperCase() : (user.email ? user.email[0].toUpperCase() : 'U')}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">{name || 'User'}</h2>
                            <p className="text-slate-500 flex items-center gap-2 mt-1">
                                <Mail className="w-4 h-4" /> {user.email}
                            </p>
                             <div className="mt-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                                <Shield className="w-3 h-3 mr-1" />
                                {user.user_metadata?.role || 'Buyer'} Account
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-lg">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="fullName"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition sm:text-sm"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="flex items-center justify-center px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {updating ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                    ) : (
                                        <Save className="w-4 h-4 mr-2" />
                                    )}
                                    {updating ? 'Saving...' : 'Save Changes'}
                                </button>
                                
                                <button
                                    type="button"
                                    onClick={() => signOut()}
                                    className="flex items-center justify-center px-6 py-2.5 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <Link href="/orders" className="block p-6 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all group">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition">
                                <ShoppingBag className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800">My Orders</h3>
                                <p className="text-sm text-slate-500">Track and view your order history</p>
                            </div>
                        </div>
                    </Link>
                    {/* Add more quick links as needed */}
                </div>
            </div>
        </div>
    )
}
