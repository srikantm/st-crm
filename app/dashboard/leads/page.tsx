import Pagination from '@/app/ui/leads/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/leads/table';
import { font } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchLeadsPages } from '@/app/lib/data';
import { CreateLead } from '@/app/ui/leads/buttons';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Leads',
  };

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchLeadsPages(query);
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${font.className} text-md`}>Leads</h1>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2 md:mt-2">
                <Search placeholder="Search leads..." />
                <CreateLead />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-2 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}