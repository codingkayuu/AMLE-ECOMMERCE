'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon, ArrowRightIcon, ArrowLeftIcon, ShoppingBagIcon, StoreIcon } from 'lucide-react'

export default function SignupPage() {
    const router = useRouter()
    const [accountType, setAccountType] = useState<'buyer' | 'seller' | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle signup logic here
        console.log('Signup:', { ...formData, accountType })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                {/* Back Button and Logo */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-slate-100 rounded-lg transition"
                    >
                        <ArrowLeftIcon className="h-5 w-5 text-slate-600" />
                    </button>
                    <Link href="/" className="inline-flex items-center">
                        <span className="text-3xl font-bold text-slate-700">
                            <span className="text-green-600">AM</span>LE
                            <span className="text-green-600 text-4xl">.</span>
                        </span>
                        <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded-full">
                            hm
                        </span>
                    </Link>
                    <div className="w-9"></div> {/* Spacer for alignment */}
                </div>

                {/* Header */}
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Join AMLE</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Create an account to start shopping or selling gadgets.
                    </p>
                </div>

                {/* Account Type Selection */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => setAccountType('buyer')}
                        className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${accountType === 'buyer'
                                ? 'border-green-500 bg-green-50 scale-105 shadow-lg'
                                : 'border-slate-200 bg-white hover:border-green-300 hover:scale-105'
                            }`}
                    >
                        <div className="flex flex-col items-center space-y-3">
                            <div className={`p-3 rounded-full ${accountType === 'buyer' ? 'bg-green-100' : 'bg-slate-100'}`}>
                                <ShoppingBagIcon className={`h-6 w-6 ${accountType === 'buyer' ? 'text-green-600' : 'text-slate-600'}`} />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-slate-800">Buyer</p>
                                <p className="text-xs text-slate-500 mt-1">I want to buy products</p>
                            </div>
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() => setAccountType('seller')}
                        className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${accountType === 'seller'
                                ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg'
                                : 'border-slate-200 bg-white hover:border-blue-300 hover:scale-105'
                            }`}
                    >
                        <div className="flex flex-col items-center space-y-3">
                            <div className={`p-3 rounded-full ${accountType === 'seller' ? 'bg-blue-100' : 'bg-slate-100'}`}>
                                <StoreIcon className={`h-6 w-6 ${accountType === 'seller' ? 'text-blue-600' : 'text-slate-600'}`} />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-slate-800">Seller</p>
                                <p className="text-xs text-slate-500 mt-1">I want to sell products</p>
                            </div>
                        </div>
                    </button>
                </div>

                {/* Form */}
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    {/* Full Name Input */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <UserIcon className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="block w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="Enter your full name"
                            />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MailIcon className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="block w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="example@email.com"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <LockIcon className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="block w-full pl-12 pr-12 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-5 w-5 text-slate-400 hover:text-slate-600 transition" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-slate-400 hover:text-slate-600 transition" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Create Account Button */}
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:scale-105 hover:shadow-lg mt-6"
                    >
                        Create Account
                        <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>

                    {/* Terms */}
                    <p className="text-xs text-center text-slate-500 mt-4">
                        By signing up, you agree to our{' '}
                        <Link href="/terms" className="text-blue-600 hover:text-blue-500 transition">
                            Terms of Service
                        </Link>
                    </p>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-slate-500 font-medium">OR CONTINUE WITH</span>
                        </div>
                    </div>

                    {/* Social Signup */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            className="flex items-center justify-center px-4 py-3 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 hover:scale-105 transition-all duration-300"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Google
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center px-4 py-3 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 hover:scale-105 transition-all duration-300"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                            Apple
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
