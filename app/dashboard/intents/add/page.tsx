import AddIntentForm from '@/components/dashboard/intents/form/add-intent-form';
import { PageHeader } from '@/components/dashboard/page-header';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Intent',
};

export default async function AddIntentPage() {
  return (
    <div className="map-page">
      <PageHeader
        title="Add intent"
        description="A public page that lists equipment for one search."
        backHref="/dashboard/intents"
        compact
      />
      <AddIntentForm />
    </div>
  );
}
