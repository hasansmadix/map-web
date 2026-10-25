import { Suspense } from 'react';
import { EditBroadcastUnitForm } from '@/components/dashboard/broadcast-units/form/edit-broadcast-unit-form';
import { PageHeader } from '@/components/dashboard/page-header';
import EditFacilityUnitLoading from './loading';

interface EditBroadcastUnitPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBroadcastUnitPage({ params }: EditBroadcastUnitPageProps) {
  const { id } = await params;

  return (
    <div className="map-page">
      <PageHeader
        title="Edit unit"
        description="The listing, the specifications, and the kit on board."
        backHref="/dashboard/broadcast-units"
        compact
      />
      <Suspense fallback={<EditFacilityUnitLoading />}>
        <EditBroadcastUnitForm broadcastUnitId={id} />
      </Suspense>
    </div>
  );
}
