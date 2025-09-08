import Form from '@/app/ui/products/package-form/UpdatePackage';
import Breadcrumbs from '@/app/ui/products/breadcrumbs';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Create Product',
};

export default async function Page() {
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/dashboard/products' },
          {
            label: 'Create Product',
            href: '/dashboard/products/create',
            active: true,
          },
        ]}
      />
      <Form packageId={null}/>
    </main>
  );
}