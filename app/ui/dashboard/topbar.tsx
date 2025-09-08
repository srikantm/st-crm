'use client'

import { CpuChipIcon, PowerIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import { Button, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';

export default function TopBar() {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // Open the dropdown
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the dropdown
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle menu item click
  const handleMenuItemClick = (event: MouseEvent<HTMLElement>, value: string) => {
    handleClose();
  };

  return (
    <div className='flex  flex-wrap items-center justify-between rounded-md bg-gray-50 px-2 '>
      <div className='flex items-center space-x-2'>
        <Link
          className="mb-2  rounded-md md:h-14"
          href="/"
        >
          <div className="text-blue-600">
            <div
              className={`flex flex-row p-3 justify-center text-blue-600 leading-none`}
            >
              <CpuChipIcon className="h-8 w-8" />
              <p className='text-xl font-bold pt-1'>EngageCore</p>
            </div>
          </div>
        </Link>
      </div>

      <div className='flex items-center space-x-4'>
        <div>
          <Button
            className='rounded-full  text-gray-200'
            onClick={handleClick}
          >
            <UserCircleIcon className='w-6 h-6' />
          </Button>

          {/* <UserProfile /> */}
          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className='w-52 text-sm gap-2'
            MenuListProps={{
              onClick: (event: MouseEvent<HTMLElement>) => {
                console.log("Menu clicked:", event);
              },
            }}
          >
            {/* Menu Items */}
            <MenuItem className='gap-4' onClick={(e) => handleMenuItemClick(e, "Option 1")}>
              <ListItemIcon className='justify-end'>
                <UserCircleIcon className='w-5 h-5' />
              </ListItemIcon>
            </MenuItem>
            <MenuItem onClick={(e) => handleMenuItemClick(e, "Option 2")}>Option 2</MenuItem>
            <Divider />
            <form action={async () => {
              // 'use server';
              // await signOut();
            }}>
              <MenuItem onClick={(e) => handleMenuItemClick(e, "Option 3")}>SignOut 
              <ListItemIcon className='justify-end'>
              <PowerIcon className="w-6" />
              </ListItemIcon>
              </MenuItem>
            </form>
          </Menu>
        </div>

        {/* <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button> */}

      </div>



    </div>
  );
}
