'use client'
import React from 'react'
import { MessageCircleIcon, MapPinIcon, ClockIcon, GlobeIcon } from 'lucide-react'

interface Category {
    name: string
    count: number
    isActive?: boolean
    isSale?: boolean
}

interface ShopSidebarProps {
    categories: Category[]
    onCategoryClick: (category: string) => void
    selectedCategory: string
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({ categories, onCategoryClick, selectedCategory }) => {
    return (
        <div className="w-full lg:w-64 space-y-6">
            {/* Message Seller Button */}
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-95">
                <MessageCircleIcon className="w-5 h-5" />
                Message Seller
            </button>

            {/* Categories */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Categories
                </h3>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => onCategoryClick(category.name)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200 ${selectedCategory === category.name
                                ? 'bg-green-50 text-green-700 font-medium'
                                : category.isSale
                                    ? 'text-red-600 hover:bg-red-50'
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <span>{category.name}</span>
                            <span className={`text-xs ${selectedCategory === category.name ? 'text-green-600' : 'text-slate-400'}`}>
                                {category.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Shop Info */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Shop Info
                </h3>
                <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                        <MapPinIcon className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-slate-600">Lusaka, Zambia</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                        <ClockIcon className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-slate-600">Responds within 24 hours</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                        <GlobeIcon className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-slate-600">Ships Worldwide</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopSidebar
