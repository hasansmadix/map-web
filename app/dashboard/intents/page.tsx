import { type Metadata } from 'next';
import { PageHeader } from '@/components/dashboard/page-header';
import IntentsTable from '@/components/dashboard/intents/intents-table';

export const metadata: Metadata = {
  title: 'Intents',
};

export default async function IntentsPage() {
  return (
    <div className="map-page">
      <PageHeader title="Intents" description="Search pages for the hire catalogue. Open a row to edit the page." />

      <IntentsTable />
    </div>
  );
}
