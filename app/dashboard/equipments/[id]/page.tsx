import EditEquipmentForm from '@/components/dashboard/equipments/form/edit-equipment-from';
import EquipmentView from '@/components/dashboard/equipments/view/equipment-view';
import { PageHeader } from '@/components/dashboard/page-header';
import { type Metadata } from 'next';

interface EditEquipmentPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    view?: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Edit Equipment',
};

export default async function EditEquipmentPage({ params, searchParams }: EditEquipmentPageProps) {
  const { id } = await params;
  const { view } = await searchParams;
  const isView = view === '1';

  return (
    <div className="map-page">
      {isView ? null : (
        <PageHeader
          title="Edit equipment"
          description="Update the listing, the specifications, and the images."
          backHref={`/dashboard/equipments/${id}?view=1`}
          backLabel="Record"
          compact
        />
      )}
      {isView ? <EquipmentView equipmentId={id} /> : <EditEquipmentForm equipmentId={id} />}
    </div>
  );
}
