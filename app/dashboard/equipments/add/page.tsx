import AddEquipmentForm from '@/components/dashboard/equipments/form/add-equipment-form';
import { PageHeader } from '@/components/dashboard/page-header';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Equipment',
};

export default async function AddEquipmentPage() {
  return (
    <div className="map-page">
      <PageHeader
        title="Add equipment"
        description="Name the item, set the specifications, and choose how it is listed."
        backHref="/dashboard/equipments"
        compact
      />
      <AddEquipmentForm />
    </div>
  );
}
