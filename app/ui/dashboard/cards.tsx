import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import { font } from '@/app/ui/fonts';
import { DashboardCountData } from '@/app/lib/definitions';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  leads:InboxIcon,
  totalLeadsAmount : BanknotesIcon,
  totalAmountLeadsWon:HandThumbUpIcon
};

export default async function CardWrapper({dashboardData}:{dashboardData:DashboardCountData}) {
  
  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}


      <Card title="Total Invoices" value={dashboardData.invoice_count} type="invoices" />
      <Card title="Invoice Collected" value={dashboardData.paid} type="collected" />
      <Card title="Invoice Pending" value={dashboardData.pending} type="pending" />
      <Card title="Total Customers" value={dashboardData.customer_count} type="customers"/>
      <Card title="Total Leads" value={dashboardData.lead_count} type="leads"/>
      <Card title="Total Leads Amount" value={dashboardData.total_lead_amount} type="totalLeadsAmount"/>
      <Card title="Leads Conversion" value={dashboardData.total_lead_won} type="totalAmountLeadsWon"/>
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected' | 'leads' | 'totalLeadsAmount' | 'totalAmountLeadsWon';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-md bg-gray-50 p-2 shadow-sm w-52">
      <div className="flex p-1 justify-center text-sm">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <p className={`${font.className} ml-2 text-gray-700`}>{title}</p>
      </div>
      <p
        className={`${font.className}
          truncate rounded-xl bg-white text-gray-700 px-4 py-4 text-center text-md`}
      >
        {value}
      </p>
    </div>
  );
}
