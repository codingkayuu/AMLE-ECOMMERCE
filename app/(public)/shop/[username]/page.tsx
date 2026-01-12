'use client'
import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { notFound } from 'next/navigation'
import ShopHeader from '@/components/ShopHeader'
import ShopSidebar from '@/components/ShopSidebar'
import ProductCard from '@/components/ProductCard'
import { Shop } from '@/types/shop'
import { Product } from '@/types/product'
import { storesDummyData, productDummyData } from '@/assets/assets'

interface RootState {
    product: {
        list: Product[]
    }
}

interface ShopPageProps {
    params: {
        username: string
    }
}

export default function ShopPage({ params }: ShopPageProps) {
    const [activeTab, setActiveTab] = useState('products')
    const [selectedCategory, setSelectedCategory] = useState('All Products')

    // Find shop by username
    const shop = storesDummyData.find((s) => s.username === params.username)

    if (!shop) {
        notFound()
    }

    // Get products for this shop
    const shopProducts = productDummyData.filter((p) => p.storeId === shop.id)

    // Calculate category counts
    const categories = [
        { name: 'All Products', count: shopProducts.length, isActive: true },
        { name: 'New Arrivals', count: 12 },
        { name: 'Best Sellers', count: 8 },
        { name: 'Home Decor', count: 58 },
        { name: 'Accessories', count: 34 },
        { name: 'Sale', count: 14, isSale: true },
    ]

    // Filter products by category
    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'All Products') {
            return shopProducts
        }
        // For demo, just return all products
        return shopProducts
    }, [selectedCategory, shopProducts])

    const tabs = [
        { id: 'products', label: 'Products' },
        { id: 'about', label: 'About Us' },
        { id: 'reviews', label: 'Reviews', count: 924 },
        { id: 'policies', label: 'Policies' },
    ]

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Shop Header */}
                <ShopHeader shop={shop} />

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="border-b border-slate-200">
                        <nav className="flex gap-8 px-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors relative ${activeTab === tab.id
                                            ? 'border-blue-600 text-blue-600'
                                            : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
                                        }`}
                                >
                                    {tab.label}
                                    {tab.count && (
                                        <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs">
                                            {tab.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex gap-6">
                    {/* Sidebar */}
                    <ShopSidebar
                        categories={categories}
                        onCategoryClick={setSelectedCategory}
                        selectedCategory={selectedCategory}
                    />

                    {/* Products Grid */}
                    <div className="flex-1">
                        {activeTab === 'products' && (
                            <>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-slate-800">All Products</h2>
                                    <div className="flex items-center gap-2">
                                        <label htmlFor="sort" className="text-sm text-slate-600">
                                            Sort by:
                                        </label>
                                        <select
                                            id="sort"
                                            className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="recommended">Recommended</option>
                                            <option value="price-asc">Price: Low to High</option>
                                            <option value="price-desc">Price: High to Low</option>
                                            <option value="rating">Rating</option>
                                            <option value="newest">Newest</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 mb-32">
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </>
                        )}

                        {activeTab === 'about' && (
                            <div className="bg-white rounded-lg p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-slate-800 mb-4">About {shop.name}</h2>
                                <p className="text-slate-600 leading-relaxed">{shop.description}</p>
                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Email</p>
                                        <p className="text-slate-800">{shop.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Contact</p>
                                        <p className="text-slate-800">{shop.contact}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Location</p>
                                        <p className="text-slate-800">{shop.address}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Status</p>
                                        <p className="text-green-600 font-medium capitalize">{shop.status}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="bg-white rounded-lg p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-slate-800 mb-4">Customer Reviews</h2>
                                <p className="text-slate-600">Reviews will be displayed here.</p>
                            </div>
                        )}

                        {activeTab === 'policies' && (
                            <div className="bg-white rounded-lg p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-slate-800 mb-4">Shop Policies</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-slate-800 mb-2">Shipping Policy</h3>
                                        <p className="text-slate-600">We ship worldwide within 24 hours of order confirmation.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800 mb-2">Return Policy</h3>
                                        <p className="text-slate-600">30-day return policy for all items in original condition.</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800 mb-2">Payment Methods</h3>
                                        <p className="text-slate-600">We accept all major credit cards, PayPal, and bank transfers.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
