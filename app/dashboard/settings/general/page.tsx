import SettingsEditor from '@/components/dashboard/settings/edit-settings-form';
import { PageHeader } from '@/components/dashboard/page-header';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function SettingsPage() {
  return (
    <div className="map-page">
      <PageHeader title="Settings" description="The name, brand, contact, and scripts the public site uses." />
      <SettingsEditor />
    </div>
  );
}
