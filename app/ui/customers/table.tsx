import { fetchFilteredCustomers } from '@/app/lib/data';
import { UpdateLead } from './buttons';
import { font } from '../fonts';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

export default async function CustomersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const customers = await fetchFilteredCustomers(query, currentPage);

  return (
    <div className={`${font.className} mt-4 flow-root h-full`}>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {customers?.map((customer,i) => (
              <div
                key={customer.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{customer.type}</p>
                    </div>
                    <p className="text-sm text-gray-500">{customer.name}</p>
                  </div>
                  {/* <InvoiceStatus status={lead.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-md font-medium">
                      {customer.email}
                    </p>
                    <p className="text-md font-medium">
                      {customer.contact_number}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateLead id={customer.id} />
                    {/* <DeleteInvoice id={lead.id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-2 py-3  sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-2 py-3 ">
                  Type
                </th>
                <th scope="col" className="px-2 py-3 ">
                  Email
                </th>
                <th scope="col" className="px-2 py-3 ">
                  Contact Number
                </th>
                
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {customers?.map((customer) => (
                <tr
                  key={customer.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-2 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{customer.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-2 pl-6 pr-3">
                    <div className="flex items-center ">
                      <p>
                        {customer.type === 'b2b' && 'B2B'}
                      {customer.type === 'b2c' && 'B2C'}</p>
                    </div>
                  </td>
                
                  <td className="whitespace-nowrap px-3 py-2">
                    {customer.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    {customer.contact_number}
                  </td>
                  
                  <td className="whitespace-nowrap py-2 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateLead id={customer.id} />
                      {/* <DeleteInvoice id={lead.id} /> */}
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
