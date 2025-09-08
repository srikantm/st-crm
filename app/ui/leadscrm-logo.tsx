import { BoltIcon, CpuChipIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { font } from '@/app/ui/fonts';

export default function LeadsCRMLogo() {
  return (
    <div
      className={`${font.className} flex flex-row p-3 justify-center text-white leading-none`}
    >
      <CpuChipIcon className="h-10 w-10" />
      <p className='text-2xl font-bold pt-1'>EngageCore</p>
    </div>
  );
}
