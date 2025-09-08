import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { font } from '@/app/ui/fonts';
import { LatestInvoice } from '@/app/lib/definitions';
import { fetchLatestInvoices } from '@/app/lib/data';
import { formatCurrency } from '@/app/lib/utils';
export default async function UserProfile() {
  
  const latestInvoicesData = await fetchLatestInvoices();
    const fetchedData = JSON.stringify(latestInvoicesData);
    const invoices: LatestInvoice[] = JSON.parse(fetchedData);

  return (
    <div>
      
    </div>
  );
}
