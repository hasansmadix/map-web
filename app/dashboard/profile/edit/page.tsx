import { UpdateProfileForm } from '@/components/dashboard/profile/form/update-profile-form';
import { PageHeader } from '@/components/dashboard/page-header';

export default function EditProfilePage() {
  return (
    <div className="map-page">
      <PageHeader
        title="Edit Profile"
        description="Edit your profile information"
        backHref="/dashboard/profile"
        compact
      />
      <UpdateProfileForm />
    </div>
  );
}
