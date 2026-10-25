import { BroadcastUnitsTable } from '@/components/dashboard/broadcast-units/broadcast-units-table';
import { PageHeader } from '@/components/dashboard/page-header';

import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Broadcast Units',
};

export default async function BroadcastUnitsPage() {
  return (
    <div className="map-page">
      <PageHeader title="Broadcast units" description="The public website reads the repository, not this screen. Edits here do not change the live fleet pages." />

      <BroadcastUnitsTable />
    </div>
  );
}
