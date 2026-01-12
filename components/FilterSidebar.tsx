'use client'
import React from 'react'
import { CheckIcon, XIcon } from 'lucide-react'
import { categories } from '@/assets/assets'

interface FilterSidebarProps {
    selectedCategories: string[]
    selectedLocations: string[]
    minRating: number
    onCategoryChange: (category: string) => void
    onLocationChange: (location: string) => void
    onRatingChange: (rating: number) => void
    onClearFilters: () => void
}

const locations = ['Lusaka', 'Copperbelt', 'Southern', 'Eastern', 'Northern', 'Luapula', 'North-Western', 'Western', 'Central', 'Muchinga']

const FilterSidebar: React.FC<FilterSidebarProps> = ({
    selectedCategories,
    selectedLocations,
    minRating,
    onCategoryChange,
    onLocationChange,
    onRatingChange,
    onClearFilters,
}) => {
    const hasActiveFilters = selectedCategories.length > 0 || selectedLocations.length > 0 || minRating > 0

    return (
        <div className="w-full lg:w-64 bg-white rounded-lg p-6 h-fit sticky top-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Filters</h2>
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="text-xs text-green-600 hover:text-green-700 flex items-center gap-1"
                    >
                        <XIcon size={14} />
                        Clear
                    </button>
                )}
            </div>

            {/* Categories */}
            <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-700 mb-3">Category & Location</h3>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${selectedCategories.length === 0
                                ? 'bg-green-600 border-green-600'
                                : 'border-slate-300 group-hover:border-green-400'
                                }`}
                            onClick={() => {
                                if (selectedCategories.length > 0) {
                                    selectedCategories.forEach(cat => onCategoryChange(cat))
                                }
                            }}
                        >
                            {selectedCategories.length === 0 && <CheckIcon size={14} className="text-white" />}
                        </div>
                        <span className="text-sm text-slate-600">All Categories</span>
                    </label>

                    {categories.map((category) => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer group">
                            <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${selectedCategories.includes(category)
                                    ? 'bg-green-600 border-green-600'
                                    : 'border-slate-300 group-hover:border-green-400'
                                    }`}
                                onClick={() => onCategoryChange(category)}
                            >
                                {selectedCategories.includes(category) && (
                                    <CheckIcon size={14} className="text-white" />
                                )}
                            </div>
                            <span className="text-sm text-slate-600">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Location */}
            <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-700 mb-3">Location</h3>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${selectedLocations.length === 0
                                ? 'bg-green-600 border-green-600'
                                : 'border-slate-300 group-hover:border-green-400'
                                }`}
                            onClick={() => {
                                if (selectedLocations.length > 0) {
                                    selectedLocations.forEach(loc => onLocationChange(loc))
                                }
                            }}
                        >
                            {selectedLocations.length === 0 && <CheckIcon size={14} className="text-white" />}
                        </div>
                        <span className="text-sm text-slate-600">All Locations</span>
                    </label>

                    {locations.map((location) => (
                        <label key={location} className="flex items-center gap-2 cursor-pointer group">
                            <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${selectedLocations.includes(location)
                                    ? 'bg-green-600 border-green-600'
                                    : 'border-slate-300 group-hover:border-green-400'
                                    }`}
                                onClick={() => onLocationChange(location)}
                            >
                                {selectedLocations.includes(location) && (
                                    <CheckIcon size={14} className="text-white" />
                                )}
                            </div>
                            <span className="text-sm text-slate-600">{location}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-700 mb-3">Rating</h3>
                <div className="space-y-2">
                    {[5, 4, 3].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                            <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${minRating === rating
                                    ? 'bg-green-600 border-green-600'
                                    : 'border-slate-300 group-hover:border-green-400'
                                    }`}
                                onClick={() => onRatingChange(rating)}
                            >
                                {minRating === rating && <CheckIcon size={14} className="text-white" />}
                            </div>
                            <span className="text-sm text-slate-600 flex items-center gap-1">
                                {rating === 5 ? '5 star' : `${rating} star & up`}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FilterSidebar
