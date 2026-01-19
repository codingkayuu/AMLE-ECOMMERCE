import StoreWizard from '@/components/store/StoreWizard'
import { RocketIcon } from 'lucide-react'

export default function SellerOnboardingPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
            <div className="max-w-3xl mx-auto space-y-8">

                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                        <RocketIcon className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                        Launch Your Store Today
                    </h1>
                    <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
                        Join thousands of successful sellers. Set up your customized store in minutes and reach millions of buyers.
                    </p>
                </div>

                <StoreWizard />

            </div>
        </div>
    )
}
