"use client";

import { ArrowDownTrayIcon, BanknotesIcon, DocumentPlusIcon, EyeDropperIcon, EyeIcon, PencilIcon, PlusIcon, TrashIcon, NoSymbolIcon, ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice, deactivateProduct, uploadProductImage, uploadProductImageList, fetchActiveMappingImages, ActiveImage, mapImageToPackage } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


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

export function UploadMultipleProductImage() {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      setMessage('No files selected.');
      return;
    }

    const filesArray = Array.from(selectedFiles); // ✅ multiple files here

    setIsUploading(true);
    setMessage('Uploading...');

    try {
      await uploadProductImageList(filesArray);
      setMessage('Upload successful!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(
        `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative">
      <label
        className="rounded-md border p-2 hover:bg-gray-100 cursor-pointer inline-flex items-center"
        title="Upload Images"
      >
        <ArrowUpTrayIcon className="w-4 h-4 mr-1" />
        Upload Images
        {/* ✅ 'multiple' attribute is the key to select many */}
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          multiple
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>

      {message && (
        <div
          className={`absolute top-full right-0 mt-2 p-2 rounded text-sm z-10 whitespace-nowrap ${
            message.includes('failed')
              ? 'bg-red-100 text-red-800'
              : message.includes('successful')
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}


// export function MapProductImagePopup({ id }: { id: string }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [images, setImages] = useState<ActiveImage[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   // Base URL for images
//   const domain = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

//   // Fetch active mapping images when popup opens
//   useEffect(() => {
//     if (isOpen) {
//       loadActiveImages();
//     }
//   }, [isOpen]);

//   const loadActiveImages = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await fetchActiveMappingImages();
//       setImages(data);
//     } catch (err) {
//       console.error('Error fetching active images:', err);
//       setError('Failed to load images.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!selectedImageId) return;

//     console.log('🟦 Selected Image ID:', selectedImageId);
//     console.log('🟩 For Package ID:', id);

//     // TODO: integrate your mapping API call here
//     // await mapImageToPackage(id, selectedImageId);

//     setIsOpen(false);
//   };

//   return (
//     <>
//       {/* Trigger button */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="rounded border px-2 py-1 text-sm hover:bg-gray-100 flex items-center gap-1"
//       >
//         <ArrowUpTrayIcon className="w-4 h-4" />
//         Map Image
//       </button>

//       {/* Popup */}
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white w-[650px] max-h-[80vh] rounded-lg shadow-lg p-5 relative flex flex-col">
//             {/* Close Button */}
//             <button
//               onClick={() => setIsOpen(false)}
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
//             >
//               <XMarkIcon className="w-5 h-5" />
//             </button>

//             <h2 className="text-lg font-semibold mb-4">
//               Select Image to Map for Package #{id}
//             </h2>

//             {/* Loading & Error */}
//             {loading && <p>Loading images...</p>}
//             {error && <p className="text-red-600 text-sm">{error}</p>}

//             {/* Scrollable Images Container */}
//             {!loading && !error && (
//               <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto border-t border-b py-2">
//                 {images.length === 0 ? (
//                   <p className="text-sm text-gray-500 text-center">
//                     No active images available.
//                   </p>
//                 ) : (
//                   images.map((img) => (
//                     <div
//                       key={img.id}
//                       className="flex items-center gap-3 border rounded-md p-2 hover:bg-gray-50"
//                     >
//                       {/* Radio Button */}
//                       <input
//                         type="radio"
//                         name="imageSelect"
//                         value={img.id}
//                         disabled={img.mapped}
//                         checked={selectedImageId === img.id}
//                         onChange={() => setSelectedImageId(img.id)}
//                         className="cursor-pointer"
//                       />

//                       {/* Image Thumbnail */}
//                       <img
//                         src={`${domain}/v1/package/viewImage/package/${img.packageImageName}`}
//                         alt={img.packageImageName}
//                         className="w-16 h-16 object-cover rounded"
//                       />

//                       {/* Name & Mapped Status */}
//                       <div className="flex flex-col">
//                         <span className="text-sm font-medium">
//                           {img.packageImageName}
//                         </span>
//                         <span className="text-xs text-gray-500 italic">
//                           Mapped to:{' '}
//                           {img.mapped ? img.mappedPackageName : 'NONE'}
//                         </span>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}

//             {/* Submit Button (visible only if one image selected) */}
//             {selectedImageId && (
//               <div className="mt-5 flex justify-end">
//                 <button
//                   onClick={handleSubmit}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Submit
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

export function MapProductImagePopup({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<ActiveImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Base URL for images
  const domain = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  // Fetch active mapping images when popup opens
  useEffect(() => {
    if (isOpen) {
      loadActiveImages();
    }
  }, [isOpen]);

  const loadActiveImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchActiveMappingImages();
      setImages(data);
    } catch (err) {
      console.error('Error fetching active images:', err);
      setError('Failed to load images.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImageId) return;

    try {
      setSubmitting(true);
      setError(null);

      // Call the mapping API
      const result = await mapImageToPackage(id, selectedImageId);
      console.log(result.status.message); // "Image mapped successfully"

      // Refresh images list to reflect updated mapping
      await loadActiveImages();

      // Reset selection and close popup
      setSelectedImageId(null);
      setIsOpen(false);
    } catch (err) {
      console.error('Error mapping image:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="rounded border px-2 py-1 text-sm hover:bg-gray-100 flex items-center gap-1"
      >
        <ArrowUpTrayIcon className="w-4 h-4" />
        Map Image
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[650px] max-h-[80vh] rounded-lg shadow-lg p-5 relative flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Select Image to Map for Package #{id}
            </h2>

            {/* Loading & Error */}
            {loading && <p>Loading images...</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* Scrollable Images Container */}
            {!loading && !error && (
              <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto border-t border-b py-2">
                {images.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center">
                    No active images available.
                  </p>
                ) : (
                  images.map((img) => (
                    <div
                      key={img.id}
                      className="flex items-center gap-3 border rounded-md p-2 hover:bg-gray-50"
                    >
                      {/* Radio Button */}
                        {/* <input
                          type="radio"
                          name="imageSelect"
                          value={img.id}
                          disabled={img.mapped}
                          checked={selectedImageId === img.id}
                          onChange={() => setSelectedImageId(img.id)}
                          className="cursor-pointer"
                        /> */}


                        {img.mapped ? (
  // when mapped is true, show a view of same size
  <div className="w-4 h-4 rounded-full bg-blue-300 flex items-center justify-center text-xs text-gray-600">
    ✓
  </div>
) : (
  // when mapped is false, show the radio button
  <input
    type="radio"
    name="imageSelect"
    value={img.id}
    checked={selectedImageId === img.id}
    onChange={() => setSelectedImageId(img.id)}
    className="cursor-pointer w-4 h-4"
  />
)}

                      {/* Image Thumbnail */}
                      <img
                        src={`${domain}/v1/package/viewImage/package/${img.packageImageName}`}
                        alt={img.packageImageName}
                        className="w-16 h-16 object-cover rounded"
                      />

                      {/* Name & Mapped Status */}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {img.packageImageName}
                        </span>
                        <span className="text-xm text-gray-600 italic">
                          Mapped to: {img.mapped ? img.mappedPackageName : 'NA'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Submit Button (visible only if one image selected) */}
            {selectedImageId && (
              <div className="mt-5 flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={`px-4 py-2 text-white rounded ${
                    submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {submitting ? 'Mapping...' : 'Submit'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}