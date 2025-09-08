"use client"

import Link from 'next/link';
import {
  UserGroupIcon,
  UserIcon
  } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createCustomer } from '@/app/lib/actions';


export default function Form() {

  // const handleInvalid = (event: React.FormEvent<HTMLInputElement>) => {
  //   const input = event.currentTarget;
  //   const value = input.value;
  //   const regex = /^[6-9]\d{9}$/; // Use the appropriate regex
  //   if (regex.test(value)) {
  //       alert("matched");
  //   }else{
  //       alert("not matched");
  //   }
  //   // Check if the field is empty
  //   if (input.validity.valueMissing) {
  //     input.setCustomValidity('Please enter your phone number.');
  //   }
  //   // Custom regex pattern to check for valid phone number
  //   else if (regex.test(value)) {
  //     input.setCustomValidity(
  //       'Please enter a valid phone number (e.g., +1234567890).'
  //     );
  //   } else {
  //     input.setCustomValidity(''); // Clear custom validity message
  //   }
  // };
  
  return (
    <form action={createCustomer}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="customerName" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="customerName"
                name="customerName"
                type="text"
                placeholder="Enter Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
                onInvalid={(event) =>
                  event.currentTarget.setCustomValidity('Please enter customer name.')
                }
                onInput={(event) => event.currentTarget.setCustomValidity('')}
              />
            </div>
          </div>
        </div>

        {/* Customer Type */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
          Customer Type
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="customerType"
                  name="customerType"
                  type="radio"
                  value="b2b"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="customerType"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  B2B <UserGroupIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="customerType"
                  name="customerType"
                  type="radio"
                  value="b2c"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  required
                />
                <label
                  htmlFor="customerType"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  B2C <UserIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>


        {/* Customer Email */}
        <div className="mb-4">
          <label htmlFor="customerEmail" className="mb-2 block text-sm font-medium">
            Customer Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="customerEmail"
                name="customerEmail"
                type="email"
                placeholder="Enter Email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
                onInvalid={(event) =>
                  event.currentTarget.setCustomValidity('Please enter valid email-id.')
                }
                onInput={(event) => event.currentTarget.setCustomValidity('')}
              />
            </div>
          </div>
        </div>

        {/* Customer Contact Number */}
        <div className="mb-4">
          <label htmlFor="customerNumber" className="mb-2 block text-sm font-medium">
            Customer Contact Number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="customerNumber"
                name="customerNumber"
                type='number'
                placeholder="9999999999"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>

        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Customer</Button>
      </div>
    </form>
  );
}
