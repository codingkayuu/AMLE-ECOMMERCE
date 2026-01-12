'use client'
import { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/ProductGallery'
import ProductInfo from '@/components/ProductInfo'
import RelatedProducts from '@/components/RelatedProducts'
import { Product } from '@/types/product'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'

interface RootState {
    product: {
        list: Product[]
    }
}

interface ProductPageContentProps {
    params: {
        productId: string
    }
}

function ProductPageContent({ params }: ProductPageContentProps) {
    const products = useSelector((state: RootState) => state.product.list)
    const product = products.find((p) => p.id === params.productId)

    if (!product) {
        notFound()
    }

    return (
        <div className="min-h-[70vh] mx-6 my-8">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-slate-600 mb-6">
                    <Link href="/" className="hover:text-green-600 transition">
                        Home
                    </Link>
                    <ChevronRightIcon size={16} />
                    <Link href="/shop" className="hover:text-green-600 transition">
                        Shop
                    </Link>
                    <ChevronRightIcon size={16} />
                    <span className="text-slate-800 font-medium">{product.name}</span>
                </nav>

                {/* Main Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Product Gallery */}
                    <ProductGallery images={product.images} productName={product.name} />

                    {/* Product Info */}
                    <ProductInfo product={product} />
                </div>

                {/* Product Tabs */}
                <div className="border-t pt-12 mb-16">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Product Details</h2>
                        <p className="text-slate-600 leading-relaxed">{product.description}</p>
                    </div>

                    {/* Reviews Section */}
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                            Customer Reviews ({product.rating.length})
                        </h2>
                        <div className="space-y-6">
                            {product.rating.slice(0, 5).map((review) => (
                                <div key={review.id} className="border-b pb-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden flex-shrink-0">
                                            <img
                                                src={review.user.image}
                                                alt={review.user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-medium text-slate-800">{review.user.name}</h4>
                                                <div className="flex items-center gap-1">
                                                    {Array(5)
                                                        .fill('')
                                                        .map((_, index) => (
                                                            <span
                                                                key={index}
                                                                className={`text-xs ${review.rating >= index + 1 ? 'text-green-600' : 'text-slate-300'
                                                                    }`}
                                                            >
                                                                ★
                                                            </span>
                                                        ))}
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-600">{review.review}</p>
                                            <p className="text-xs text-slate-400 mt-2">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <RelatedProducts currentProduct={product} allProducts={products} />
            </div>
        </div>
    )
}

export default function ProductPage({ params }: ProductPageContentProps) {
    return (
        <Suspense
            fallback={
                <div className="min-h-[70vh] flex items-center justify-center">
                    Loading product...
                </div>
            }
        >
            <ProductPageContent params={params} />
        </Suspense>
    )
}
