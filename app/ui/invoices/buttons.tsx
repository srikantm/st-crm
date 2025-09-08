'use client'

import { ArrowDownTrayIcon, BanknotesIcon, DocumentPlusIcon, EyeDropperIcon, EyeIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice, updateInvoiceStatus } from '@/app/lib/actions';



export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function DownloadInvoice({ id }: { id: string }) {
    
  return (
    <Link
      href={`/dashboard/invoices/${id}/view`}
      className="rounded-md border p-1 hover:bg-gray-100"
    >
      <EyeIcon className="w-5" />
    </Link>
  );
}

export function RecordPayment({ id }: { id: string }) {
    
  return (
    <Link
      href={`/dashboard/invoices/${id}/record-payment`}
      className="rounded-md border p-1 hover:bg-gray-100"
    >
      <BanknotesIcon className="w-5" title='Record Payment'/> 
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-1 hover:bg-gray-100"
    >
      <PencilIcon className="w-4 h-4" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <>
      <form action={deleteInvoiceWithId}>
        <button className="rounded-md border p-1 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}

const handleSelectChange = (invoiceId: string, status: string) => {
  const confirmed = window.confirm("Are you sure you want to change the status?");
  if (confirmed) {
    updateInvoiceStatus(invoiceId, status);
  }
}

export function ChangeStatus({invoiceId, status}:{invoiceId: string, status:string}) {
  return (

    <select
      value={status}
      onChange={(e) => handleSelectChange(invoiceId, e.target.value)}
      className='peer flex w-30% cursor-pointer rounded-md border border-gray-200 py-1 pl-10 text-sm outline-1 placeholder:text-gray-500'
    >
      <option value="" disabled>
        Change Status
      </option>
      <option value="pending" disabled>Pending</option>
      <option value="partially paid" disabled>Partially Paid</option>
      <option value="paid" disabled>Paid</option>
      {status === 'pending' ? <option value="cancelled">Cancelled</option> : <option value="cancelled" disabled>Cancelled</option>}
    </select>
  );
}
