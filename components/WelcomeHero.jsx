'use client'
import React from 'react'
import Link from 'next/link'
import { ShoppingBag, ArrowRight } from 'lucide-react'

const WelcomeHero = ({ user }) => {
    const firstName = user?.user_metadata?.first_name || 'there'

    return (
        <div className="mx-6">
            <div className="flex flex-col sm:flex-row border border-indigo-100 rounded-3xl overflow-hidden mt-10 max-w-7xl mx-auto bg-gradient-to-r from-indigo-50 to-white shadow-sm">

                {/* Text Content */}
                <div className="flex flex-col justify-center gap-5 sm:w-1/2 p-10 lg:p-16">
                    <div>
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold mb-3">
                            Welcome Back
                        </span>
                        <h1 className="text-3xl lg:text-5xl font-bold text-slate-800 leading-tight">
                            Hello, <span className="text-indigo-600">{firstName}</span>!
                        </h1>
                        <p className="mt-4 text-slate-600 text-sm lg:text-base max-w-md">
                            We've missed you! Check out the latest gadgets tailored just for you or track your recent orders.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link href="/products" className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200">
                            <ShoppingBag className="w-4 h-4" />
                            Continue Shopping
                        </Link>
                        <Link href="/orders" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-700 font-medium border border-slate-200 hover:bg-slate-50 transition">
                            View Orders
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </div>

                {/* Decorative Image/Graphic Side */}
                <div className="sm:w-1/2 bg-indigo-50 relative flex items-center justify-center min-h-[300px]">
                    {/* Abstract Shapes */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 ml-20 -mt-20"></div>

                    <div className="relative z-10 text-center p-8">
                        <p className="text-indigo-900 font-medium text-lg">"The best way to predict the future is to create it."</p>
                        <p className="text-indigo-500 text-sm mt-2">- Lincoln</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeHero
