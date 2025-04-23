import { fetchRevenuesPages } from "@/app/lib/data";
import Pagination from "@/app/ui/pagination";
import { RevenueTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { Metadata } from 'next';
import RevenueTable from "@/app/ui/revenue/table";

export const metadata: Metadata = {
  title: 'Revenue',
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
  const totalPages = await fetchRevenuesPages(query);
  
    return (
      <div className="w-full">
       <Suspense key={query + currentPage} fallback={<RevenueTableSkeleton />}>
        <RevenueTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>);
  }