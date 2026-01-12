'use client'
import React, { useState } from 'react'
import Image from 'next/image'

interface ProductGalleryProps {
    images: any[]
    productName: string
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
    const [selectedImage, setSelectedImage] = useState(0)

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="bg-[#F5F5F5] rounded-2xl overflow-hidden flex items-center justify-center aspect-square">
                <Image
                    src={images[selectedImage]}
                    alt={productName}
                    width={600}
                    height={600}
                    className="w-full h-full object-contain p-8 transition-all duration-300"
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`bg-[#F5F5F5] rounded-lg overflow-hidden aspect-square flex items-center justify-center transition-all ${selectedImage === index
                                    ? 'ring-2 ring-green-600 ring-offset-2'
                                    : 'hover:ring-2 hover:ring-slate-300 hover:ring-offset-2'
                                }`}
                        >
                            <Image
                                src={image}
                                alt={`${productName} ${index + 1}`}
                                width={150}
                                height={150}
                                className="w-full h-full object-contain p-2"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductGallery
