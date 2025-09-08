'use client'

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  BanknotesIcon,
  InboxArrowDownIcon,
  InboxStackIcon,
  InboxIcon,
  IdentificationIcon,
  Cog6ToothIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { SidebarData } from '@/app/lib/definitions';
import { useEffect, useState } from 'react';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Customers', href: '/dashboard/customers', icon: IdentificationIcon },
  { name: 'Leads', href: '/dashboard/leads', icon: InboxIcon },
  { name: 'Quotes', href: '/dashboard/quotes', icon: InboxStackIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: InboxArrowDownIcon,
  },
  {
    name: 'Payments',
    href: '/dashboard/payments',
    icon: BanknotesIcon,
  },
  {
    name: 'Products',
    href: '/dashboard/products',
    icon: TableCellsIcon,
  }
  // ,
  // {
  //   name: 'Settings',
  //   href: '/dashboard/settings',
  //   icon: Cog6ToothIcon,
  // }
];


const sidebarIconMap = {
  Dashboard: HomeIcon,
  Customers: IdentificationIcon,
  Leads: InboxIcon,
  Quotes: InboxStackIcon,
  Invoices: InboxArrowDownIcon,
  Payments: BanknotesIcon,
  Products: TableCellsIcon
}

export default function NavLinks({ sideBarData }: { sideBarData: SidebarData[] }) {

  const pathname = usePathname();

  const [sidebar, setSidebar] = useState(sideBarData);

  useEffect(() => {
    setSidebar([{id : 0, name : "Dashboard", href : "/dashboard"}, ...sidebar])
  }, [])

  
  const getIcon = (name: string) => {
    
  }

  return (
    <>
      {sidebar.map((link) => {
        let LinkIcon =  sidebarIconMap.Dashboard;
        if (link.name === 'Dashboard') {
          LinkIcon =  sidebarIconMap.Dashboard;
        }
        if (link.name === 'Customers') {
          LinkIcon = sidebarIconMap.Customers;
        }
        if (link.name === 'Leads') {
          LinkIcon = sidebarIconMap.Leads;
        }
        if (link.name === 'Quotes') {
          LinkIcon = sidebarIconMap.Quotes;
        }
        if (link.name === 'Invoices') {
          LinkIcon = sidebarIconMap.Invoices;
        }
        if (link.name === 'Payments') {
          LinkIcon = sidebarIconMap.Payments;
        }
        if (link.name === 'Products') {
          LinkIcon = sidebarIconMap.Products;
        }
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[40px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-normal hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-blue-600 text-white': pathname === link.href,
              },
              {
                'bg-gray-50 text-blue-800': pathname !== link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className={`text-md hidden md:block`}>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
