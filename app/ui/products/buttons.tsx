"use client";

import { ArrowDownTrayIcon, BanknotesIcon, DocumentPlusIcon, EyeDropperIcon, EyeIcon, PencilIcon, PlusIcon, TrashIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice, deactivateProduct } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';


export function CreateProduct() {
  return (
    <Link
      href="/dashboard/products/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Product</span>{' '}
      <PlusIcon className="w-4 h-4" />
    </Link>
  );
}


export function ViewProduct({ id }: { id: string }) {
    
  return (
    
        <a className="rounded-md border p-2 hover:bg-gray-100" href={`https://sheeraztours.com/tour/${id}`} target="_blank" rel="noopener noreferrer"><EyeIcon className="w-4 h-4"/></a> 
  );
}


export function UpdateProduct({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/products/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-4 h-4" />
    </Link>
  );
}

export function DeactivateProduct({ id }: { id: string }) {
  const router = useRouter();
  
  const handleDeactivate = async () => {
    const confirmed = window.confirm("Are you sure you want to deactivate this package?");
    if (confirmed) {
      console.log("id::"+id);
      await deactivateProduct(id);
      router.refresh();
    }
  };
  
  return (
    <button
      onClick={handleDeactivate}
      className="rounded-md border p-2 hover:bg-gray-100 text-red-600"
    >
      <NoSymbolIcon className="w-4 h-4" />
    </button>
  );
}