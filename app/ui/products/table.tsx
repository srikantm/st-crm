import { UpdateProduct, ViewProduct } from '@/app/ui/products/buttons';
import { fetchFilteredProducts } from '@/app/lib/data';
import { font } from '../fonts';

export default async function ProductsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await fetchFilteredProducts(query, currentPage);

  return (
    <div className={`${font.className} mt-2 flow-root`}>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {products?.map((product) => (
              <div
                key={product.package_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{product.package_name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{product.package_type}</p>
                  </div>
                  
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-lg font-medium">
                      {product.adult_rate}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    {/* <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className={`${font.className} hidden min-w-full text-gray-900 md:table`}>
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-2 font-sm">
                  Package Id
                </th>
                <th scope="col" className="px-3 py-2 font-sm">
                  Package Name
                </th>
                <th scope="col" className="px-3 py-2 font-sm">
                  Package Type
                </th>
                <th scope="col" className="px-3 py-2 font-sm">
                  Package Theme
                </th>
                <th scope="col" className="px-3 py-2 font-sm">
                  Amount
                </th>
                <th scope="col" className="relative px-3 py-2">
                  <span className="sr-only">Edit</span>
      
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products?.map((product) => (
                <tr
                  key={product.package_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap text-sm py-2 pl-5 pr-3">
                      <p>{product.package_id}</p>
                  </td>
                  <td className="truncate text-sm px-3 py-2">
                    {product.package_name}
                  </td>
                  <td className="truncate text-sm px-3 py-2">
                    {product.package_type}
                  </td>
                  <td className="truncate text-sm px-3 py-2">
                    {product.theme_type}
                  </td>
                  <td className="whitespace-nowrap text-sm px-3 py-2">
                    {Number(product.adult_rate!).toLocaleString("en-US", { style: "currency", currency: "INR" })}
                  </td>
                  <td className="whitespace-nowrap py-2 pl-3 pr-3">
                    <div className="flex justify-center gap-3">
                      <ViewProduct id={product.package_id}/>
                      <UpdateProduct id={product.package_id} />
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
