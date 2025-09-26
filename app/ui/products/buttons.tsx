"use client";

import { ArrowDownTrayIcon, BanknotesIcon, DocumentPlusIcon, EyeDropperIcon, EyeIcon, PencilIcon, PlusIcon, TrashIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice, deactivateProduct, uploadProductImage } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


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

export function UploadProductImage({ id }: { id: string }) {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setMessage('Invalid file type. Only .jpg, .jpeg, and .png files are allowed.');
      return;
    }
    
    setIsUploading(true);
    setMessage('Uploading...');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('productId', id);
      
      await uploadProductImage(formData);
      setMessage('Upload successful!');
      router.refresh();
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      setMessage(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="relative">
      <label 
        className="rounded-md border p-2 hover:bg-gray-100 cursor-pointer inline-flex items-center"
        title="Upload Image"
      >
        <ArrowDownTrayIcon className="w-4 h-4" />
        <input 
          type="file" 
          accept=".jpg,.jpeg,.png" 
          className="hidden" 
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
      {message && (
        <div className={`absolute top-full right-0 mt-2 p-2 rounded text-sm z-10 whitespace-nowrap ${
          message.includes('failed') ? 'bg-red-100 text-red-800' : 
          message.includes('successful') ? 'bg-green-100 text-green-800' : 
          'bg-blue-100 text-blue-800'
        }`}>
          {message}
        </div>
      )}
    </div>
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