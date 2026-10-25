'use client';

import ApiError from '@/components/shared/api-error';
import FormSkeleton from '@/components/shared/skeletons/form-skeleton';
import { useBroadcastUnitById } from '@/hooks/api/broadcasts/useBroadcastUnitById';
import { BroadcastUnitEditor } from './broadcast-unit-editor';

export function EditBroadcastUnitForm({ broadcastUnitId }: { broadcastUnitId: string }) {
  const { broadcastUnit, isLoading, error, refetch } = useBroadcastUnitById(broadcastUnitId);

  if (isLoading) return <FormSkeleton />;
  if (!broadcastUnit) return <ApiError errorMessage={error || 'This unit could not be loaded'} refetchFunction={refetch} />;

  return <BroadcastUnitEditor unit={broadcastUnit} />;
}
