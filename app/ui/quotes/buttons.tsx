import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';



export function CreateQuote() {
  return (
    <Link
      href="/dashboard/quotes/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Quote</span>{' '}
      <PlusIcon className="w-4 h-4" />
    </Link>
  );
}

export function DownloadQuote({ id }: { id: string }) {
    
  return (
    <Link
      href={`/dashboard/quotes/${id}/view`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <EyeIcon className="w-4 h-4" />
    </Link>
  );
}

export function UpdateQuote({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/quotes/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-4 h-4" />
    </Link>
  );
}

export function DeleteQuote({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <>
      <form action={deleteInvoiceWithId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-4 h-4" />
        </button>
      </form>
    </>
  );
}
