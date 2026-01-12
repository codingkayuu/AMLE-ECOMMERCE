'use client'
import { Suspense, useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ShopCard from '@/components/ShopCard'
import FilterSidebar from '@/components/FilterSidebar'
import { SlidersHorizontalIcon } from 'lucide-react'
import { Shop } from '@/types/shop'
import { storesDummyData } from '@/assets/assets'

// Add category and location to shops for filtering
const shopsWithMetadata: Shop[] = storesDummyData.map((shop, index) => ({
    ...shop,
    category: index === 0 ? 'Electronics' : 'Home Decor',
    location: index === 0 ? 'Lusaka' : 'Copperbelt',
    rating: index === 0 ? 4.9 : 4.7,
    isFeatured: index === 0,
}))

function ShopsContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const search = searchParams.get('search')

    // Filter states
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedLocations, setSelectedLocations] = useState<string[]>([])
    const [minRating, setMinRating] = useState<number>(0)
    const [showFilters, setShowFilters] = useState(false)

    // Filter handlers
    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        )
    }

    const handleLocationChange = (location: string) => {
        setSelectedLocations((prev) =>
            prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]
        )
    }

    const handleRatingChange = (rating: number) => {
        setMinRating(minRating === rating ? 0 : rating)
    }

    const handleClearFilters = () => {
        setSelectedCategories([])
        setSelectedLocations([])
        setMinRating(0)
    }

    // Filter shops
    const filteredShops = useMemo(() => {
        let filtered = [...shopsWithMetadata]

        // Search filter
        if (search) {
            filtered = filtered.filter((shop) =>
                shop.name.toLowerCase().includes(search.toLowerCase()) ||
                shop.description.toLowerCase().includes(search.toLowerCase())
            )
        }

        // Category filter
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((shop) => shop.category && selectedCategories.includes(shop.category))
        }

        // Location filter
        if (selectedLocations.length > 0) {
            filtered = filtered.filter((shop) => shop.location && selectedLocations.includes(shop.location))
        }

        // Rating filter
        if (minRating > 0) {
            filtered = filtered.filter((shop) => (shop.rating || 0) >= minRating)
        }

        return filtered
    }, [search, selectedCategories, selectedLocations, minRating])

    return (
        <div className="min-h-[70vh] mx-6 my-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl text-slate-700 font-medium">
                        All <span className="text-slate-800 font-semibold">Shops</span>
                    </h1>

                    {/* Mobile filter toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
                    >
                        <SlidersHorizontalIcon size={18} />
                        Filters
                    </button>
                </div>

                {/* Search and count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-slate-600">
                        Showing <span className="font-medium">{filteredShops.length}</span> {filteredShops.length === 1 ? 'shop' : 'shops'}
                    </p>

                    <div className="flex items-center gap-2">
                        <label htmlFor="sort" className="text-sm text-slate-600">
                            Sort by:
                        </label>
                        <select
                            id="sort"
                            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="recommended">Recommended</option>
                            <option value="rating">Rating</option>
                            <option value="newest">Newest</option>
                        </select>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex gap-6">
                    {/* Filter Sidebar - Desktop */}
                    <div className="hidden lg:block">
                        <FilterSidebar
                            selectedCategories={selectedCategories}
                            selectedLocations={selectedLocations}
                            minRating={minRating}
                            onCategoryChange={handleCategoryChange}
                            onLocationChange={handleLocationChange}
                            onRatingChange={handleRatingChange}
                            onClearFilters={handleClearFilters}
                        />
                    </div>

                    {/* Filter Sidebar - Mobile */}
                    {showFilters && (
                        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowFilters(false)}>
                            <div className="bg-white w-80 h-full overflow-y-auto p-4" onClick={(e) => e.stopPropagation()}>
                                <FilterSidebar
                                    selectedCategories={selectedCategories}
                                    selectedLocations={selectedLocations}
                                    minRating={minRating}
                                    onCategoryChange={handleCategoryChange}
                                    onLocationChange={handleLocationChange}
                                    onRatingChange={handleRatingChange}
                                    onClearFilters={handleClearFilters}
                                />
                            </div>
                        </div>
                    )}

                    {/* Shops Grid */}
                    <div className="flex-1">
                        {filteredShops.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-32">
                                {filteredShops.map((shop) => (
                                    <ShopCard key={shop.id} shop={shop} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-slate-500 text-lg">No shops found</p>
                                <button
                                    onClick={handleClearFilters}
                                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function AllShops() {
    return (
        <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center">Loading shops...</div>}>
            <ShopsContent />
        </Suspense>
    )
}
