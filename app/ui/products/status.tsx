import { CheckIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function PackageStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-md px-2 py-1 text-xs',
        {
          'bg-green-100 text-green-800': status === 'ACTIVE',
          'bg-red-100 text-red-800': status === 'INACTIVE',
        },
      )}
    >
      {status === 'ACTIVE' ? (
        <>
          Active
          <CheckIcon className="ml-1 w-4 text-green-500" />
        </>
      ) : null}
      {status === 'INACTIVE' ? (
        <>
          Inactive
          <NoSymbolIcon className="ml-1 w-4 text-red-500" />
        </>
      ) : null}
    </span>
  );
}