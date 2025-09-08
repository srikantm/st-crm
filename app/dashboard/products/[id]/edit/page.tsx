import Form from '@/app/ui/products/package-form/UpdatePackage';
import Breadcrumbs from '@/app/ui/products/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Update Lead',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const packageId = params.id;
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/dashboard/products' },
          {
            label: 'Edit Product',
            href: `/dashboard/products/${packageId}/edit`,
            active: true,
          },
        ]}
      />
      <Form  packageId={packageId}/>
    </main>
  );
}