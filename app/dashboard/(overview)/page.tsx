
import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { Suspense } from 'react';
import { LatestInvoicesSkeleton, RevenueChartSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import { auth } from '@/auth';
import { fetchBranches, fetchCardData, fetchUserDetails } from '@/app/lib/data';
import { useAppStore } from '@/app/lib/store';


export default async function Page() {
    const session = await auth();
    const branches =  await fetchBranches(Number(session?.user.id));
    const userDetails = await fetchUserDetails(Number(session?.user.id));
    const branchId = useAppStore.getState().branchId;
    let dashboardData = await fetchCardData(branchId);
    
    return (
        <main>
            {/* <div className="flex flex-col md:flex-row-reverse p-2">
                <DateRangeSelector /><BranchSelector branches={branches!}/>
            </div> */}
            <div className="flex flex-wrap gap-3 pl-5 pr-5 justify-center sm:grid-cols-4 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton/>}>
                    <CardWrapper dashboardData={dashboardData}/>
                </Suspense>
            </div>
            
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
            </div>
        </main>
    );
}