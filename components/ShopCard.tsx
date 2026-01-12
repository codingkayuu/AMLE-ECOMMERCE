'use client'
import React from 'react'
import { StarIcon, MapPinIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Shop } from '@/types/shop'

interface ShopCardProps {
    shop: Shop
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
    // Calculate rating display (default to 4.5 if not provided)
    const rating = shop.rating || 4.5
    const fullStars = Math.floor(rating)

    // Get first letter of shop name for logo badge
    const shopInitial = shop.name.charAt(0).toUpperCase()

    // Determine category for display
    const category = shop.category || 'General Store'

    // Determine location for display
    const location = shop.location || shop.address?.split(',')[0] || 'Lusaka'

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
            {/* Shop Banner Image */}
            <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                {shop.logo && (
                    <Image
                        src={shop.logo}
                        alt={shop.name}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                )}

                {/* Featured Badge */}
                {shop.isFeatured && (
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-medium text-slate-700 shadow-md">
                        Featured
                    </div>
                )}

                {/* Shop Logo Badge */}
                <div className="absolute bottom-4 left-4 w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {shopInitial}
                </div>
            </div>

            {/* Shop Info */}
            <div className="p-5">
                {/* Shop Name and Category */}
                <div className="mb-2">
                    <h3 className="text-lg font-semibold text-slate-800 mb-1 group-hover:text-green-600 transition">
                        {shop.name}
                    </h3>
                    <p className="text-xs text-slate-500">{category}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                        {Array(5)
                            .fill('')
                            .map((_, index) => (
                                <StarIcon
                                    key={index}
                                    size={14}
                                    className="text-transparent"
                                    fill={index < fullStars ? '#FFA500' : '#D1D5DB'}
                                />
                            ))}
                    </div>
                    <span className="text-xs font-medium text-slate-600">{rating.toFixed(1)}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {shop.description}
                </p>

                {/* Location and Visit Button */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPinIcon size={14} />
                        <span>{location}</span>
                    </div>

                    <Link
                        href={`/shop/${shop.username}`}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 block"
                    >
                        Visit Shop
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ShopCard
