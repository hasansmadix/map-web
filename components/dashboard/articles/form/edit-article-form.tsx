'use client';

import ApiError from '@/components/shared/api-error';
import FormSkeleton from '@/components/shared/skeletons/form-skeleton';
import { useArticleStaffById } from '@/hooks/api/articles/useArticles';
import { ArticleEditor } from './article-editor';

export function EditArticleForm({ articleId }: { articleId: string }) {
  const { data: article, isLoading, error, refetch } = useArticleStaffById(Number(articleId));

  if (isLoading) return <FormSkeleton />;
  if (!article) return <ApiError errorMessage={error?.message || 'This article could not be loaded'} refetchFunction={refetch} />;

  return <ArticleEditor article={article} />;
}
