import Image from 'next/image';
import { UpdateQuote, DeleteQuote, DownloadQuote } from '@/app/ui/quotes/buttons';
import QuoteStatus from '@/app/ui/quotes/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredQuotes } from '@/app/lib/data';
import { font } from '../fonts';

export default async function QuotesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const quotes = await fetchFilteredQuotes(query, currentPage);

  return (
    <div className={`${font.className} mt-2 flow-root`}>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {quotes?.map((quote) => (
              <div
                key={quote.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{quote.quote_number}</p>
                    </div>
                    <p className="text-sm text-gray-500">{quote.customer_name}</p>
                  </div>
                  <QuoteStatus status={quote.quote_status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-md font-medium">
                    {Number(quote.quote_total_amount!).toLocaleString("en-US", { style: "currency", currency: "INR" })}
                    </p>
                    <p>{quote.quote_date}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <DownloadQuote id={quote.id} />
                    <UpdateQuote id={quote.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-medium">
              <tr>
                <th scope="col" className="px-4 py-2  sm:pl-6">
                  Quote Number
                </th>
                <th scope="col" className="px-3 py-2 ">
                  Customer
                </th>
                <th scope="col" className="px-3 py-2 ">
                  Amount
                </th>
                <th scope="col" className="px-3 py-2 ">
                  Date
                </th>
                <th scope="col" className="px-3 py-2 ">
                  Status
                </th>
                <th scope="col" className="relative py-2 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {quotes?.map((quote) => (
                <tr
                  key={quote.id}
                  className="w-full border-b py-2 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-2 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{quote.quote_number}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    {quote.customer_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    {Number(quote.quote_total_amount!).toLocaleString("en-US", { style: "currency", currency: "INR" })}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    {quote.quote_date}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    <QuoteStatus status={quote.quote_status} />
                  </td>
                  <td className="whitespace-nowrap py-2 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <DownloadQuote id={quote.id} />
                      <UpdateQuote id={quote.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
