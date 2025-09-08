import Pagination from '@/app/ui/settings/pagination';
import Search from '@/app/ui/search';
import { CreateNewUser } from '@/app/ui/settings/buttons';
import { font } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import UsersTable from '@/app/ui/settings/table';

export const metadata: Metadata = {
    title: 'Users',
  };

export default async function UserPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${font.className} text-md`}>Users</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search users..." />
                {/* <CreateNewUser /> */}
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <UsersTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                {/* <Pagination totalPages={totalPages} /> */}
            </div>
        </div>
    );
}