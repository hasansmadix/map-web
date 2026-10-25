import { EquipmentsTable } from '@/components/dashboard/equipments/equipments-table';
import { PageHeader } from '@/components/dashboard/page-header';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Equipment',
};

export default async function EquipmentsPage() {
  return (
    <div className="map-page">
      <PageHeader title="Equipment" description="The hire catalogue. Open a row to read the record, or add a new item." />

      <EquipmentsTable />
    </div>
  );
}
