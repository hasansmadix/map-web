import EditIntentForm from '@/components/dashboard/intents/form/edit-intent-form';
import { PageHeader } from '@/components/dashboard/page-header';
import { type Metadata } from 'next';

interface EditIntentPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: 'Edit Intent',
};

export default async function EditIntentPage({ params }: EditIntentPageProps) {
  const { id } = await params;

  return (
    <div className="map-page">
      <PageHeader
        title="Edit intent"
        description="The heading, the search result, and the equipment this page lists."
        backHref="/dashboard/intents"
        compact
      />
      <EditIntentForm intentId={id} />
    </div>
  );
}
