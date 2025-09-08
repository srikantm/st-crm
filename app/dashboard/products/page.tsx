import Pagination from '@/app/ui/products/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/products/table';
import { font } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchProductsPageCount } from '@/app/lib/data';
import { Metadata } from 'next';
import { CreateProduct } from '@/app/ui/products/buttons';

export const metadata: Metadata = {
    title: 'Products',
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
    const totalPages = await fetchProductsPageCount(query);
    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${font.className} text-md`}>Products</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-2 md:mb-2">
                <Search placeholder="Search products..." />
                <CreateProduct />
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