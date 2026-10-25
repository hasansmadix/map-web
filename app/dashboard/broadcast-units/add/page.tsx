import { AddBroadcastUnitForm } from '@/components/dashboard/broadcast-units/form/add-broadcast-unit-form';
import { PageHeader } from '@/components/dashboard/page-header';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Broadcast Unit',
};

export default async function AddBroadcastUnitPage() {
  return (
    <div className="map-page">
      <PageHeader
        title="Add unit"
        description="Name the unit, list the kit, and choose how it is published."
        backHref="/dashboard/broadcast-units"
        compact
      />
      <AddBroadcastUnitForm />
    </div>
  );
}
