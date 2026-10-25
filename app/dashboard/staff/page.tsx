import { type Metadata } from 'next';
import { PageHeader } from '@/components/dashboard/page-header';
import StaffTable from '@/components/dashboard/staff/staff-table';

export const metadata: Metadata = {
  title: 'Staff',
};

export default async function StaffPage() {
  return (
    <div className="map-page">
      <PageHeader title="Staff" description="People who can sign in to the dashboard." />

      <StaffTable />
    </div>
  );
}
