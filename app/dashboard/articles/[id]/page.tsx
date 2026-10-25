import { EditArticleForm } from '@/components/dashboard/articles/form/edit-article-form';
import { PageHeader } from '@/components/dashboard/page-header';
import { type Metadata } from 'next';

interface EditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Edit article',
};

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;

  return (
    <div className="map-page">
      <PageHeader
        title="Edit article"
        description="The story, cover, and how it is found."
        backHref="/dashboard/articles"
        compact
      />

      <EditArticleForm articleId={id} />
    </div>
  );
}
