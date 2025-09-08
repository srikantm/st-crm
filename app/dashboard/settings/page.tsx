import { font } from '@/app/ui/fonts';
import SettingTabs from '@/app/ui/settings/tabs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Settings',
  };

export default async function Page() {

    
    return (
        <div className="w-full px-5">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${font.className} text-md`}>Settings</h1>
            </div>
            <div className='p-6'></div>
            <div className='rounded-md border border-gray-200'>
                {/* <SettingTabs/> */}
            </div>
            
        </div>
    );
}