import { MediaGallery } from '@/components/dashboard/media';
import { PageHeader } from '@/components/dashboard/page-header';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media',
};

export default async function MediaPage() {
  return (
    <div className="map-page">
      <PageHeader title="Media Management" description="Manage and organize your media files" />

      <MediaGallery />
    </div>
  );
}
