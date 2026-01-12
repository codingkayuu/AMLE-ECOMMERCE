'use client'
import { Suspense, useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import ProductCard from '@/components/ProductCard'
import FilterSidebar from '@/components/FilterSidebar'
import { MoveLeftIcon, SlidersHorizontalIcon } from 'lucide-react'
import { Product, SortOption } from '@/types/product'

interface RootState {
    product: {
        list: Product[]
    }
}

function ShopContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const search = searchParams.get('search')

    const products = useSelector((state: RootState) => state.product.list)

    // Filter states
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedLocations, setSelectedLocations] = useState<string[]>([])
    const [minRating, setMinRating] = useState<number>(0)
    const [sortBy, setSortBy] = useState<SortOption>('recommended')
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

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...products]

        // Search filter
        if (search) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
            )
        }

        // Category filter
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((product) => selectedCategories.includes(product.category))
        }

        // Rating filter
        if (minRating > 0) {
            filtered = filtered.filter((product) => {
                const avgRating =
                    product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length
                return avgRating >= minRating
            })
        }

        // Sort
        switch (sortBy) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price)
                break
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price)
                break
            case 'rating':
                filtered.sort((a, b) => {
                    const avgA = a.rating.reduce((acc, curr) => acc + curr.rating, 0) / a.rating.length
                    const avgB = b.rating.reduce((acc, curr) => acc + curr.rating, 0) / b.rating.length
                    return avgB - avgA
                })
                break
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                break
            default:
                // recommended - keep original order
                break
        }

        return filtered
    }, [products, search, selectedCategories, minRating, sortBy])

    return (
        <div className="min-h-[70vh] mx-6 my-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1
                        onClick={() => router.push('/shop')}
                        className="text-2xl text-slate-500 flex items-center gap-2 cursor-pointer"
                    >
                        {search && <MoveLeftIcon size={20} />} All{' '}
                        <span className="text-slate-700 font-medium">Products</span>
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

                {/* Sort and count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-slate-600">
                        Showing <span className="font-medium">{filteredAndSortedProducts.length}</span> products
                    </p>

                    <div className="flex items-center gap-2">
                        <label htmlFor="sort" className="text-sm text-slate-600">
                            Sort by:
                        </label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="recommended">Recommended</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
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

                    {/* Product Grid */}
                    <div className="flex-1">
                        {filteredAndSortedProducts.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 mb-32">
                                {filteredAndSortedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-slate-500 text-lg">No products found</p>
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

export default function Shop() {
    return (
        <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center">Loading shop...</div>}>
            <ShopContent />
        </Suspense>
    )
}
