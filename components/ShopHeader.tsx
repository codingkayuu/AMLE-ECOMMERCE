'use client'
import React from 'react'
import { StarIcon, MapPinIcon, CalendarIcon, CheckCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { Shop } from '@/types/shop'

interface ShopHeaderProps {
    shop: Shop
}

const ShopHeader: React.FC<ShopHeaderProps> = ({ shop }) => {
    const rating = shop.rating || 4.8
    const followers = '12.5k'
    const itemsSold = '25k+'

    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-start gap-6">
                {/* Shop Logo */}
                <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                    {shop.logo && (
                        <Image
                            src={shop.logo}
                            alt={shop.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* Shop Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-2xl font-bold text-slate-800">{shop.name}</h1>
                        {shop.status === 'approved' && (
                            <CheckCircleIcon className="w-6 h-6 text-green-600" fill="currentColor" />
                        )}
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                        <MapPinIcon className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-600">{shop.username}</span>
                        <span className="text-slate-400 mx-2">•</span>
                        <CalendarIcon className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-600">
                            Joined {new Date(shop.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-slate-800">{followers}</span>
                            <span className="text-xs text-slate-500">Followers</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-slate-800">{itemsSold}</span>
                            <span className="text-xs text-slate-500">Items Sold</span>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                <span className="text-lg font-bold text-slate-800">{rating.toFixed(1)}</span>
                                <StarIcon className="w-4 h-4 text-yellow-500" fill="currentColor" />
                            </div>
                            <span className="text-xs text-slate-500">Rating</span>
                        </div>
                    </div>
                </div>

                {/* Follow Button */}
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
                    + Follow
                </button>
            </div>
        </div>
    )
}

export default ShopHeader
