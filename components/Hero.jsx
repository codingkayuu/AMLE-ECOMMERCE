'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'

const Hero = () => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'K'

  return (
    <div className="mx-6">
      <div className="flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10">
        
        {/* MAIN HERO */}
        <div className="relative flex-1 bg-green-200 rounded-3xl overflow-hidden">
          
          {/* TEXT CONTENT */}
          <div className="relative z-10 p-5 sm:p-16 max-w-xl">
            <div className="inline-flex items-center gap-3 bg-green-300 text-green-700 pr-4 p-1 rounded-full text-xs sm:text-sm">
              <span className="bg-green-600 px-3 py-1 rounded-full text-white text-xs">
                NEWS
              </span>
              Free Shipping on Orders Above $50!
              <ChevronRightIcon size={16} />
            </div>

            <h2 className="text-3xl sm:text-5xl leading-[1.2] my-4 font-medium bg-gradient-to-r from-slate-700 to-[#5fbf3f] bg-clip-text text-transparent">
              Gadgets you'll love. Prices you'll trust.
            </h2>

            <div className="text-slate-800 text-sm font-medium mt-6">
              <p>Starts from</p>
              <p className="text-3xl">{currency}4.90</p>
            </div>

            <button className="bg-slate-800 text-white text-sm py-3 px-8 mt-8 rounded-md hover:bg-slate-900 transition">
              LEARN MORE
            </button>
          </div>

          {/* HERO IMAGE */}
          <Image
            src={assets.hero_model_img}
            alt=""
            className="
              hidden sm:block
              absolute bottom-0 right-6
              w-[260px] md:w-[300px]
              rounded-2xl
              object-cover
              z-0
            "
          />
        </div>

        {/* SIDE CARDS */}
        <div className="flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-slate-600">
          <div className="flex-1 flex items-center justify-between bg-orange-200 rounded-3xl p-6 px-8 group">
            <div>
              <p className="text-3xl font-medium bg-gradient-to-r from-slate-800 to-[#FFAD51] bg-clip-text text-transparent">
                Best products
              </p>
              <p className="flex items-center gap-1 mt-4">
                View more <ArrowRightIcon size={18} />
              </p>
            </div>
            <Image className="w-32" src={assets.hero_product_img1} alt="" />
          </div>

          <div className="flex-1 flex items-center justify-between bg-blue-200 rounded-3xl p-6 px-8 group">
            <div>
              <p className="text-3xl font-medium bg-gradient-to-r from-slate-800 to-[#78B2FF] bg-clip-text text-transparent">
                20% discounts
              </p>
              <p className="flex items-center gap-1 mt-4">
                View more <ArrowRightIcon size={18} />
              </p>
            </div>
            <Image className="w-32" src={assets.hero_product_img2} alt="" />
          </div>
        </div>
      </div>

      <CategoriesMarquee />
    </div>
  )
}

export default Hero
