'use client';

import { CustomerField, LeadForm } from '@/app/lib/definitions';
import {
  CurrencyRupeeIcon,
  ClipboardDocumentListIcon, ClipboardDocumentCheckIcon, HandThumbUpIcon, ClipboardDocumentIcon, HandThumbDownIcon,
  ArchiveBoxXMarkIcon,
  UserCircleIcon,
  GlobeAltIcon,
  PhoneIcon,
  ArrowDownCircleIcon,
  UserGroupIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateLead } from '@/app/lib/actions';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

export default function EditLeadForm({
  lead, customers
}: {
  lead: LeadForm,
  customers : CustomerField[]
}) {
  const updateLeadWithId = updateLead.bind(null, lead.lead_id);
  return (
    <form action={updateLeadWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">


        {/* Lead Title */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter Lead Title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={lead.title}
                required
                onInvalid={(event) =>
                  event.currentTarget.setCustomValidity('Please Enter Lead Title.')
                }
                onInput={(event) => event.currentTarget.setCustomValidity('')}
              />
            </div>
          </div>
        </div>

        {/* Lead Description */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Enter Lead Description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={lead.description}
                required
                onInvalid={(event) =>
                  event.currentTarget.setCustomValidity('Please Enter Lead Description.')
                }
                onInput={(event) => event.currentTarget.setCustomValidity('')}
              />
            </div>
          </div>
        </div>


        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customerId"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={lead.customer_id}
              required
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>


        {/* Lead Source */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Lead Source
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="source"
                  name="source"
                  type="radio"
                  defaultValue="web"
                  defaultChecked={lead.source === 'web'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  required
                />
                <label
                  htmlFor="web"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-blue-600"
                >
                  Web <GlobeAltIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="source"
                  name="source"
                  type="radio"
                  defaultValue="phone"
                  defaultChecked={lead.source === 'phone'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="source"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-purple-600"
                >
                  Phone <PhoneIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="source"
                  name="source"
                  type="radio"
                  defaultValue="direct"
                  defaultChecked={lead.source === 'direct'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="source"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-yellow-600"
                >
                  Direct <ArrowDownCircleIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Lead Type */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Lead Type
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="leadType"
                  name="leadType"
                  type="radio"
                  defaultValue="b2b"
                  defaultChecked={lead.lead_type === 'b2b'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  required
                />
                <label
                  htmlFor="leadType"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  B2B <UserGroupIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="leadType"
                  name="leadType"
                  type="radio"
                  defaultValue="b2c"
                  defaultChecked={lead.lead_type === 'b2c'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadType"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  B2C <UserIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Lead Expiry Date */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Expected Close Date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <DatePicker key='expectedCloseDate' defaultValue={dayjs(lead.expected_close_date,  'YYYY-MM-DD')} name='expectedCloseDate' className="max-w-[284px]" required/>
            </div>
          </div>
        </div>



        {/* Sales Owner
        <div className="mb-4">
          <label htmlFor="assignedUser" className="mb-2 block text-sm font-medium">
            Sales Owner
          </label>
          <div className="relative">
            <select
              id="assignedUser"
              name="assignedUser"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={'admin'}
            >
              <option value="" disabled>
                Assign User
              </option>
              <option key="1" value="admin">
                  Admin
                </option>
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div> */}


        {/* Lead Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Lead Amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="leadAmount"
                name="leadAmount"
                type="number"
                placeholder="Lead Value"
                defaultValue={lead.lead_amount}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
                onInvalid={(event) =>
                  event.currentTarget.setCustomValidity('Please Enter Lead Amount.')
                }
                onInput={(event) => event.currentTarget.setCustomValidity('')}
              />

              <CurrencyRupeeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Lead Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the Lead status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  defaultValue="draft"
                  defaultChecked={lead.lead_status === 'draft'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  required
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-200 px-3 py-1.5 text-xs font-medium text-yellow-700"
                >
                  Draft <ClipboardDocumentIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  defaultValue="new"
                  defaultChecked={lead.lead_status === 'new'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-200 px-3 py-1.5 text-xs font-medium text-blue-700"
                >
                  New <ClipboardDocumentListIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  defaultValue="negotiation"
                  defaultChecked={lead.lead_status === 'negotiation'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-purple-200 px-3 py-1.5 text-xs font-medium text-purple-700"
                >
                  Negotiation <ClipboardDocumentCheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  defaultValue="won"
                  defaultChecked={lead.lead_status === 'won'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-200 px-3 py-1.5 text-xs font-medium text-green-700"
                >
                  Won <HandThumbUpIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  defaultValue="lost"
                  defaultChecked={lead.lead_status === 'lost'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-200 px-3 py-1.5 text-xs font-medium text-red-700"
                >
                  Lost <HandThumbDownIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="leadStatus"
                  name="leadStatus"
                  type="radio"
                  defaultValue="cancelled"
                  defaultChecked={lead.lead_status === 'cancelled'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="leadStatus"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700"
                >
                  Cancelled <ArchiveBoxXMarkIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/leads"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Lead</Button>
      </div>
    </form>
  );
}
