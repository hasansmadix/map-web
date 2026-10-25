import { AddStaffForm } from '@/components/dashboard/staff/form/add-staff-form';
import { PageHeader } from '@/components/dashboard/page-header';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add staff',
};

export default async function AddStaffPage() {
  return (
    <div className="map-page">
      <PageHeader
        title="Add staff"
        description="A person who can sign in to the dashboard."
        backHref="/dashboard/staff"
        compact
      />
      <AddStaffForm />
    </div>
  );
}
