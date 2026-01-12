'use client'
import React from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/types/product'

interface RelatedProductsProps {
    currentProduct: Product
    allProducts: Product[]
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct, allProducts }) => {
    // Filter products by same category, excluding current product
    const relatedProducts = allProducts
        .filter(
            (product) =>
                product.category === currentProduct.category && product.id !== currentProduct.id
        )
        .slice(0, 6) // Limit to 6 products

    if (relatedProducts.length === 0) {
        return null
    }

    return (
        <div className="mt-16 mb-32">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {relatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts
