'use client'
import React, { useState } from 'react'
import { StarIcon, MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react'
import Image from 'next/image'
import { Product } from '@/types/product'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/lib/features/cart/cartSlice'
import { useRouter } from 'next/navigation'

interface ProductInfoProps {
    product: Product
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()
    const router = useRouter()
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    // Calculate average rating
    const avgRating = product.rating.length > 0
        ? product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length
        : 0
    const roundedRating = Math.round(avgRating)

    const handleQuantityChange = (delta: number) => {
        setQuantity((prev) => Math.max(1, prev + delta))
    }

    const handleAddToCart = () => {
        dispatch(addToCart({ productId: product.id, quantity }))
    }

    const handleBuyNow = () => {
        dispatch(addToCart({ productId: product.id, quantity }))
        router.push('/cart')
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Product Name */}
            <div>
                <h1 className="text-3xl font-semibold text-slate-800 mb-2">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        {Array(5)
                            .fill('')
                            .map((_, index) => (
                                <StarIcon
                                    key={index}
                                    size={18}
                                    className="text-transparent"
                                    fill={roundedRating >= index + 1 ? '#00C950' : '#D1D5DB'}
                                />
                            ))}
                    </div>
                    <span className="text-sm text-slate-600">
                        ({product.rating.length} {product.rating.length === 1 ? 'review' : 'reviews'})
                    </span>
                </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-slate-800">
                    {currency}{product.price}
                </span>
                {product.mrp !== product.price && (
                    <>
                        <span className="text-xl text-slate-400 line-through">
                            {currency}{product.mrp}
                        </span>
                        <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                            {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                        </span>
                    </>
                )}
            </div>

            {/* Category */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Category:</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                    {product.category}
                </span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
            </div>

            {/* Description */}
            <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Description</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">Quantity</h3>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="w-10 h-10 flex items-center justify-center border-2 border-slate-300 rounded-lg hover:border-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        <MinusIcon size={18} className="text-slate-600" />
                    </button>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 h-10 text-center border-2 border-slate-300 rounded-lg focus:outline-none focus:border-green-500"
                    />
                    <button
                        onClick={() => handleQuantityChange(1)}
                        className="w-10 h-10 flex items-center justify-center border-2 border-slate-300 rounded-lg hover:border-green-500 transition"
                    >
                        <PlusIcon size={18} className="text-slate-600" />
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                    <ShoppingCartIcon size={20} />
                    Add to Cart
                </button>
                <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    className="flex-1 bg-slate-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-slate-900 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                    Buy Now
                </button>
            </div>

            {/* Store Info */}
            <div className="border-t pt-6 mt-4">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">Sold by</h3>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-full overflow-hidden">
                        <Image
                            src={product.store.logo}
                            alt={product.store.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="font-medium text-slate-800">{product.store.name}</p>
                        <p className="text-xs text-slate-500">{product.store.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo
