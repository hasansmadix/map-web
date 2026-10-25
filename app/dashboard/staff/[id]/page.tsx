import { EditStaffForm } from '@/components/dashboard/staff/form/edit-staff-form';
import { PageHeader } from '@/components/dashboard/page-header';
import { type Metadata } from 'next';

interface EditStaffPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Edit staff',
};

export default async function EditStaffPage({ params }: EditStaffPageProps) {
  const { id } = await params;

  return (
    <div className="map-page">
      <PageHeader
        title="Edit staff"
        description="Account, access, and profile."
        backHref="/dashboard/staff"
        compact
      />
      <EditStaffForm staffId={id} />
    </div>
  );
}
