import { AddArticleForm } from '@/components/dashboard/articles/form/add-article-form';
import { PageHeader } from '@/components/dashboard/page-header';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add article',
};

export default async function AddArticlePage() {
  return (
    <div className="map-page">
      <PageHeader
        title="Add article"
        description="A story for the public blog."
        backHref="/dashboard/articles"
        compact
      />
      <AddArticleForm />
    </div>
  );
}
