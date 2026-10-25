import ProfileInfo from '@/components/dashboard/profile/form/profile-info';
import { PageHeader } from '@/components/dashboard/page-header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function ProfilePage() {
  return (
    <div className="map-page">
      <PageHeader title="Profile" description="Staff Management Description" />

      <ProfileInfo />
    </div>
  );
}
