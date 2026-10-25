import { type Metadata } from 'next';
import { PageHeader } from '@/components/dashboard/page-header';
import EquipmentCategoriesTable from '@/components/dashboard/equipments/equipment-categories/equipment-categories-table';

export const metadata: Metadata = {
  title: 'Categories',
};

export default async function EquipmentCategoriesPage() {
  return (
    <div className="map-page">
      <PageHeader title="Categories" description="Groups in the hire catalogue. Each one belongs to a type of kit." />

      <EquipmentCategoriesTable />
    </div>
  );
}
