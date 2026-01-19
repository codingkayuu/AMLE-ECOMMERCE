'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/ui/ImageUpload'
import { ArrowRight, Store, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

// --- Validation Scheme ---
const storeSchema = z.object({
    name: z.string().min(3, "Store name must be at least 3 characters"),
    username: z.string().min(3, "Username must be at least 3 characters")
        .regex(/^[a-z0-9_-]+$/, "Username can only contain lowercase letters, numbers, underscores, and dashes"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    category: z.string().min(1, "Please select a category"),
    logo_url: z.string().optional(),
    banner_url: z.string().optional(),
    owner_name: z.string().min(3, "Owner name is required"),
    phone: z.string().min(8, "Valid phone number is required")
})

type StoreFormData = z.infer<typeof storeSchema>

const CATEGORIES = [
    "Electronics", "Clothing & Fashion", "Home & Garden", "Beauty & Health",
    "Toys & Hobbies", "Sports & Outdoors", "Automotive", "Books & Media",
    "Art & Collectibles", "Other"
]

export default function StoreWizard() {
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors }, watch, setValue, trigger } = useForm<StoreFormData>({
        resolver: zodResolver(storeSchema),
        defaultValues: {
            category: '',
            logo_url: '',
            banner_url: '',
            owner_name: '',
            phone: ''
        }
    })

    // Watch values for preview
    const formData = watch()

    const onSubmit = async (data: StoreFormData) => {
        setIsLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("Not authenticated")

            // Check if username unique
            const { data: existing } = await supabase
                .from('stores')
                .select('id')
                .eq('username', data.username)
                .single()

            if (existing) {
                toast.error("Username already taken")
                setIsLoading(false)
                return
            }

            // Create store
            const { error } = await supabase
                .from('stores')
                .insert({
                    owner_id: user.id,
                    name: data.name,
                    username: data.username,
                    description: data.description,
                    category: data.category,
                    logo_url: data.logo_url,
                    banner_url: data.banner_url,
                    settings: {
                        owner_name: data.owner_name,
                        phone: data.phone
                    },
                    status: 'active'
                })

            if (error) throw error

            toast.success("Ready for business! Redirecting to your dashboard...")
            router.push('/seller/dashboard')

        } catch (error: any) {
            console.error(error)
            toast.error(error.message || "Failed to create store")
        } finally {
            setIsLoading(false)
        }
    }

    const nextStep = async () => {
        let isValid = false
        if (step === 1) {
            isValid = await trigger(['owner_name', 'phone'])
        } else if (step === 2) {
            isValid = await trigger(['name', 'username', 'category', 'description'])
        } else {
            isValid = true
        }

        if (isValid) setStep(s => s + 1)
    }

    const prevStep = () => setStep(s => s - 1)

    return (
        <div className="flex flex-col gap-8">
            {/* Steps Indicator */}
            <div className="flex justify-between items-center px-4 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 rounded-full" />
                <div className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all ${step >= 1 ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'bg-slate-200 text-slate-500'}`}>1</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Founder</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all ${step >= 2 ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'bg-slate-200 text-slate-500'}`}>2</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Business</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all ${step >= 3 ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'bg-slate-200 text-slate-500'}`}>3</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Branding</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all ${step >= 4 ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'bg-slate-200 text-slate-500'}`}>4</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Launch</span>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl shadow-green-900/5 border border-slate-50">

                {/* Step 1: Founder Info */}
                {step === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Meet the Founder</h2>
                            <p className="text-slate-500 font-medium">Let's get to know the visionary behind this business.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Owner Full Name</label>
                                <input
                                    {...register('owner_name')}
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all outline-none"
                                />
                                {errors.owner_name && <p className="text-xs text-red-500 mt-2">{errors.owner_name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Mobile Number</label>
                                <input
                                    {...register('phone')}
                                    type="text"
                                    placeholder="+260 9xx xxxxxx"
                                    className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all outline-none"
                                />
                                {errors.phone && <p className="text-xs text-red-500 mt-2">{errors.phone.message}</p>}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Basic Details */}
                {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Business Fundamentals</h2>
                            <p className="text-slate-500 font-medium">What's the big idea? Tell us about your brand.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Store Identity</label>
                                <input
                                    {...register('name')}
                                    type="text"
                                    placeholder="e.g. Gadget Haven"
                                    className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all outline-none"
                                />
                                {errors.name && <p className="text-xs text-red-500 mt-2">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Store URL (@username)</label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">@</span>
                                    <input
                                        {...register('username')}
                                        type="text"
                                        placeholder="gadget_haven"
                                        className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all outline-none"
                                    />
                                </div>
                                {errors.username && <p className="text-xs text-red-500 mt-2">{errors.username.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Business Category</label>
                            <select
                                {...register('category')}
                                className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all outline-none appearance-none"
                            >
                                <option value="">Select your niche...</option>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {errors.category && <p className="text-xs text-red-500 mt-2">{errors.category.message}</p>}
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Store Vision / Description</label>
                            <textarea
                                {...register('description')}
                                rows={4}
                                placeholder="Explain what makes your store unique..."
                                className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all outline-none resize-none"
                            />
                            {errors.description && <p className="text-xs text-red-500 mt-2">{errors.description.message}</p>}
                        </div>
                    </div>
                )}

                {/* Step 3: Branding */}
                {step === 3 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Brand Aesthetics</h2>
                            <p className="text-slate-500 font-medium">Time to dress up! Upload your high-quality assets.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <ImageUpload
                                    bucketName="store-assets"
                                    label="Store Logo"
                                    aspectRatio="square"
                                    defaultImage={formData.logo_url}
                                    onUpload={(url) => setValue('logo_url', url)}
                                />
                                <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-widest text-center">Best: 500x500px Square</p>
                            </div>
                            <div>
                                <ImageUpload
                                    bucketName="store-assets"
                                    label="Store Banner"
                                    aspectRatio="banner"
                                    defaultImage={formData.banner_url}
                                    onUpload={(url) => setValue('banner_url', url)}
                                />
                                <p className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-widest text-center">Best: 1500x500px Wide</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 text-center">
                        <div className="space-y-3">
                            <h2 className="text-4xl font-black text-green-600 tracking-tighter">Ready for Liftoff!</h2>
                            <p className="text-slate-500 font-medium">Verify your launch sequence and go live.</p>
                        </div>

                        <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100 relative overflow-hidden text-left group">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                                <Store className="w-64 h-64" />
                            </div>

                            <div className="flex items-center gap-8 mb-10 relative z-10">
                                <div className="w-24 h-24 rounded-3xl bg-white border border-slate-100 overflow-hidden relative shadow-2xl">
                                    {formData.logo_url ? (
                                        <img src={formData.logo_url} alt="Logo" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-200"><Store className="w-10 h-10" /></div>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-3xl font-black text-slate-800">{formData.name}</h3>
                                    <p className="text-green-600 font-black text-sm tracking-wider uppercase">@{formData.username}</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-10 relative z-10">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Business Owner</span>
                                    <p className="font-black text-slate-800 text-xl">{formData.owner_name}</p>
                                    <p className="text-slate-500 font-bold">{formData.phone}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Store Niche</span>
                                    <p className="font-black text-slate-800 text-xl">{formData.category}</p>
                                    <p className="text-green-600 font-bold">Catalogue: 0 items</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-10 border-t border-slate-50">
                    {step > 1 ? (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="flex items-center gap-2 px-8 py-4 text-slate-400 font-black text-sm uppercase tracking-widest hover:text-slate-800 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" /> Back
                        </button>
                    ) : (
                        <div /> // Spacer
                    )}

                    {step < 4 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="flex items-center gap-3 px-12 py-5 bg-green-600 hover:bg-green-700 text-white font-black rounded-3xl shadow-2xl shadow-green-100 hover:scale-[1.05] transition-all active:scale-95 group"
                        >
                            Next Step <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-3 px-12 py-5 bg-green-600 hover:bg-green-700 text-white font-black rounded-3xl shadow-2xl shadow-green-200 hover:scale-[1.05] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <CheckCircle className="w-6 h-6" />}
                            Launch My Store
                        </button>
                    )}
                </div>

            </form>
        </div>
    )
}
