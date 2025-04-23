import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { fetchFilteredRevenue } from '@/app/lib/data';

export default async function RevenueTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const revenues = await fetchFilteredRevenue(query, currentPage);

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Revenue
      </h1>
      <Search placeholder="Search revenue..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Month
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Revenue
                    </th>
                   </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {revenues.map((revenue) => (
                    <tr>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {revenue.month}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {revenue.revenue}
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
