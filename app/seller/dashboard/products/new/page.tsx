'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/ui/ImageUpload'
import {
    ArrowLeft,
    Save,
    Package,
    Tag,
    DollarSign,
    Box,
    Plus,
    X,
    Loader2,
    CheckCircle2,
    Sparkles
} from 'lucide-react'
import { toast } from 'react-hot-toast'

const productSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(20, "Please provide a more detailed description"),
    price: z.string().refine(v => !isNaN(parseFloat(v)) && parseFloat(v) > 0, "Price must be a positive number"),
    category: z.string().min(1, "Please select a category"),
    condition: z.string().min(1, "Please select the condition"),
    stock: z.string().refine(v => !isNaN(parseInt(v)) && parseInt(v) >= 0, "Stock cannot be negative"),
})

type ProductFormData = z.infer<typeof productSchema>

const CATEGORIES = [
    "Laptops", "Smartphones", "Audio & Headphones", "Gaming",
    "Wearables", "Cameras", "Accessories", "Tablets", "Televisions", "Other"
]

const CONDITIONS = [
    { value: 'new', label: 'Brand New', desc: 'Unopened, full manufacturer warranty' },
    { value: 'like-new', label: 'Like New', desc: 'Used once or twice, perfect condition' },
    { value: 'good', label: 'Used - Good', desc: 'Minor signs of use, fully functional' },
    { value: 'fair', label: 'Used - Fair', desc: 'Visible wear and tear, fully functional' },
    { value: 'refurbished', label: 'Refurbished', desc: 'Professionally restored and tested' },
]

export default function NewProductPage() {
    const [images, setImages] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors }, watch } = useForm<ProductFormData>()

    const onSubmit = async (data: ProductFormData) => {
        if (images.length === 0) {
            toast.error("Please upload at least one image")
            return
        }

        setIsSubmitting(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("Not authenticated")

            // Get store id
            const { data: store } = await supabase
                .from('stores')
                .select('id')
                .eq('owner_id', user.id)
                .single()

            if (!store) throw new Error("No store found for this user")

            const { error } = await supabase
                .from('products')
                .insert({
                    store_id: store.id,
                    title: data.title,
                    description: data.description,
                    price: parseFloat(data.price),
                    category: data.category,
                    condition: data.condition,
                    stock: parseInt(data.stock),
                    images: images,
                    status: 'published'
                })

            if (error) throw error

            setIsSuccess(true)
            toast.success("Product listed successfully!")
            setTimeout(() => router.push('/seller/dashboard/products'), 2000)

        } catch (err: any) {
            console.error(err)
            toast.error(err.message || "Failed to create product")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleImageUpload = (url: string) => {
        if (url) setImages(prev => [...prev, url])
    }

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index))
    }

    if (isSuccess) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-300">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-100">
                    <CheckCircle2 className="w-12 h-12" />
                </div>
                <h1 className="text-4xl font-black text-slate-800 mb-2">Product Live!</h1>
                <p className="text-slate-500 font-medium max-w-sm">Your item has been published and is now visible to millions of buyers.</p>
            </div>
        )
    }

    return (
        <div className="p-8 max-w-5xl mx-auto pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Header */}
            <div className="flex items-center gap-6 mb-12">
                <button
                    onClick={() => router.back()}
                    className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-500 hover:text-slate-800 hover:shadow-lg transition-all"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">Create Listing</h1>
                    <p className="text-slate-500 font-medium flex items-center gap-1">
                        <Sparkles className="w-4 h-4 text-green-500" /> Share your gadget with the world.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-5 gap-10">

                {/* Left Column: Details */}
                <div className="lg:col-span-3 space-y-8">
                    <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                            <Tag className="w-5 h-5 text-green-600" /> Basic Information
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Product Title</label>
                                <input
                                    {...register('title')}
                                    type="text"
                                    placeholder="e.g. MacBook Pro M3 Max - Space Black"
                                    className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all outline-none"
                                />
                                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                                <select
                                    {...register('category')}
                                    className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all outline-none appearance-none"
                                >
                                    <option value="">Select a category</option>
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                <textarea
                                    {...register('description')}
                                    rows={6}
                                    placeholder="Write a compelling story about your product..."
                                    className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all outline-none resize-none"
                                />
                                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                            <Box className="w-5 h-5 text-green-600" /> Condition & Inventory
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-700 mb-3">Condition</label>
                                <div className="grid gap-3">
                                    {CONDITIONS.map((c) => (
                                        <label key={c.value} className={`
                                flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all
                                ${watch('condition') === c.value ? 'border-green-600 bg-green-50' : 'border-slate-100 hover:border-green-200'}
                            `}>
                                            <input {...register('condition')} type="radio" value={c.value} className="hidden" />
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${watch('condition') === c.value ? 'border-green-600' : 'border-slate-300'}`}>
                                                {watch('condition') === c.value && <div className="w-2.5 h-2.5 bg-green-600 rounded-full" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-slate-800">{c.label}</p>
                                                <p className="text-xs text-slate-500">{c.desc}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Price ($)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        {...register('price')}
                                        type="text"
                                        placeholder="0.00"
                                        className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Stock Availability</label>
                                <input
                                    {...register('stock')}
                                    type="text"
                                    placeholder="1"
                                    className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Images */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 sticky top-24">
                        <h2 className="text-xl font-black text-slate-800">HD Product Images</h2>
                        <p className="text-sm text-slate-500 font-medium -mt-4 leading-relaxed">
                            Capture your product from all angles. High-quality images increase sales by 80%.
                        </p>

                        <div className="space-y-4">
                            <ImageUpload
                                bucketName="product-images"
                                onUpload={handleImageUpload}
                                label=""
                                aspectRatio="square"
                                className="!aspect-square"
                            />

                            <div className="grid grid-cols-3 gap-3">
                                {images.map((img, i) => (
                                    <div key={i} className="aspect-square rounded-xl overflow-hidden relative group border border-slate-100">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => removeImage(i)}
                                            className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                        {i === 0 && <span className="absolute bottom-1 left-1 bg-green-600 text-[8px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">Main</span>}
                                    </div>
                                ))}
                                {images.length < 6 && [...Array(Math.max(0, 3 - images.length % 3))].map((_, i) => (
                                    <div key={i} className="aspect-square rounded-xl bg-slate-50 border border-dashed border-slate-200" />
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-50">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-3 py-5 bg-green-600 text-white font-black rounded-2xl shadow-xl shadow-green-100 hover:bg-green-700 hover:scale-[1.03] transition-all active:scale-95 disabled:opacity-70"
                            >
                                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                                Publish Product
                            </button>
                            <p className="text-[10px] text-slate-400 font-bold text-center mt-4 uppercase tracking-widest">
                                Your product will go live immediately
                            </p>
                        </div>
                    </section>
                </div>

            </form>
        </div>
    )
}
