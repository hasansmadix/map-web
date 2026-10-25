import { type Metadata } from 'next';
import { PageHeader } from '@/components/dashboard/page-header';
import EquipmentBrandsTable from '@/components/dashboard/equipments/equipment-brands/equipment-brands-table';

export const metadata: Metadata = {
  title: 'Brands',
};

export default async function EquipmentBrandsPage() {
  return (
    <div className="map-page">
      <PageHeader title="Brands" description="The makers behind the hire list." />

      <EquipmentBrandsTable />
    </div>
  );
}
