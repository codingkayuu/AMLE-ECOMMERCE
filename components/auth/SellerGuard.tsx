'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import { Loader2 } from 'lucide-react'

export default function SellerGuard({ children }: { children: React.ReactNode }) {
    const { user, loading: authLoading } = useAuth() as any
    const [checkingStore, setCheckingStore] = useState(true)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        async function checkStore() {
            if (authLoading) return
            if (!user) return

            // Only apply this logic to sellers
            if (user.user_metadata?.role !== 'seller') {
                setCheckingStore(false)
                return
            }

            // If already on onboarding page, don't check/redirect
            if (pathname === '/seller/onboarding') {
                setCheckingStore(false)
                return
            }

            try {
                const { data, error } = await supabase
                    .from('stores')
                    .select('id')
                    .eq('owner_id', user.id)
                    .single()

                if (!data || error) {
                    // If no store found, redirect to onboarding
                    router.push('/seller/onboarding')
                } else {
                    setCheckingStore(false)
                }
            } catch (err) {
                console.error('Error checking store:', err)
                setCheckingStore(false)
            }
        }

        checkStore()
    }, [user, authLoading, pathname, router])

    if (authLoading || checkingStore) {
        return (
            <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
                <p className="text-slate-500 font-medium animate-pulse">Setting up your experience...</p>
            </div>
        )
    }

    return <>{children}</>
}
