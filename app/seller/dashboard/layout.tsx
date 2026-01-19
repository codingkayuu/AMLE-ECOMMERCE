import DashboardSidebar from '@/components/seller/DashboardSidebar'

export default function SellerDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex bg-slate-50 min-h-screen">
            <DashboardSidebar />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
