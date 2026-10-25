'use client';

import ApiError from '@/components/shared/api-error';
import FormSkeleton from '@/components/shared/skeletons/form-skeleton';
import { useIntentById } from '@/hooks/api/intents/use-intents';
import { IntentEditor } from './intent-editor';

function EditIntentForm({ intentId }: { intentId: string }) {
  const { intent, isLoading, error, refetch } = useIntentById(intentId);

  if (isLoading) return <FormSkeleton />;
  if (!intent) return <ApiError errorMessage={error || 'This intent could not be loaded'} refetchFunction={refetch} />;

  return <IntentEditor intent={intent} />;
}

export default EditIntentForm;
