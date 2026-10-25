import { ArticlesTable } from '@/components/dashboard/articles/articles-table';
import { PageHeader } from '@/components/dashboard/page-header';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articles',
};

export default async function ArticlesPage() {
  return (
    <div className="map-page">
      <PageHeader title="Articles" description="Stories published on the blog." />

      <ArticlesTable />
    </div>
  );
}
